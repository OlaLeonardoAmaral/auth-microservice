import { app } from './app'
import { env } from './config'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 Server is running on port ${env.PORT}`)
  })
