#!/bin/bash

echo "Waiting for MongoDB instances to start..."
# Wait for a few seconds to ensure all mongo instances are up
# In a production scenario, a more robust health check would be used here.
sleep 10 

echo "Initiating replica set..."

mongosh --host mongo1:27017 <<EOF
var MAX_RETRIES = 20;
var RETRY_INTERVAL_MS = 5000;

var config = {
    "_id": "rs0",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo1:27017", // Reverted to internal Docker hostname
            "priority": 3
        },
        {
            "_id": 2,
            "host": "mongo2:27017", // Reverted to internal Docker hostname
            "priority": 2
        },
        {
            "_id": 3,
            "host": "mongo3:27017", // Reverted to internal Docker hostname
            "priority": 1
        }
    ]
};

rs.initiate(config, { force: true });

echo "Replica set initiating, waiting for it to stabilize..."
let attempts = 0;
let isMaster = false;
while(attempts < MAX_RETRIES && !isMaster) { // Try for up to MAX_RETRIES attempts
    sleep(RETRY_INTERVAL_MS); // mongosh sleep is in milliseconds
    let status = rs.status();
    if (status.myState === 1) { // 1 means PRIMARY
        isMaster = true;
        print("Successfully elected a PRIMARY.");
    } else {
        print("Still waiting for PRIMARY election... current state: " + status.myState);
    }
    attempts++;
}

if (!isMaster) {
    print("Failed to elect a PRIMARY after several attempts. Please check the logs.");
    printjson(rs.status()); // Print status for debugging
    quit(1); // Exit with error
}

print("Replica set status:");
printjson(rs.status());
quit();
EOF

echo "Replica set initiation script finished."
