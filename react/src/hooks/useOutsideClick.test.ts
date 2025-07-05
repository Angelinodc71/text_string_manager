import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useOutsideClick from './useOutsideClick';

describe('useOutsideClick hook', () => {
  let elementRef: React.RefObject<HTMLDivElement>;
  let outsideElement: HTMLDivElement;
  let handler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handler = vi.fn();

    const div = document.createElement('div');
    document.body.appendChild(div);
    elementRef = { current: div };

    outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
  });

  it('should call handler when clicking outside the referenced element', () => {
    renderHook(() => useOutsideClick(elementRef, handler));

    const event = new MouseEvent('mousedown', { bubbles: true });
    outsideElement.dispatchEvent(event);

    expect(handler).toHaveBeenCalledOnce();
  });

  it('should NOT call handler when clicking inside the referenced element', () => {
    renderHook(() => useOutsideClick(elementRef, handler));

    const event = new MouseEvent('mousedown', { bubbles: true });
    elementRef.current!.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
  });
});
