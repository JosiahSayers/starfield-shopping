import { describe, afterEach, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/svelte'
import ResourceRarity from './ResourceRarity.svelte'

describe('ResourceRarity', () => {
  afterEach(() => cleanup())

  it('mounts', () => {
    const { container } = render(ResourceRarity, { rarity: '' });
    expect(container).toBeTruthy();
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('renders the rarity', () => {
    const { container } = render(ResourceRarity, { rarity: 'test-rarity' });
    expect(container.querySelector('.badge')?.textContent).toBe('test-rarity');
  });

  describe('classes for each rarity', () => {
    it('sets the correct class for "rare"', () => {
      const { container } = render(ResourceRarity, { rarity: 'rare' });
      const classList = container.querySelector('.badge')?.classList ?? [];
      expect(Array.from(classList)).toContain('rare');
    });

    it('sets the correct class for "unique"', () => {
      const { container } = render(ResourceRarity, { rarity: 'unique' });
      const classList = container.querySelector('.badge')?.classList ?? [];
      expect(Array.from(classList)).toContain('unique');
    });

    it('sets the correct class for "uncommon"', () => {
      const { container } = render(ResourceRarity, { rarity: 'uncommon' });
      const classList = container.querySelector('.badge')?.classList ?? [];
      expect(Array.from(classList)).toContain('uncommon');
    });

    it('sets the correct class for "exotic"', () => {
      const { container } = render(ResourceRarity, { rarity: 'exotic' });
      const classList = container.querySelector('.badge')?.classList ?? [];
      expect(Array.from(classList)).toContain('exotic');
    });

    it('sets a default class', () => {
      const { container } = render(ResourceRarity, { rarity: 'common' });
      const classList = container.querySelector('.badge')?.classList ?? [];
      expect(Array.from(classList)).not.toContain('common');
      expect(Array.from(classList)).toContain('badge-neutral');
    });
  });
});
