import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './services/prisma/prisma.module';
import { EntitiesModule } from './entities/entities.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { CustomersService } from './customers/customers.service';
import { BootstrapService } from './services/common/bootstrap.service';
import { OrganizationsService } from './organizations/organizations.service';
import { ApiKeysModule } from './apiKeys/apiKeys.module';
import { UsersModule } from './users/users.module';
import { FlowResponsesModule } from './flowResponses/flowResponses.module';
import { UserEntitiestatesModule } from './userEntitiestates/userEntitiestates.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { ActorsModule } from './actors/actors.module';
import { CustomersModule } from './customers/customers.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { WebhookSubscriptionsModule } from './webhookSubscriptions/webhookSubscriptions.module';
import { TriggersModule } from './triggers/triggers.module';
import { ObjectScalarType } from './shared/models';
import { UserGroupsModule } from './userGroups/userGroups.module';
import { DigitalOceanModule } from './thirdParty/digitalOcean/digitalOcean.module';
import { SegmentModule } from './thirdParty/cdp/segment/segment.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MixpanelModule } from './thirdParty/cdp/mixpanel/mixpanel.module';
import { EntitiesStatsService } from './entities/entities-stats.service';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { getEnv } from './shared/constants';
import { AnalyticsEventsModule } from './analyticsEvents/analyticsEvents.module';

@Module({
  imports: [
    EntitiesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
