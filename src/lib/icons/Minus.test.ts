import { describe, afterEach, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte'
import Minus from './Minus.svelte'

describe('Minus', () => {
  afterEach(() => cleanup());

  it('mounts', () => {
    const { container } = render(Minus);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
