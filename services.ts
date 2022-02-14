import axios from 'axios';
import {PrismaClient} from '@prisma/client';
const parser = require('xml2json');

export const get1cData = async () => {
  let webData: any;
  await axios({
    url: 'https://xn--24-mlcpqjncfk.xn--p1ai/offers.xml',
    method: 'GET',
    // responseType: 'blob',
  }).then(response => {
    const json = parser.toJson(response.data, {
      object: true,
      trim: true,
    });
    // console.log(json.yml_catalog.shop);
    // webData = json.yml_catalog.shop.offers.offer;
    webData = json.yml_catalog.shop;
  });
  return webData
}

export const collectAllUniqParams = (offers: any) => {
  const allParams = [];
  console.log(`Start forming params ...`)
  for (const offer of offers) {
    for (const param of offer.param) {
      const duplicateParamIndex = allParams.indexOf(param.name);
      if (duplicateParamIndex < 0) {
        allParams.push(param.name);
      }
    }
  }
  console.log(`Forming params finished.`)
  return allParams;
}

export const upsertParams = async (prisma: any, all1cParams: any) => {
  const webParams = await prisma.param.findMany();
  let dataForUpdate: any = [];

  for (const param of all1cParams) {
    let paramDb = webParams.find((webParam: any) => {
      return webParam.name === param;
    })

    if (!paramDb) {
      dataForUpdate.push(param)
    }
  }

  console.log(`${dataForUpdate.length} parameters will be updated or create id MongoDb`);

  for (const param of dataForUpdate) {
    await prisma.param.upsert({
      where: {
        name: param,
      },
      update: {
        name: param,
      },
      create: {
        name: param,
      },
    })
  }

  console.log(`Parameters was seeded successfully`);
}

export let prepareData = async (prisma: any, offers1c: any) => {
  console.log(`Preparing data is started`);

  const webParams = await prisma.param.findMany();
  for (const offer of offers1c) {
    offer.available = offer.available === 'true';
    if (typeof (offer.picture) === 'string') {
      offer.picture = [offer.picture]
    }

    if (Number(offer.price)) {
      offer.price = Math.round(offer.price)
    } else {
      offer.price = 0;
    }
    delete offer.latitude;
    delete offer.longitude;
    delete offer.currencyId;
    delete offer.url;
    delete offer.quant;
    delete offer.sales_notes;

    for (const param of offer.param) {
      const dbParam = webParams.find((webParam: any) => {
        return webParam.name === param.name;
      })
      if (dbParam) {
        param.paramId = dbParam.id;
        param.paramName = dbParam.name;
        delete param.name;
      }
      param.value = param.$t;
      delete param.$t;
    }
  }
  console.log(`Data was prepared successfully`);
}

export const upsertOffers = async (prisma: PrismaClient, offers1c: any) => {
  for (const offer of offers1c) {
    console.log(`'${offer.name}' ----> is updating`);
    await prisma.offer.upsert({
      where: {
        id: offer.id,
      },
      update: {
        available: offer.available,
        name: offer.name,
        price: offer.price,
        categoryId: offer.categoryId,
        picture: offer.picture,
        description: offer.description,
      },
      create: {
        available: offer.available,
        id: offer.id,
        name: offer.name,
        price: offer.price,
        categoryId: offer.categoryId,
        picture: offer.picture,
        description: offer.description,
        param: {
          createMany: {
            data: offer.param,
          },
        },
      },
    })

    for (const param of offer.param) {
      await prisma.offerParam.updateMany({
        where: {
          AND: [
            {
              paramId: param.paramId,
            },
            {
              offerId: offer.id
            },
          ],
        },
        data: {
          value: param.value
        },
      })
    }
  }
}

export const upsertCategories = async (prisma: PrismaClient, all1cCats: any) => {
  const webCategories = await prisma.category.findMany();
  let dataForUpdate: any = [];
  for (const cat of all1cCats.category) {
    let catDb = webCategories.find((webCat: any) => {
      return webCat.id === cat.id && (webCat.name === cat.$t || !cat.$t) && webCat.parentId === cat.parentId;
    })
    if (!catDb) {
      cat.name = cat.$t;
      delete cat.$t;
      dataForUpdate.push(cat)
    }
  }
  console.log(`${dataForUpdate.length} categories will be updated or create id MongoDb`);

  for (const param of dataForUpdate) {
    await prisma.category.upsert({
      where: {
        id: param.id,
      },
      update: {
        name: param.name,
        parentId: param.parentId,
      },
      create: {
        id: param.id,
        name: param.name,
        parentId: param.parentId,
      },
    })
  }

  console.log(`Categories was seeded successfully`);
}
