import { db } from '@/db/connection'
import { authLinks } from '@/db/schema'
import { env } from '@/env'
import { createId } from '@paralleldrive/cuid2'
import { Elysia, NotFoundError, t } from 'elysia'
// import { mail } from '@/lib/mail'
// import nodemailer from 'nodemailer'

export const sentAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    const userFromEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (!userFromEmail) {
      throw new NotFoundError('User not found')
    }

    const authLinkCode = createId()

    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode,
    })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirectTo', env.AUTH_REDIRECT_URL)

    console.log(authLink.toString())

    // const info = await mail.sendMail({
    //   from: {
    //     name: 'Pizza Shop',
    //     address: 'hi@pizzashop.com',
    //   },
    //   to: email,
    //   subject: 'Authenticate to Pizza Shop',
    //   text: `Use the following link to authenticate on Pizza Shop: ${authLink.toString()}`,
    // })

    // console.log(nodemailer.getTestMessageUrl(info))
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  }
)
