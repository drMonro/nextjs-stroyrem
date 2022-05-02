import {Controller, Get, Param} from '@nestjs/common';
import { Offer as OfferModel } from '@prisma/client';
import { OffersService } from './offers.service';

@Controller('/api')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get('offers')
  async getAllOffers(): Promise<OfferModel[]> {
    return this.offersService.offers({
      where: {
        title: { contains: 'пол' },
      },
    });
  }

  @Get('offers-random/:count')
  async getRandomOffers(@Param('count') count: number): Promise<OfferModel[]> {
    return this.offersService.offersRandom(count);
  }

  // @Get()
  // getOffersByCategory() {
  //   return this.appService.getUsers();
  // }
}
