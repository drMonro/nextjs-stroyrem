import axios from 'axios';
import {PrismaClient} from '@prisma/client';
import {Type} from 'class-transformer';

const parser = require('xml2json');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
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
    } else {
      let duplicateVendorIndex = allVendors.indexOf('NoName');
      if (duplicateVendorIndex < 0) {
        allVendors.push('NoName');
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

export const createImages = async (prisma: PrismaClient, all1cPictures: any) => {
  console.log(`${all1cPictures.length} pictures will be updated or create id DB`);
  // console.log(all1cPictures)
  await prisma.img.createMany({
    data: all1cPictures,
    skipDuplicates: true,
  })
  console.log(`Parameters was seeded successfully`);
}

export const collectAllImages = (offers1c: any) => {
  let picturesData = []

  for (const offer of offers1c) {

    if (typeof offer.picture === 'string') {
      picturesData.push({
        imgUrl: offer.picture,
      });
    } else {
      for (const picture of offer.picture) {
        picturesData.push({
          imgUrl: picture,
        });
      }
    }
  }
  return picturesData;
}

export let prepareData = async (prisma: PrismaClient, offers1c: any) => {
  console.log(`Preparing data is started`);
  const webParams = await prisma.param.findMany();
  const webVendors = await prisma.vendor.findMany();
  const webImages = await prisma.img.findMany();

  for (const offer of offers1c) {
    // Boolean Available status
    offer.available = offer.available === 'true';
    // Pictures to array
    if (typeof (offer.picture) === 'string') {
      offer.picture = [offer.picture]
    }
    let picturesData = []
    for (const picture of offer.picture) {
      const webImage = webImages.find((webImage: any) => webImage.imgUrl === picture);
      picturesData.push({
        imgId: webImage.id
      });
    }
    offer.picture = picturesData;

    // Price
    if (Number(offer.price)) {
      offer.price = Math.round(offer.price)
    } else {
      offer.price = 0;
    }
    // Description
    const dom = new JSDOM(offer.description);
    offer.description = dom.window.document.querySelector('.good-description__par--main').innerHTML;
    // Setting NaName vendor
    if (!!offer.param.find(param => param.name === 'Производитель, марка') === false) {
      offer.param.push({name: 'Производитель, марка', '$t': 'NoName'});
    }

    for (const param of offer.param) {
      const dbParam = webParams.find((webParam: any) => webParam.name === param.name);
      param.paramId = dbParam.id;
      param.value = param.$t;

      if (param.name === 'Производитель, марка') {
        const dbVendor = webVendors.find((webVendor: any) => webVendor.title === param.value);
        offer.vendor = {
          vendorId: dbVendor.id,
        }
      }
      delete param.$t;
      delete param.name;
    }
    delete offer.latitude;
    delete offer.longitude;
    delete offer.currencyId;
    delete offer.url;
    delete offer.quant;
    delete offer.sales_notes;

  }
  console.log(`Data was prepared successfully`);
}

export const createOffers = async (prisma: PrismaClient, offers1c: any) => {
  for (const offer1c of offers1c) {
    console.log(`'${offer1c.name}' ----> is creating`);
    await prisma.offer.create({data: {
        available: offer1c.available,
        id: offer1c.id,
        title: offer1c.name,
        price: offer1c.price,
        description: offer1c.description,
        // mataTitle: 'test',
        // slug: 'test',
        // sku: 'test',
        quantity: 0,
        params: {
          createMany: {
            data: offer1c.param,
          },
        },
        images: {
          createMany: {
            data: offer1c.picture,
          },
        },
        vendor: {
          createMany: {
            data: offer1c.vendor,
          },
        },
      },
    })
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
