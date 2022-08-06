export const triggerRef = (value = false) => {
  const ref = { current: null };

  Object.defineProperty(ref, 'current', {
    get: jest.fn(() => (value ? document.createElement('div') : null)),
    set: jest.fn(() => null),
  });

  return ref;
};

// ! 현재 사용하지 않는 customRenderer
// import { render, RenderOptions } from '@testing-library/react';
// import { QueryClientProvider } from 'react-query';

// import { queryClient } from '@/shared/utils/queryClient';

// const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
// };

// const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
//   render(ui, { wrapper: Provider, ...options });

// export * from '@testing-library/react';
// export { customRender as render };
