import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OffersModule } from './offers/offers.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from 'nestjs-prisma';
import config from './common/configs/config';
import { loggingMiddleware } from './common/middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()], // configure your prisma middleware
      },
    }),

    // GraphQLModule.forRootAsync<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   useClass: GqlConfigService,
    // }),

    OffersModule,
  ],
  controllers: [AppController],
  // providers: [AppService, AppResolver],
  providers: [AppService],
})

// @Module({
//   imports: [OffersModule, PrismaService],
//   controllers: [AppController],
//   providers: [AppService],
// })
export class AppModule {}
