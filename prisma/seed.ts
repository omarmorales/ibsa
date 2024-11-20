// to run this file: npx prisma db seed
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialRoles: Prisma.RoleCreateInput[] = [
  {
    name: "Gerente",
    description: "Encargado de la gestión de la empresa",
  },
  {
    name: "Cajero",
    description: "Encargado de la caja",
  },
  {
    name: "Cargador",
    description: "Encargado de cargar los pedidos",
  },
];

const initialUsers: Prisma.UserCreateInput[] = [
  {
    name: "Ma Teresa Ibarra Torres",
    slug: "ma-teresa-ibarra-torres",
    email: "materesa@test.com",
    role: {
      connectOrCreate: {
        where: {
          name: "Gerente",
        },
        create: {
          name: "Gerente",
          description: "Encargado de la gestión de la empresa",
        },
      },
    },
  },
];

async function main() {
  console.log("Seeding database...");
  for (const role of initialRoles) {
    await prisma.role.create({
      data: role,
    });
  }

  for (const user of initialUsers) {
    await prisma.user.create({
      data: user,
    });
    console.log(`Created user: ${user.name}`);
  }
  console.log("Database seeded!");
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