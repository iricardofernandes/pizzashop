import { Elysia } from 'elysia'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { registerRestaurant } from './routes/register-restaurant'
import { sentAuthLink } from './routes/send-auth-link'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sentAuthLink)
  .use(authenticateFromLink)

app.listen(3333, () => {
  console.log('HTTP server is running!')
})
