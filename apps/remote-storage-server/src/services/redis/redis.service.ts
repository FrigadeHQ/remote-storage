import { Injectable, OnModuleInit } from '@nestjs/common'
import { createClient } from 'redis'

@Injectable()
export class RedisService implements OnModuleInit {
  private client: any

  constructor() {}

  async onModuleInit() {
    try {
      this.client = await createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      })
        .on('error', (err) => console.log('Redis Client Error', err))
        .connect()
    } catch (e) {
      console.log('Failed to connect to db', e)
    }
  }

  async get(key: string) {
    const value = await this.client.get(key)
    return value ? JSON.parse(value) : null
  }

  async set(key: string, value: any) {
    return this.client.set(key, JSON.stringify(value))
  }

  async delete(key: string) {
    return this.client.del(key)
  }
}
