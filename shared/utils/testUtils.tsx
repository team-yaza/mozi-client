import { render, RenderOptions } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import { queryClient } from '@/shared/utils/queryClient';
import { darkTheme } from '@/styles/theme';
import { RecoilRoot } from 'recoil';

export const triggerRef = (value = false) => {
  const ref = { current: null };

  Object.defineProperty(ref, 'current', {
    get: jest.fn(() => (value ? document.createElement('div') : null)),
    set: jest.fn(() => null),
  });

  return ref;
};

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <RecoilRoot>{children}</RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Provider, ...options });

export * from '@testing-library/react';
export { customRender as render };
