import { Injectable, OnModuleInit } from '@nestjs/common'
import { createClient } from 'redis'
import { DataService } from '../data-service/data-service.interface'

@Injectable()
export class RedisService implements OnModuleInit, DataService {
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
    const storedData = await this.client.get(key)
    return storedData ? JSON.parse(storedData).value : null
  }

  async set(key: string, value: any, timestamp: number) {
    const currentValue = await this.get(key)
    if (currentValue && currentValue.timestamp > timestamp) {
      return false
    }
    return this.client.set(key, JSON.stringify({ value, timestamp }))
  }

  async delete(key: string) {
    return this.client.del(key)
  }
}
