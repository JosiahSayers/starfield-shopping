import { describe, afterEach, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte'
import SearchResult from './SearchResult.svelte'
import type { Resource } from '../stores/resources';
import Search from '../Search.svelte';

describe('SearchResult', () => {
  afterEach(() => cleanup());

  const testResource: Resource = {
    id: 1,
    name: 'Resource',
    shortName: 'Re',
    rarity: 'exotic',
    type: 'manufactured',
    mass: 1,
    value: 24,
    valueToMass: 24
  };

  it('mounts', () => {
    const { container } = render(SearchResult, { resource: testResource });
    expect(container).toBeTruthy();
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('renders the name', () => {
    const { container } = render(SearchResult, { resource: testResource });
    expect(container.querySelector('span')?.textContent).toBe('Resource - Re');
  });

  it('renders the name when there is no short name', () => {
    const { container } = render(SearchResult, { resource: { ...testResource, shortName: '' } });
    expect(container.querySelector('span')?.textContent).toBe('Resource ');
  });
});
