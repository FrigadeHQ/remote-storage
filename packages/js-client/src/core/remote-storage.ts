import fetch from 'cross-fetch'
import { uuid } from './utils'

const apiPrefix = `/entities/`

interface RemoteStorageProps {
  serverAddress: string
  instanceId?: string
  userId?: string
}

export class RemoteStorage {
  private readonly serverAddress: string
  private readonly instanceId: string
  private readonly userId: string

  constructor({ serverAddress, instanceId, userId }: RemoteStorageProps) {
    this.serverAddress = serverAddress
    this.instanceId = instanceId ?? uuid()
    this.userId = userId ?? uuid()
  }

  async getItem<T>(key: string): Promise<T> {
    const response = await this.call('GET', `${apiPrefix}${key}`, null)
    return await response.json()
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    await this.call('PUT', `${apiPrefix}${key}`, value)
  }

  async removeItem(key: string): Promise<void> {
    await this.call('DELETE', `${apiPrefix}${key}`, null)
  }

  async call(method: string, path: string, data?: any) {
    return fetch(new URL(path, this.serverAddress).toString(), {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        HEADER_REMOTE_STORAGE_INSTANCE_ID: this.instanceId,
        HEADER_REMOTE_STORAGE_USER_ID: this.userId,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  }
}
