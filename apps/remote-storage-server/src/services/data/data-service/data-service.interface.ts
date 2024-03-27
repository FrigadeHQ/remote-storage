/**
 * Common interface used for all data stores.
 */
export interface DataService {
  /**
   * Get a value
   * @param key
   */
  get<T>(key: string): Promise<T>

  /**
   * Set a value by key
   * @param key
   * @param value
   */
  set(key: string, value: any, timestamp: number): Promise<void>

  /**
   * Delete a value by key
   * @param key
   */
  delete(key: string): Promise<void>
}
