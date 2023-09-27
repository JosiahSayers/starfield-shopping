import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const persistentStore = <StoreDataType>(
  { key, type }: PersistentStoreConfig,
  initialValue?: StoreDataType,
): Writable<StoreDataType> => {
  const valueFromStorage = localStorage.getItem(key);
  let parsedValue: StoreDataType;
  if (valueFromStorage) {
    switch (type) {
      case 'number':
        parsedValue = <any>Number(valueFromStorage);
        break;
      case 'object':
      case 'boolean':
        parsedValue = JSON.parse(valueFromStorage);
        break;
      default:
        parsedValue = <any>valueFromStorage;
        break;
    }
  }
  const store = writable<StoreDataType>(initialValue);
  store.subscribe((data) => {
    const asCompatibleType =
      type === 'object' ? JSON.stringify(data) : <any>data;
    localStorage.setItem(key, asCompatibleType);
  });
  // @ts-ignore
  store.set(parsedValue ?? initialValue ?? null);
  return store;
};

export interface PersistentStoreConfig {
  key: string;
  type: 'string' | 'number' | 'object' | 'boolean';
}
