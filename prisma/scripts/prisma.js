const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.suppliers.createMany({
  //   data: [
  //     {
  //       name: "Jamie Wixon LLC",
  //     },
  //     {
  //       name: "Draxo Plc Lmt.",
  //     },
  //   ],
  // });
  // const allSuppliers = await prisma.suppliers.findMany({
  //   select: {
  //     name: true,
  //   },
  // });
  // console.log("🚀 ~ main ~ allSuppliers:", allSuppliers);
  // await prisma.contracts.create({
  //   data: {
  //     requestDate: new Date(),
  //     supplierId: "66ab5bdc7bf64a59f7a104f9",
  //     description: "This is some description text",
  //     subCategory: "1",
  //     serviceOwner: "Alex Van",
  //     contractFrom: new Date(1981, 11, 1), // 1 Dec 1981 - 11 = Dec (0 based)
  //     contractTo: new Date(2024, 11, 1),
  //   },
  // });

//   await prisma.contracts.update({
//     where: {
//       id: "66acb9247807916521107a2b",
//     },
//     data: {
//       // requestDate: new Date(),
//       // description: "This is some new description text",
//       annualContractValue: 90000,
//       annualContractCurrency: "usd",
//       // subCategory: "1",
//       // serviceOwner: "Alex Van",
//       // contractFrom: new Date(1981, 11, 1), // 1 Dec 1981 - 11 = Dec (0 based)
//       // contractTo: new Date(2024, 11, 1),
//     },
//   });
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
