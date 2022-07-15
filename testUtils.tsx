import { render, RenderOptions } from '@testing-library/react';

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Provider, ...options });

export * from '@testing-library/react';
export { customRender as render };
