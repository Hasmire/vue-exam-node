import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE Task;`;

  await prisma.task.create({
    data: {
      title: "First Task",
      status: "ACTIVE",
    },
  });

  await prisma.task.create({
    data: {
      title: "Second Task",
      status: "ACTIVE",
    },
  });

  await prisma.task.create({
    data: {
      title: "Third Task",
      status: "INACTIVE",
    },
  });

  await prisma.task.create({
    data: {
      title: "Fourth Task",
      status: "ACTIVE",
    },
  });

  await prisma.task.create({
    data: {
      title: "Fifth Task",
      status: "INACTIVE",
    },
  });

  await prisma.task.create({
    data: {
      title: "Sixth Task",
      status: "ACTIVE",
    },
  });

  await prisma.task.create({
    data: {
      title: "Seventh Task",
      status: "INACTIVE",
    },
  });

  await prisma.task.create({
    data: {
      title: "Eighth Task",
      status: "ACTIVE",
    },
  });

  await prisma.task.create({
    data: {
      title: "Ninth Task",
      status: "INACTIVE",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
