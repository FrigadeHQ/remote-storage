import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Actor, Entity } from './entities.interface'

import { DataServiceFactory } from '../services/data/data-service/data-service.factory'

const MAX_ENTITY_SIZE_BYTES = 1000000

@Injectable()
export class EntitiesService {
  constructor(private dataServiceFactory: DataServiceFactory) {}

  async get(actor: Actor, key: string): Promise<Entity> {
    const entityKey = this.getEntityKey(actor, key)
    const value = await this.dataServiceFactory.getService().get(entityKey)

    if (!value) {
      throw new NotFoundException('Entity not found')
    }

    return value
  }

  async set(actor: Actor, key: string, value: any): Promise<void> {
    if (!key || !value) {
      throw new BadRequestException('Key or value not provided')
    }
    if (JSON.stringify(value).length > MAX_ENTITY_SIZE_BYTES) {
      throw new BadRequestException(`Entity size exceeds ${MAX_ENTITY_SIZE_BYTES} bytes`)
    }

    const entityKey = this.getEntityKey(actor, key)

    return await this.dataServiceFactory.getService().set(entityKey, value,new Date().getTime())
  }

  async delete(actor: Actor, key: string): Promise<void> {
    if (!key) {
      throw new BadRequestException('Key not provided')
    }
    const entityKey = this.getEntityKey(actor, key)

    return await this.dataServiceFactory.getService().delete(entityKey)
  }

  private getEntityKey(actor: Actor, key: string): string {
    return `${actor.instanceId}:${actor.userId}:${key}`
  }
}
