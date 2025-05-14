import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });

  // Create some test customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        spend: 15000,
        visits: 5,
        lastPurchase: new Date(),
        segmentId: '', // Will be updated after segment creation
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        spend: 8000,
        visits: 2,
        lastPurchase: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        segmentId: '', // Will be updated after segment creation
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        spend: 25000,
        visits: 8,
        lastPurchase: new Date(),
        segmentId: '', // Will be updated after segment creation
      },
    }),
  ]);

  // Create a test segment
  const segment = await prisma.segment.create({
    data: {
      name: 'High Value Customers',
      rules: {
        operator: 'AND',
        conditions: [
          {
            field: 'spend',
            operator: '>',
            value: 10000,
          },
        ],
      },
      userId: user.id,
    },
  });

  // Update customers with segment ID
  await Promise.all(
    customers.map((customer) =>
      prisma.customer.update({
        where: { id: customer.id },
        data: { segmentId: segment.id },
      })
    )
  );

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 