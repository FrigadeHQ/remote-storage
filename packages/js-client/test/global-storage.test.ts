import { GlobalStorage } from '../src'

describe('global storage', () => {
  // it('should be able to set and get an item', async () => {
  //   const globalStorage = new GlobalStorage('http://localhost:3000', 'instanceId', 'userId')
  //   await globalStorage.setItem('key', 'value')
  //   const value = await globalStorage.getItem('key')
  //   expect(value).toEqual('value')
  // })
  //
  // it('should be able to set and remove an item', async () => {
  //   const globalStorage = new GlobalStorage('http://localhost:3000', 'instanceId', 'userId')
  //   await globalStorage.setItem('key', 'value')
  //   await globalStorage.removeItem('key')
  //   const value = await globalStorage.getItem('key')
  //   expect(value).toEqual(null)
  // })

  it('should throw an error if not initialized', async () => {
    const globalStorage = new GlobalStorage('', '', '')
    try {
      await globalStorage.setItem('key', 'value')
    } catch (error: any) {
      expect(error.message).toEqual(
        'globalStorage has not been initialized. Please call globalStorage.init() first.'
      )
    }
  })
})
