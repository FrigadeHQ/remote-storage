import { Injectable, OnModuleInit } from '@nestjs/common'
import { DataService } from '../data-service/data-service.interface'

@Injectable()
export class SqliteService implements OnModuleInit, DataService {
  private db = null
  private sqlite3 = require('sqlite3')
  constructor() { }

  async onModuleInit() {
    try {
      this.db = new this.sqlite3.Database('./database.sqlite')
      await this.db.run(
        'CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT, timestamp INTEGER); CREATE INDEX IF NOT EXISTS key_index ON kv (key)'
      )
    } catch (e) {
      console.error('Failed to initialize sqlite database', e)
    }
  }

  async get<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT value, timestamp FROM kv WHERE key = ?', [key], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          const data = JSON.parse(row.value);
          resolve(data);
        } else {
          resolve(null);
        }
      })
    });
  }


  async set(key: string, value: any, timestamp: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT value, timestamp FROM kv WHERE key = ?',
        [key],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row && row.timestamp > timestamp) {
            reject(new Error('Conflict detected'));
          } else {
            this.db.run(
              'INSERT INTO kv (key, value, timestamp) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, timestamp = ?',
              [key, JSON.stringify(value), timestamp, JSON.stringify(value), timestamp],
              (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              }
            );
          }
        }
      );
    });
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
