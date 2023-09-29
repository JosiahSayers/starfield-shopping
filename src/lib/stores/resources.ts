import { derived } from 'svelte/store';
import resourceList from '../../data/resources.json';
import { cart } from './cart';

export type Resource = typeof resourceList[number];

export const resources = derived(cart, (newCart) => {
  const resourcesWithoutCartItems = resourceList.filter(
    resource => !newCart.some(item => item.name === resource.name)
  );
  return resourcesWithoutCartItems;
});
