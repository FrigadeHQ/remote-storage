import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Actor, Entity } from './entities.interface'
import { RedisService } from '../services/redis/redis.service'

const MAX_ENTITY_SIZE_BYTES = 1000000

@Injectable()
export class EntitiesService {
  constructor(private redisService: RedisService) {}

  async get(actor: Actor, key: string): Promise<Entity> {
    const entityKey = this.getEntityKey(actor, key)
    const value = await this.redisService.get(entityKey)

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

    return await this.redisService.set(entityKey, value)
  }

  async delete(actor: Actor, key: string): Promise<void> {
    if (!key) {
      throw new BadRequestException('Key not provided')
    }
    const entityKey = this.getEntityKey(actor, key)

    return await this.redisService.delete(entityKey)
  }

  private getEntityKey(actor: Actor, key: string): string {
    return `${actor.instanceId}:${actor.userId}:${key}`
  }
}
