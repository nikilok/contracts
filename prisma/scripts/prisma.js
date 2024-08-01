const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.suppliers.createMany({
    data: [
      {
        name: "Jamie Wixon LLC",
      },
      {
        name: "Draxo Plc Lmt.",
      },
    ],
  });
  const allSuppliers = await prisma.suppliers.findMany({
    select: {
      name: true,
    },
  });
  console.log("🚀 ~ main ~ allSuppliers:", allSuppliers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
