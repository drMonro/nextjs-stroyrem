import {Injectable} from '@nestjs/common';
import {Offer, Prisma} from '@prisma/client';
import {PrismaService} from 'nestjs-prisma';
import {getRandomIndexesArray, getRandomNumberFromRange} from '../../services';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async offer(
    offerWhereUniqueInput: Prisma.OfferWhereUniqueInput,
  ): Promise<Offer | null> {
    return this.prisma.offer.findUnique({
      where: offerWhereUniqueInput,
    });
  }

  async offersRandom(count: number): Promise<any> {
    let allOffers = await this.prisma.offer.findMany({
      include: {
        images: {
          include: {
            img: true,
          },
        },
      },
    });
    let randomOffers = [];

    let randomIndexes = getRandomIndexesArray(allOffers.length, count)
    randomIndexes.forEach(index => {
      randomOffers.push(allOffers[index])
    });
    return randomOffers;
  }

  async offers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OfferWhereUniqueInput;
    where?: Prisma.OfferWhereInput;
    // orderBy?: Prisma.OfferOrderByWithRelationInput;
  }): Promise<Offer[]> {
    // const {skip, take, cursor, where, orderBy} = params;
    const { skip, take, cursor, where } = params;
    return this.prisma.offer.findMany({ skip, take, cursor, where });
  }
}
