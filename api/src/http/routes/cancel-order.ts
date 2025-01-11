import { db } from '@/db/connection'
import { orders } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Elysia, NotFoundError, t } from 'elysia'
import { auth } from '../auth'
import { BadRequestError } from '../errors/bad-request-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const cancelOrder = new Elysia().use(auth).patch(
  '/orders/:orderId/cancel',
  async ({ getCurrentUser, params }) => {
    const { orderId } = params
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError()
    }

    const order = await db.query.orders.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, orderId)
      },
    })

    if (!order) {
      throw new NotFoundError('Order not found')
    }

    if (!['pending', 'processing'].includes(order.status)) {
      throw new BadRequestError('You cannot cancel orders after dispatch')
    }

    await db
      .update(orders)
      .set({ status: 'canceled' })
      .where(eq(orders.id, orderId))
  },
  {
    params: t.Object({
      orderId: t.String(),
    }),
  }
)
