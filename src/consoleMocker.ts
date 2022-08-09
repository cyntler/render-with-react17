const isWindow = typeof window !== 'undefined';

const originalConsole = isWindow ? { ...window.console } : null;

export const mockConsole = () => {
  if (!isWindow) return;

  window.console = {
    ...window.console,
    error: () => {
      return false;
    },
  };
};

export const unmockConsole = () => {
  if (!originalConsole) return;

  window.console = originalConsole;
};
