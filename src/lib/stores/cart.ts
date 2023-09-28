import { persistentStore } from "./persistent";
import resources from '../../data/resources.json';
import { derived } from "svelte/store";

export type Resource = typeof resources[number];
export interface CartItem extends Resource {
  quantity: number;
}

const allKeys: Array<keyof Resource> = ['mass', 'name', 'rarity', 'shortName', 'type', 'value', 'valueToMass'];

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
    },

    validate: () => {
      update((currentItems) => {
        const validatedItems: CartItem[] = [];
        currentItems.forEach(item => {
          if (allKeys.some(key => item[key] == undefined)) {
            const foundItem = resources.find(resource => resource.name === item.name);
            if (foundItem) {
              validatedItems.push({ ...foundItem, quantity: item.quantity || 1 });
            }
          } else {
            validatedItems.push(item);
          }
        });
        return validatedItems;
      })
    }
  };
}

export const cart = createCartStore();
export const cartTotals = derived(cart, (cart) => {
  const price = cart.reduce((acc, cartItem) => acc + (cartItem.value * cartItem.quantity), 0);
  const weight = cart.reduce((acc, cartItem) => acc + (cartItem.mass * cartItem.quantity), 0);
  return { price: Math.floor(price), weight: Number(weight.toFixed(2)) };
});
