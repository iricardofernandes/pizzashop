import { db } from '@/db/connection'
import { authLinks } from '@/db/schema'
import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { auth } from '../auth'

export const authenticateFromLink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ redirect, query, signUser }) => {
    const { code, redirectTo } = query

    const authLinkFromCode = await db.query.authLinks.findFirst({
      where(fields, { eq }) {
        return eq(fields.code, code)
      },
    })

    if (!authLinkFromCode) {
      throw new Error('Invalid auth link')
    }

    const daySinceAuthLinkCreated = dayjs().diff(
      authLinkFromCode.createdAt,
      'days'
    )

    if (daySinceAuthLinkCreated > 7) {
      throw new Error('Auth link expired, please generate a new one')
    }

    const managerRestaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.managerId, authLinkFromCode.userId)
      },
    })

    await signUser({
      sub: authLinkFromCode.userId,
      restaurantId: managerRestaurant?.id,
    })

    await db.delete(authLinks).where(eq(authLinks.code, code))

    return redirect(redirectTo)
  },
  {
    query: t.Object({
      code: t.String(),
      redirectTo: t.String(),
    }),
  }
)
