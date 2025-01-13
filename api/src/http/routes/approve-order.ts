import { db } from '@/db/connection'
import { orders } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Elysia, NotFoundError, t } from 'elysia'
import { auth } from '../auth'
import { BadRequestError } from '../errors/bad-request-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const approveOrder = new Elysia().use(auth).patch(
  '/orders/:orderId/approve',
  async ({ getCurrentUser, params }) => {
    const { orderId } = params
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError()
    }

    const order = await db.query.orders.findFirst({
      where(fields, { eq, and }) {
        return and(
          eq(fields.id, orderId),
          eq(fields.restaurantId, restaurantId)
        )
      },
    })

    if (!order) {
      throw new NotFoundError('Order not found')
    }

    if (order.status !== 'pending') {
      throw new BadRequestError('You can only approve pending orders')
    }

    await db
      .update(orders)
      .set({ status: 'processing' })
      .where(eq(orders.id, orderId))
  },
  {
    params: t.Object({
      orderId: t.String(),
    }),
  }
)
