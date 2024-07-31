const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.sample.create({
  //   data: {
  //     email: "michael@prisma.com",
  //     name: "Michael",
  //   },
  // });
  // const allRevenues = await prisma.sample.findMany({
  //   select: {
  //     email: true,
  //     name: true,
  //   },
  // });
  // console.log("🚀 ~ main ~ allRevenues:", allRevenues);
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
