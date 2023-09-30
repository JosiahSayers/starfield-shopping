import { describe, afterEach, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte'
import Plus from './Plus.svelte'

describe('Plus', () => {
  afterEach(() => cleanup());

  it('mounts', () => {
    const { container } = render(Plus);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
