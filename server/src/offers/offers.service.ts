import {Injectable} from '@nestjs/common';
import {Offer, Prisma} from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {
  }

  async offer(offerWhereUniqueInput: Prisma.OfferWhereUniqueInput): Promise<Offer | null> {
    return this.prisma.offer.findUnique({
      where: offerWhereUniqueInput,
    });
  }



  // async offersRandom(): Promise<any> {
  //   // return this.prisma.offer.aggregate(
  //   //   [ { $sample: { size: 3 } } ]
  //   // )
  //   return await this.prisma.$transaction([
  //     // this.prisma.offer.findRaw({
  //     //   filter: { age: { $gt: 25 } }
  //     // }),
  //     this.prisma.offer.aggregateRaw({
  //       pipeline: [
  //         { $sample: { size: 1 } },
  //         // { $match: { name: "registered" } },
  //         // { $group: { _id: "fdsf"} }
  //       ]
  //     }),
  //   ])
  //
  //   // return this.prisma.offer.aggregateRaw({
  //   //   pipeline: [
  //   //     { $sample: { size: 3 } },
  //   //     { $match: { status: "registered" } },
  //   //     { $group: { _id: "$country", total: { $sum: 1 } } }
  //   //   ]
  //   // })
  // }

  async offers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OfferWhereUniqueInput;
    where?: Prisma.OfferWhereInput;
    // orderBy?: Prisma.OfferOrderByWithRelationInput;
  }): Promise<Offer[]> {
    // const {skip, take, cursor, where, orderBy} = params;
    const {skip, take, cursor, where} = params;
    return this.prisma.offer.findMany({skip, take, cursor, where});
  }
}
