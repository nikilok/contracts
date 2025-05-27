This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Screenshots

<img width="1919" alt="image" src="https://github.com/user-attachments/assets/653d265c-b2be-451b-a41f-54efe67451b3">

<img width="1905" alt="image" src="https://github.com/user-attachments/assets/fcb70b0e-874e-4f5a-8aba-0ab5fe4927c7">

<img width="1918" alt="image" src="https://github.com/user-attachments/assets/3ec473af-9599-4440-9b3c-b9e37e65819a">

## Local MongoDB Replica Set

This project includes a Docker Compose configuration to run a 3-node MongoDB replica set locally.

### Prerequisites

- Docker and Docker Compose installed.
- Node.js and npm installed (for using `package.json` scripts).

### Running the Replica Set

1.  **Start the MongoDB replica set:**
    ```bash
    npm run mongo:start
    ```
    This command will start three MongoDB containers (`mongodb1`, `mongodb2`, `mongodb3`) and a setup container (`mongo-setup`) that initializes the replica set `rs0`. The `mongo-setup` container will run the initialization script and then exit. The MongoDB containers will continue running in the background.

### Host Machine Setup for Connection

To connect to the MongoDB replica set from your host machine (e.g., for Prisma Studio, `npm run update-schema`, or your application running directly on the host), you need to make the replica set members' hostnames (`mongo1`, `mongo2`, `mongo3`) resolvable to your local machine. This is because the MongoDB instances, while accessible via `localhost:<port>`, will report their replica set peers using their internal Docker hostnames (e.g., `mongo1:27017`), which your host machine doesn't know by default.

1.  **Modify your `/etc/hosts` file:**
    Add the following lines to your `/etc/hosts` file (you'll typically need administrator/sudo privileges):
    ```
    127.0.0.1 mongo1
    127.0.0.1 mongo2
    127.0.0.1 mongo3
    ```
    On Windows, the hosts file is usually located at `C:\Windows\System32\drivers\etc\hosts`.

2.  **Use the following connection string:**
    After modifying your `/etc/hosts` file, use this connection string to connect from your host application or MongoDB client:
    ```
    mongodb://mongo1:27017,mongo2:27018,mongo3:27019/YOUR_DB_NAME?replicaSet=rs0
    ```
    Replace `YOUR_DB_NAME` with your actual database name (e.g., `contracts`).
    Note the different ports for `mongo1` (27017), `mongo2` (27018), and `mongo3` (27019), which correspond to the ports mapped in `docker-compose.yml`.

3.  **Update your `.env` file:**
    Ensure your `DATABASE_URL` in your `.env` file (or similar configuration) is updated to this new connection string if your application needs to connect from the host. For example:
    ```
    DATABASE_URL="mongodb://mongo1:27017,mongo2:27018,mongo3:27019/contracts?replicaSet=rs0"
    ```

### Connecting to the MongoDB Replica Set (General Info)

- **From the Host (after setup):** Use the connection string mentioned in "Host Machine Setup for Connection". This is suitable for tools like MongoDB Compass, `mongosh` run from your host, or your application when run directly on the host.
- **From within Docker containers (not in `mongo-network`):** If you have other Docker containers that need to connect and are *not* part of the `mongo-network`, they would typically use `host.docker.internal:<port>` for each member if the Docker version supports it, or require more complex network configuration. However, for this project, applications are expected to run on the host or within the `mongo-network`.
- **From within `mongo-network` (e.g., the `mongo-setup` service):** Services within the same Docker network (`mongo-network`) can use the Docker hostnames directly (e.g., `mongodb://mongo1:27017,mongo2:27017,mongo3:27017/YOUR_DB_NAME?replicaSet=rs0`). Notice the internal port `27017` is used for all members in this case.

### Stopping the Replica Set

```bash
npm run mongo:stop
```
This command will stop and remove the MongoDB containers and network. The data volumes (`mongo1-data`, `mongo2-data`, `mongo3-data`) will persist unless manually removed.

### Notes
- The replica set is named `rs0`.
- The `init-replica-set.sh` script configures the replica set members to identify themselves using their Docker hostnames (e.g., `mongo1:27017`). This is why the `/etc/hosts` modification is necessary for host access.
- Individual MongoDB instances are exposed on the host machine as follows:
    - `mongo1` (primary initially): `localhost:27017` (maps to container port 27017)
    - `mongo2`: `localhost:27018` (maps to container port 27017)
    - `mongo3`: `localhost:27019` (maps to container port 27017)
  While you can connect to an individual member using `localhost:<port>`, this does not provide full replica set functionality from the host without the `/etc/hosts` modification.
