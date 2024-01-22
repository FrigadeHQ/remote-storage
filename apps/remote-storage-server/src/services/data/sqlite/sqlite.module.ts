import { Module } from '@nestjs/common'
import { SqliteService } from './sqlite.service'

@Module({
  providers: [SqliteService],
  exports: [SqliteService],
})
export class SqliteModule {}
