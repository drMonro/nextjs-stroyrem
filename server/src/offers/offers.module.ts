import { Module } from '@nestjs/common';
import {OffersService} from './offers.service';
import {OffersController} from './offers.controller';
import {PrismaService} from '../prisma.service';

@Module({
  imports: [],
  // providers: [OffersService, PrismaService],
  providers: [OffersService],
  controllers: [OffersController],

})

export class OffersModule {
}
