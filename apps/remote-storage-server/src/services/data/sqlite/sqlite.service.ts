import { Injectable, OnModuleInit } from '@nestjs/common'
import { DataService } from '../data-service/data-service.interface'

@Injectable()
export class SqliteService implements OnModuleInit, DataService {
  private db = null
  private sqlite3 = require('sqlite3')
  constructor() {}

  async onModuleInit() {
    try {
      this.db = new this.sqlite3.Database('./database.sqlite')
      await this.db.run(
        'CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT); CREATE INDEX IF NOT EXISTS key_index ON kv (key)'
      )
    } catch (e) {
      console.error('Failed to initialize sqlite database', e)
    }
  }

  async get<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT value FROM kv WHERE key = ?', [key], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row ? JSON.parse(row.value) : null)
        }
      })
    })
  }

  async set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO kv (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?',
        [key, JSON.stringify(value), JSON.stringify(value)],
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  async delete(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM kv WHERE key = ?', [key], (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}
