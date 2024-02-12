import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import z from "zod"

const app = fastify()

// Conectando com o prisma
const prisma = new PrismaClient()

app.post('/polls', async (request, reply)=>{
  // Modelo de autenticação do zod
  const createPollBody = z.object({
    title: z.string()
  })

  // Capturando valores autenticados pelo zod
  const { title } = createPollBody.parse(request.body)

  // Salvando no banco de dados e recuperando retorno
  const poll = await prisma.poll.create({
    data: {
      title,
    }
  })

  // Retornando para o usuário o que foi calculado
  return reply.status(201).send({ pollId: poll.id })
})

app.listen({ port: 3333 }).then(()=> {
  console.log("HTTP server running!")
})