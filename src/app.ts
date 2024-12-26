import fastify from 'fastify'
import { appRoutes } from './http/route'
import { ZodError } from 'zod'
import { env } from './config'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt,{
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Aqui deve ser feito o log para uma ferramenta externa, DataDog, NewRelic, Sentry, etc.
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
