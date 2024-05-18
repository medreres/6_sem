import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { auth } from '@/configuration';

import { cities } from './data';

const prisma = new PrismaClient();

async function main() {
  const { SALT_ROUNDS } = auth();

  const connectOrCreate = cities.map((city) => ({
    where: {
      address: city.address,
    },
    create: city,
  }));

  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      cities: {
        connectOrCreate,
      },
      password: await bcrypt.hash('admin@admin.com', SALT_ROUNDS),
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: await bcrypt.hash('test@test.com', SALT_ROUNDS),
    },
  });

  console.log('admin', admin);
  console.log('user', user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
