import { writable } from "svelte/store";
import { persistentStore } from "./persistent";

export interface CartItem {
  name: string;
  quantity: number;
}

const createCartStore = () => {
  const { subscribe, set, update } = persistentStore<CartItem[]>({ key: 'cart', type: 'object' }, []);
  return {
    subscribe,

    clear: () => set([]),

    add: (newItem: CartItem) => {
      update((currentItems) => {
        const inCartItemIndex = currentItems.findIndex(item => item.name === newItem.name);
        if (inCartItemIndex >= 0) {
          currentItems[inCartItemIndex].quantity += newItem.quantity;
          return [...currentItems];
        }

        return [...currentItems, newItem];
      });
    },

    increment: (name: string) => {
      update((currentItems) => {
        const inCartItemIndex = currentItems.findIndex(item => item.name === name);
        if (inCartItemIndex >= 0) {
          currentItems[inCartItemIndex].quantity++;
        }
        return [...currentItems];
      });
    },

    decrement: (name: string) => {
      update((currentItems) => {
        const inCartItemIndex = currentItems.findIndex(item => item.name === name);
        if (inCartItemIndex >= 0) {
          currentItems[inCartItemIndex].quantity--;

          if (currentItems[inCartItemIndex].quantity < 1) {
            currentItems.splice(inCartItemIndex, 1);
            return [...currentItems];
          }
        }
        return [...currentItems];
      });
    }
  };
}

export const cart = createCartStore();
