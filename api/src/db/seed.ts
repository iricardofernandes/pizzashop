import { faker } from '@faker-js/faker'
import { db } from './connection'
import { restaurants, users } from './schema'

/**
 * Reset database
 */
await db.delete(users)
await db.delete(restaurants)

console.log('✔ Database reset!')

/**
 * Create customers
 */
await db.insert(users).values([
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

console.log('✔ Created customers!')

/**
 * Create manger
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
await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager.id,
  },
])

console.log('✔ Created manager!')

console.log('✔ Database seeded successfully!')

process.exit()
