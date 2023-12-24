import { CacheModule, Module } from '@nestjs/common';
import { PrismaWriterService } from '../services/prisma/prisma-writer.service';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { PrismaModule } from '../services/prisma/prisma.module';
import { CustomersService } from '../customers/customers.service';
import { ApiKeysModule } from '../apiKeys/apiKeys.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { OrganizationsService } from '../organizations/organizations.service';
import { EntitiesResolver } from './entities.resolver';
import { ActorsModule } from '../actors/actors.module';
import { EntitiesStatsService } from './entities-stats.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaReaderService } from '../services/prisma/prisma-reader.service';
import { AnalyticsEventsModule } from '../analyticsEvents/analyticsEvents.module';
import { AnalyticsEventsService } from '../analyticsEvents/analyticsEvents.service';

@Module({
  imports: [
  ],
  controllers: [EntitiesController],
  providers: [
    EntitiesResolver,
    EntitiesService,
  ],
  exports: [EntitiesService],
})
export class EntitiesModule {}
