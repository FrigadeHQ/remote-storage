import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PrismaWriterService } from '../services/prisma/prisma-writer.service';
import { CreateFlowDto, UpdateFlowDto } from './flows.interface';
import { generateSlug, SLUG_FLOW } from '../shared/keys';
import { Actor } from '../actors/actors.interface';
import { getFlowSteps, yamlToJson } from './flows.util';
import { Cache } from 'cache-manager';
import { ArchiveBehavior, Flow, FlowStatus } from '@prisma/client';
import { PrismaReaderService } from '../services/prisma/prisma-reader.service';
import {Entity} from "./entities.interface";

const DEFAULT_CACHE_TTL_MS = 10_000;
@Injectable()
export class FlowsService {
  constructor(
  ) {}

  async get(actor: Actor, key: string): Promise<Entity> {
    return "hello world"
  }

}
