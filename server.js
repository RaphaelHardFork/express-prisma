const express = require("express")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

const IP_LOOPBACK = "localhost"
const IP_LOCAL = "172.28.0.1"
const PORT = 3333

app.use(express.urlencoded({ extended: false })) // to support URL-encoded bodies
app.use(express.json()) // to support JSON-encoded bodies

app.get("/", async (req, res) => {
  const allUsers = await prisma.users.findMany()
  res.send(allUsers)
})

app.get("/logins", async (req, res) => {
  const users = await prisma.users.findMany({
    select: { login: true },
  })
  res.send(users)
})

app.get("/user/:id", async (req, res) => {
  const id = Number(req.params.id)
  const usersInfo = await prisma.users.findMany({
    where: { id },
  })
  res.send(usersInfo)
})

app.post("/add", async (req, res) => {
  const result = await prisma.users.create({
    data: {
      login: req.body.login,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
  })
  res.send(
    `user ${
      req.body.firstName + " " + req.body.lastName
    } is well registered with id ${result.id}`
  )
})

app.post("/post", async (req, res) => {
  const userID = await prisma.users.findUnique({
    select: {},
  })
  const result = await prisma.posts.create({
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  })
})

app.listen(PORT, IP_LOOPBACK, () => {
  console.log(`APP listening at http://${IP_LOOPBACK}:${PORT}/`)
})
