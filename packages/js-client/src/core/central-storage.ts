import fetch from 'cross-fetch'

export class CentralStorage {
  private readonly serverAddress: string
  private readonly instanceId: string
  private readonly userId: string

  constructor(serverAddress: string, instanceId: string, userId: string) {
    this.serverAddress = serverAddress
    this.instanceId = instanceId
    this.userId = userId
  }

  async getItem<T>(key: string): Promise<T> {
    const response = await this.call('GET', `/api/entity/${key}`, null)
    return await response.json()
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    await this.call('PUT', `/api/entity/${key}`, value)
  }

  async removeItem(key: string): Promise<void> {
    await this.call('DELETE', `/api/entity/${key}`, null)
  }

  async call(method: string, path: string, data: any) {
    // Throw error if not initialized
    if (!this.serverAddress || !this.instanceId || !this.userId) {
      throw new Error(
        'centralStorage has not been initialized. Please call centralStorage.init() first.'
      )
    }

    return fetch(`${this.serverAddress}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        HEADER_GLOBAL_STORAGE_INSTANCE_ID: this.instanceId,
        HEADER_GLOBAL_STORAGE_USER_ID: this.userId,
      },
      body: JSON.stringify(data),
    })
  }
}