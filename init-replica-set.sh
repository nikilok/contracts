#!/bin/bash

echo "Waiting for MongoDB instances to start..."
# Wait for a few seconds to ensure all mongo instances are up
# In a production scenario, a more robust health check would be used here.
sleep 10 

echo "Initiating replica set..."

mongosh --host mongo1:27017 <<EOF
var config = {
    "_id": "rs0",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "localhost:27017", // Changed from mongo1:27017
            "priority": 3
        },
        {
            "_id": 2,
            "host": "localhost:27018", // Changed from mongo2:27017
            "priority": 2
        },
        {
            "_id": 3,
            "host": "localhost:27019", // Changed from mongo3:27017
            "priority": 1
        }
    ]
};

rs.initiate(config, { force: true });

echo "Replica set initiating, waiting for it to stabilize..."
let attempts = 0;
let isMaster = false;
while(attempts < 20 && !isMaster) { // Try for up to 100 seconds (20 attempts * 5 seconds)
    sleep(5000); // mongosh sleep is in milliseconds
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
