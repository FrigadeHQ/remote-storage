import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EntitiesModule } from './entities/entities.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), EntitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
