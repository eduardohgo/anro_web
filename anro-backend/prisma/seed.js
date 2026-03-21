const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@anro.com";
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log("El admin ya existe");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin12345*", 10);

  await prisma.adminUser.create({
    data: {
      name: "Administrador ANRO",
      email,
      password: hashedPassword,
      role: "SUPERADMIN",
      isActive: true,
    },
  });

  console.log("Admin creado correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });