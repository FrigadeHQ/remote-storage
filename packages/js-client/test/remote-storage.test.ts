import {RemoteStorage} from '../src'

describe('global storage', () => {
  // it('should be able to set and get an item', async () => {
  //   const remoteStorage = new RemoteStorage('http://localhost:3000', 'instanceId', 'userId')
  //   await remoteStorage.setItem('key', 'value')
  //   const value = await remoteStorage.getItem('key')
  //   expect(value).toEqual('value')
  // })
  //
  // it('should be able to set and remove an item', async () => {
  //   const remoteStorage = new RemoteStorage('http://localhost:3000', 'instanceId', 'userId')
  //   await remoteStorage.setItem('key', 'value')
  //   await remoteStorage.removeItem('key')
  //   const value = await remoteStorage.getItem('key')
  //   expect(value).toEqual(null)
  // })

  it('should throw an error if not initialized', async () => {
    const remoteStorage = new RemoteStorage('', '', '')
    try {
      await remoteStorage.setItem('key', 'value')
    } catch (error: any) {
      expect(error.message).toEqual(
        'remoteStorage has not been initialized. Please call remoteStorage.init() first.'
      )
    }
  })
})
