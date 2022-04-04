import {Controller, Get} from '@nestjs/common';
import {Offer as OfferModel} from '@prisma/client';
import {OffersService} from './offers.service';

@Controller('/api')

export class OffersController {
  constructor(
    private readonly offersService: OffersService,
  ) {
  }

  @Get('offers')
  async getAllOffers(): Promise<OfferModel[]> {
    return this.offersService.offers({
      where:
        {
          name: {contains: 'пол'},
        },

    });
  }

  // @Get('offers-random')
  // async getRandomOffers(): Promise<OfferModel[]> {
  //   return this.offersService.offersRandom();
  // }

  // @Get()
  // getOffersByCategory() {
  //   return this.appService.getUsers();
  // }
}
