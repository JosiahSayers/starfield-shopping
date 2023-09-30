import { describe, afterEach, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte'
import ResourceType from './ResourceType.svelte'

describe('ResourcePrice', () => {
  afterEach(() => cleanup())

  it('mounts', () => {
    const { container } = render(ResourceType, { type: '' });
    expect(container).toBeTruthy();
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('renders the price', () => {
    const { container } = render(ResourceType, { type: 'test-type' });
    expect(container).toBeTruthy();
    expect(container.querySelector('.badge')?.textContent).toBe('test-type');
  });
});
