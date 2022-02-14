import {PrismaClient} from '@prisma/client'
import {collectAllUniqParams, get1cData, prepareData, upsertOffers, upsertParams} from './services';

const prisma = new PrismaClient()

async function main() {
  console.log('main');
}

main()
  .catch((error: any) => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
