import { persistentStore } from "./persistent";
import { derived } from "svelte/store";
import resourceList from '../../data/resources.json';
import type { Resource } from "./resources";

export interface CartItem extends Resource {
  quantity: number;
}

const allKeys: Array<keyof Resource> = ['mass', 'name', 'rarity', 'shortName', 'type', 'value', 'valueToMass', 'id'];

const sortComparator = (a: CartItem, b: CartItem) => a.name > b.name ? 1 : -1;

const createCartStore = () => {
  const { subscribe, set, update } = persistentStore<CartItem[]>({ key: 'cart', type: 'object' }, []);
  const validate = () => {
    update((currentItems) => {
      const validatedItems: CartItem[] = [];
      currentItems.forEach(item => {
        if (allKeys.some(key => item[key] == undefined)) {
          const foundItem = resourceList.find(resource => resource.id === item.id);
          if (foundItem) {
            validatedItems.push({ ...foundItem, quantity: item.quantity || 1 });
          }
        } else {
          validatedItems.push(item);
        }
      });
      return validatedItems.sort(sortComparator);
    });
  }

  validate();

  return {
    subscribe,
    validate,

    clear: () => set([]),

    add: (newItem: CartItem) => {
      update((currentItems) => ([...currentItems, newItem].sort(sortComparator)));
    },

    increment: (id: number) => {
      update((currentItems) => {
        const inCartItemIndex = currentItems.findIndex(item => item.id === id);
        if (inCartItemIndex >= 0) {
          currentItems[inCartItemIndex].quantity++;
        }
        return [...currentItems].sort(sortComparator);
      });
    },

    decrement: (id: number) => {
      update((currentItems) => {
        const inCartItemIndex = currentItems.findIndex(item => item.id === id);
        if (inCartItemIndex >= 0) {
          currentItems[inCartItemIndex].quantity--;

          if (currentItems[inCartItemIndex].quantity < 1) {
            currentItems.splice(inCartItemIndex, 1);
          }
        }
        return [...currentItems].sort(sortComparator);
      });
    }
  };
}

export const cart = createCartStore();
export const cartTotals = derived(cart, (cart) => {
  const price = cart.reduce((acc, cartItem) => acc + (cartItem.value * cartItem.quantity), 0);
  const weight = cart.reduce((acc, cartItem) => acc + (cartItem.mass * cartItem.quantity), 0);
  return { price: Math.floor(price), weight: Number(weight.toFixed(2)) };
});
