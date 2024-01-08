import { RemoteStorage } from '../src'
import { uuid } from '../src/core/utils'

describe('global storage', () => {
  function getConfig() {
    return {
      serverAddress: 'https://rs.frigade.com',
      instanceId: uuid(),
      userId: uuid(),
    }
  }

  it('should be able to set and get an item', async () => {
    const remoteStorage = new RemoteStorage(getConfig())
    await remoteStorage.setItem('key', 'value')
    const value = await remoteStorage.getItem('key')
    expect(value).toEqual('value')
  })

  it('should be able to set and remove an item', async () => {
    const remoteStorage = new RemoteStorage(getConfig())
    await remoteStorage.setItem('key', 'value')
    await remoteStorage.removeItem('key')
    const value = await remoteStorage.getItem('key')
    console.log(value, typeof value)
    expect(value).toEqual(null)
  })

  it('should be able to set and get a boolean', async () => {
    const remoteStorage = new RemoteStorage(getConfig())
    await remoteStorage.setItem('key', true)
    const value = await remoteStorage.getItem<boolean>('key')
    expect(value).toEqual(true)
  })

  it('should throw an error if not initialized', async () => {
    const remoteStorage = new RemoteStorage({ serverAddress: '', instanceId: '', userId: '' })
    try {
      await remoteStorage.setItem('key', 'value')
    } catch (error: any) {
      expect(error.message).toEqual('Invalid base URL: ')
    }
  })

  it('should be able to set and get a number', async () => {
    const remoteStorage = new RemoteStorage(getConfig())
    await remoteStorage.setItem('key', 123)
    const value = await remoteStorage.getItem<number>('key')
    expect(value).toEqual(123)
  })

  it('should be able to set and get a string', async () => {
    const remoteStorage = new RemoteStorage(getConfig())
    await remoteStorage.setItem('key', 'value')
    const value = await remoteStorage.getItem<string>('key')
    expect(value).toEqual('value')
  })

  it('should be able to set and get an object', async () => {
    const remoteStorage = new RemoteStorage(getConfig())
    await remoteStorage.setItem('key', { foo: 'bar' })
    const value = await remoteStorage.getItem<{ foo: string }>('key')
    expect(value).toEqual({ foo: 'bar' })
  })
})
