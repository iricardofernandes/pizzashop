import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import { db } from './connection'
import {
  authLinks,
  orderItems,
  orders,
  products,
  restaurants,
  users,
} from './schema'

/**
 * Reset database
 */
await db.delete(users)
await db.delete(restaurants)
await db.delete(orderItems)
await db.delete(orders)
await db.delete(products)
await db.delete(authLinks)

console.log('✔ Database reset!')

/**
 * Create customers
 */
const [customer1, customer2] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'customer',
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'customer',
    },
  ])
  .returning()

console.log('✔ Created customers!')

/**
 * Create manager
 */
const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: 'admin@admin.com',
      role: 'manager',
    },
  ])
  .returning({
    id: users.id,
  })

console.log('✔ Created manager!')

/**
 * Create restaurant
 */
const [restaurant] = await db
  .insert(restaurants)
  .values([
    {
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      managerId: manager.id,
    },
  ])
  .returning()

console.log('✔ Created manager!')

/**
 * Create products
 */
function generateProduct() {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    restaurantId: restaurant.id,
    priceInCenters: Number(
      faker.commerce.price({ min: 190, max: 490, dec: 0 })
    ),
  }
}

const availableProducts = await db
  .insert(products)
  .values([
    generateProduct(),
    generateProduct(),
    generateProduct(),
    generateProduct(),
    generateProduct(),
    generateProduct(),
  ])
  .returning()

console.log('✔ Created products!')

/**
 * Create orders
 */
type OrderItemsInsert = typeof orderItems.$inferInsert
type OrderInsert = typeof orders.$inferInsert

const orderItemsToInsert: OrderItemsInsert[] = []
const orderToInsert: OrderInsert[] = []

for (let i = 0; i < 200; i++) {
  const orderId = createId()

  const orderProducts = faker.helpers.arrayElements(availableProducts, {
    min: 1,
    max: 3,
  })

  let totalInCents = 0

  // biome-ignore lint/complexity/noForEach: <explanation>
  orderProducts.forEach(orderProduct => {
    const quantity = faker.number.int({ min: 1, max: 3 })

    totalInCents += orderProduct.priceInCenters * quantity

    orderItemsToInsert.push({
      orderId,
      productId: orderProduct.id,
      priceInCents: orderProduct.priceInCenters,
      quantity,
    })

    orderToInsert.push({
      id: orderId,
      customerId: faker.helpers.arrayElement([customer1.id, customer2.id]),
      restaurantId: restaurant.id,
      totalInCents,
      status: faker.helpers.arrayElement([
        'pending',
        'processing',
        'delivering',
        'delivered',
        'canceled',
      ]),
      createdAt: faker.date.recent({ days: 40 }),
    })
  })
}

await db.insert(orders).values(orderToInsert).execute()
await db.insert(orderItems).values(orderItemsToInsert).execute()

console.log('✔ Created orders!')

console.log('✔ Database seeded successfully!')

process.exit()
