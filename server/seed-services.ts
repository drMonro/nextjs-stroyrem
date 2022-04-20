import axios from 'axios';
import {PrismaClient} from '@prisma/client';
import {Type} from 'class-transformer';

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

export const collectAllVendors = (offers: any) => {
  const allVendors = [];
  console.log(`Start forming vendors data ...`)
  for (const offer of offers) {
    const vendorParam = offer.param.find(param => param.name === 'Производитель, марка');
    if (vendorParam) {
      let duplicateVendorIndex = allVendors.indexOf(vendorParam.$t);
      if (duplicateVendorIndex < 0) {
        allVendors.push(vendorParam.$t);
      }
    }

  }
  console.log(`Forming params finished.`)
  return allVendors;
}

export const upsertVendors = async (prisma: PrismaClient, allVendors: any) => {

  console.log(`${allVendors.length} vendors will be updated or create id DB`);
  for (const vendor of allVendors) {
    await prisma.vendor.upsert({
      where: {
        title: vendor,
      },
      update: {
        title: vendor,
      },
      create: {
        title: vendor,
      },
    })
  }
  console.log(`Vendors was seeded successfully`);
}

export const upsertParams = async (prisma: PrismaClient, all1cParams: any) => {
  console.log(`${all1cParams.length} parameters will be updated or create id DB`);
  for (const param of all1cParams) {
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

export let prepareData = async (prisma: PrismaClient, offers1c: any) => {
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
      // if (dbParam) {
      param.paramId = dbParam.id;
      // param.paramName = dbParam.name;
      delete param.name;
      // }
      param.value = param.$t;
      delete param.$t;
    }
    // console.log(offer)
  }
  console.log(`Data was prepared successfully`);
}

export const upsertOffers = async (prisma: PrismaClient, offers1c: any) => {
  for (const [index, value] of offers1c.entries()) {
    // if (index === 0 || index === 1 || index === 2) {
    if (index === 0) {
      // let offer = offers1c[0];
      console.log(`'${value.name}' ----> is updating`);
      console.log(value)
      await prisma.offer.upsert({
        where: {
          id: value.id,
        },
        update: {
          available: value.available,
          // relevantWith: {
          //   connect: {
          //     id: "00000000331",
          //   },
          // },

          relevantOffers: {
            connect:
              [{ id: 'УТ000006442' }, { id: 'УТ000006460' }],
              // id: "УТ000006442",

          }
          // }
          // title: offer.name,
          // price: offer.price,
          // // categoryId: offer.categoryId,
          // // picture: offer.picture,
          // description: offer.description,
        },
        create: {
          available: value.available,
          id: value.id,
          title: value.name,
          price: value.price,
          // description: offer.description,
          description: 'test',
          mataTitle: 'test',
          slug: 'test',
          sku: 'test',
          quantity: 0,
          params: {
            createMany: {
              data: value.param,
            },
          },
          images: {
            createMany: {
              data: [],
            },
          },
          vendor: {
            createMany: {
              data: [],
            },
          },
          // relevantWith: {
          //   connect: {
          //     id: "2",
          //   },
          // },
          // relevantOffers: {
          //   connect: {
          //     id: "2",
          //   },
          // }

          // relevantedWith: {
          //   createMany: {
          //     data: [],
          //   },
          // },
          // categoryId: offer.categoryId,
          // picture: offer.picture,
          // param: {
          //   createMany: {
          //     data: offer.param,
          //   },
          // },
        },
      })
    }
    // for (const param of offer.param) {
    //   await prisma.offerParam.updateMany({
    //     where: {
    //       AND: [
    //         {
    //           paramId: param.paramId,
    //         },
    //         {
    //           offerId: offer.id
    //         },
    //       ],
    //     },
    //     data: {
    //       value: param.value
    //     },
    //   })
    // }
  }
}

export const upsertCategories = async (prisma: PrismaClient, all1cCats: any) => {
  let dataForUpdate: any = [];
  for (const cat of all1cCats.category) {
    cat.name = cat.$t;
    delete cat.$t;
    dataForUpdate.push(cat)
  }

  console.log(`${dataForUpdate.length} categories will be updated or create id DB`);

  for (const param of dataForUpdate) {
    await prisma.category.upsert({
      where: {
        id: param.id,
      },
      update: {
        title: param.name,
        parentId: param.parentId,
      },
      create: {
        id: param.id,
        title: param.name,
        parentId: param.parentId,
        // metaTitle: 'test',
        // slug: 'test',
        // description: 'test',
      },
    })
  }

  console.log(`Categories was seeded successfully`);
}
