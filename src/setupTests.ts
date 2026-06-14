import "@testing-library/jest-dom";
import {vi} from "vitest";

// matchMedia — used by Main for dark-mode preference
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

// IntersectionObserver — required by react-awesome-reveal; jsdom has none.
// Stores the callback so future tests can simulate visibility changes.
class IntersectionObserverMock {
  callback: IntersectionObserverCallback;
  root = null;
  rootMargin = "";
  thresholds: ReadonlyArray<number> = [];
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn((): IntersectionObserverEntry[] => []);
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// ResizeObserver — defensive polyfill for libs that use it
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal("ResizeObserver", ResizeObserverMock);
