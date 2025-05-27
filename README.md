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

2.  **Connect to the MongoDB replica set:**
    You can connect to the replica set using the following connection string:
    ```
    mongodb://localhost:27017/?replicaSet=rs0
    ```
    Use this string with your MongoDB client (e.g., MongoDB Compass, `mongosh`, or your application driver).

3.  **Stop the MongoDB replica set:**
    ```bash
    npm run mongo:stop
    ```
    This command will stop and remove the MongoDB containers and network. The data volumes (`mongo1-data`, `mongo2-data`, `mongo3-data`) will persist unless manually removed.

### Notes
- The replica set is named `rs0`.
- `mongodb1` is accessible on `localhost:27017`.
- The initialization script (`init-replica-set.sh`) is run automatically by the `mongo-setup` container after the MongoDB nodes are healthy.
