// import
const { PrismaClient } = require("@prisma/client")

// instanciation d'un nouveau prisma client
const prisma = new PrismaClient()

const main = async () => {
  // Equivalent d'un SELECT * FROM users;
  const allUsers = await prisma.users.findMany()
  // Affichage du résultat
  console.log(allUsers)

  // Equivalent en SQL:
  // SELECT login, "lastName", "firstName" FROM users;
  const users = await prisma.users.findMany({
    select: {
      login: true,
      lastName: true,
      firstName: true,
    },
  })
  console.log(users)

  // Equivalent en SQL:
  // SELECT login, "lastName", "firstName" FROM users WHERE id > 1;
  const users2 = await prisma.users.findMany({
    where: {
      id: {
        gt: 1, // greater than
      },
    },
    select: {
      login: true,
      lastName: true,
      firstName: true,
    },
  })
  console.log(users2)

  // Equivalent en SQL:
  // SELECT login, "lastName", "firstName" FROM users WHERE id > 1 ORDER BY id DESC LIMIT 1;
  const users3 = await prisma.users.findMany({
    take: 1,
    orderBy: {
      id: "desc",
    },
    where: {
      id: {
        gt: 1,
      },
    },
    select: {
      login: true,
      lastName: true,
      firstName: true,
    },
  })
  console.log(users3)
}

// Execution de la fonction main
main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    // Fermeture de la connection à la fin de l'exécution du script
    await prisma.$disconnect()
  })

async function main2() {
  // Equivalent en SQL:
  // INSERT INTO users(login, "firstName", "lastName", email) VALUES ('alice', 'Alice', 'Euler', 'alice@mail.com');
  // Le resultat de l'insertion est automatiquement retourné
  const result = await prisma.users.create({
    data: {
      login: "alice",
      firstName: "Alice",
      lastName: "Euler",
      email: "alice@gmail.com",
    },
  })
  console.log(result)
}

/*
main2()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    // Fermeture de la connection à la fin de l'exécution du script
    await prisma.$disconnect()
  })
  */

async function main3() {
  const nbInserted = await prisma.users.createMany({
    data: [
      {
        login: "bob",
        firstName: "Bob",
        lastName: "Durac",
        email: "bob@mail.com",
      },
      {
        login: "charlie",
        firstName: "Charlie",
        lastName: "Turing",
        email: "charlie@mail.com",
      },
    ],
    // ignore les duplications
    skipDuplicates: true,
  })
  console.log(nbInserted)
}

/*
main3()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    // Fermeture de la connection à la fin de l'exécution du script
    await prisma.$disconnect()
  })
  */
