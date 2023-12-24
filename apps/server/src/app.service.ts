import { Injectable } from '@nestjs/common';
import { PrismaWriterService } from './services/prisma/prisma-writer.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaWriterService) {}
}
