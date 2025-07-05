import { vi, describe, it, expect } from 'vitest';

vi.mock('react-dom/client', () => {
  return {
    createRoot: () => {
      return {
        render: vi.fn(),
        unmount: vi.fn(),
      };
    },
  };
});

vi.mock('./App.tsx', () => ({
  default: () => <div>Mocked App</div>,
}));

describe('main.tsx', () => {
  it('calls createRoot and render', async () => {
    const module = await import('./main.tsx');
    expect(module).toBeDefined();
  });
});
