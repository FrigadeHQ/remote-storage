import { CentralStorage } from '../src'

describe('global storage', () => {
  // it('should be able to set and get an item', async () => {
  //   const centralStorage = new CentralStorage('http://localhost:3000', 'instanceId', 'userId')
  //   await centralStorage.setItem('key', 'value')
  //   const value = await centralStorage.getItem('key')
  //   expect(value).toEqual('value')
  // })
  //
  // it('should be able to set and remove an item', async () => {
  //   const centralStorage = new CentralStorage('http://localhost:3000', 'instanceId', 'userId')
  //   await centralStorage.setItem('key', 'value')
  //   await centralStorage.removeItem('key')
  //   const value = await centralStorage.getItem('key')
  //   expect(value).toEqual(null)
  // })

  it('should throw an error if not initialized', async () => {
    const centralStorage = new CentralStorage('', '', '')
    try {
      await centralStorage.setItem('key', 'value')
    } catch (error: any) {
      expect(error.message).toEqual(
        'centralStorage has not been initialized. Please call centralStorage.init() first.'
      )
    }
  })
})
