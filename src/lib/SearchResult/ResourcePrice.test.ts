import { describe, afterEach, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte'
import ResourcePrice from './ResourcePrice.svelte'

describe('ResourcePrice', () => {
  afterEach(() => cleanup())

  it('mounts', () => {
    const { container } = render(ResourcePrice, { price: 0 });
    expect(container).toBeTruthy();
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('renders the price', () => {
    const { container } = render(ResourcePrice, { price: 42 });
    expect(container).toBeTruthy();
    expect(container.querySelector('.badge')?.textContent).toBe('42');
  });
});
