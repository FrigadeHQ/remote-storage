import fetch from 'cross-fetch'
import { isWeb, uuid } from './utils'
import { HEADER_REMOTE_STORAGE_INSTANCE_ID, HEADER_REMOTE_STORAGE_USER_ID } from './constants'

const apiPrefix = `/entities/`

interface RemoteStorageProps {
  serverAddress: string
  userId?: string
  instanceId?: string
}

export class RemoteStorage {
  private readonly serverAddress: string
  private readonly instanceId: string
  private readonly userId: string

  constructor({ serverAddress, userId, instanceId }: RemoteStorageProps) {
    this.serverAddress = serverAddress
    this.instanceId = instanceId ?? 'default'
    this.userId = userId ?? this.getUserId()
  }

  async getItem<T>(key: string): Promise<T> {
    const response = await this.call('GET', `${apiPrefix}${key}`, null)
    // Check for 404 and return null if so
    if (response.status === 404) {
      return null
    }
    const data = await response.text()
    // Check if valid JSON
    if (!data.startsWith('{')) {
      if (data === 'true') {
        return true as unknown as T
      }
      if (data === 'false') {
        return false as unknown as T
      }
      if (!isNaN(Number(data))) {
        return Number(data) as unknown as T
      }

      return data as T
    }
    return JSON.parse(data) as T
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
        [HEADER_REMOTE_STORAGE_INSTANCE_ID]: this.instanceId,
        [HEADER_REMOTE_STORAGE_USER_ID]: this.userId,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  private getUserId(): string | null {
    const key = `rs-user-id`
    if (isWeb()) {
      if (window.localStorage.getItem(key)) {
        return window.localStorage.getItem(key)
      }
    }
    const userId = uuid()
    if (isWeb()) {
      window.localStorage.setItem(key, userId)
    }
    return userId
  }
}
