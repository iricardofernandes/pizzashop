import { Elysia } from 'elysia'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { getProfile } from './routes/get-profile'
import { registerRestaurant } from './routes/register-restaurant'
import { sentAuthLink } from './routes/send-auth-link'
import { signOut } from './routes/sign-out'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sentAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)

app.listen(3333, () => {
  console.log('HTTP server is running!')
})
