import {PrismaClient} from '@prisma/client'
import {collectAllUniqParams, collectAllVendors, get1cData, prepareData, upsertCategories, upsertOffers, upsertParams, upsertVendors} from './seed-services';

const prisma = new PrismaClient()

async function main() {
  const {offers: {offer: offers1c}, categories} = await get1cData();
  await prisma.$connect();
  try {
    console.log(`Start seeding ...`)
    // await upsertCategories(prisma, categories);
    // await upsertParams(prisma, collectAllUniqParams(offers1c));
    // await upsertVendors(prisma, collectAllVendors(offers1c));

    await prepareData(prisma, offers1c);
    await upsertOffers(prisma, offers1c);
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((error: any) => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
