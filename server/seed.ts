import {PrismaClient} from '@prisma/client'
import {collectAllImages, collectAllUniqParams, collectAllVendors, createImages, get1cData, prepareData, upsertCategories, createOffers, upsertParams, upsertVendors} from './seed-services';

const prisma = new PrismaClient()

async function main() {
  const {offers: {offer: offers1c}, categories} = await get1cData();
  await prisma.$connect();
  try {
    console.log(`Start seeding ...`)

    // await prisma.offerCategory.deleteMany();
    // await prisma.category.deleteMany();
    // await upsertCategories(prisma, categories);

    // await prisma.offerParam.deleteMany();
    // await prisma.param.deleteMany();
    // await upsertParams(prisma, collectAllUniqParams(offers1c));

    // await prisma.offerVendor.deleteMany();
    // await prisma.vendor.deleteMany();
    // await upsertVendors(prisma, collectAllVendors(offers1c));

    // await prepareImages(prisma, offers1c);
    // await prisma.offerImg.deleteMany();
    // await prisma.img.deleteMany();
    await createImages(prisma, collectAllImages(offers1c));

    // await prepareData(prisma, offers1c);

    // await prisma.offer.deleteMany();
    // // console.log(offers1c)

    // await createOffers(prisma, offers1c);

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
