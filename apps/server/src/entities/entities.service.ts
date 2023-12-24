import { Injectable } from '@nestjs/common'
import { Actor, Entity } from './entities.interface'

@Injectable()
export class EntitiesService {
  constructor() {}

  async get(actor: Actor, key: string): Promise<Entity> {
    return 'hello world'
  }
}
