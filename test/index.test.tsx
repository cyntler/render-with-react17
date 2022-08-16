import { cleanup, render, screen } from '@testing-library/react';

import { RenderWithReact17 } from '../src';

it('renders RenderWithReact17 as simple component using', () => {
  render(<RenderWithReact17 />);

  expect(screen.getByTestId('RenderWithReact17-1')).toBeDefined();
});

it('renders children with RenderWithReact17', () => {
  const testText = 'Lorem ipsum';

  render(
    <RenderWithReact17>
      <div>{testText}</div>
    </RenderWithReact17>
  );

  expect(screen.getByTestId('RenderWithReact17-1')).toBeDefined();
  expect(screen.getByText(testText)).toBeDefined();
});

it('renders multiple RenderWithReact17', () => {
  const testText = 'Lorem ipsum';

  render(
    <>
      <RenderWithReact17>
        <div>{testText}</div>
      </RenderWithReact17>
      <RenderWithReact17>
        <div>{testText}</div>
      </RenderWithReact17>
      <RenderWithReact17>
        <div>{testText}</div>
      </RenderWithReact17>
    </>
  );

  expect(screen.getByTestId('RenderWithReact17-1')).toBeDefined();
  expect(screen.getByTestId('RenderWithReact17-2')).toBeDefined();
  expect(screen.getByTestId('RenderWithReact17-3')).toBeDefined();
  expect(screen.getAllByText(testText)).toHaveLength(3);
});

it('renders correct RenderWithReact17 component number after unmount', () => {
  render(
    <>
      <RenderWithReact17 />
      <RenderWithReact17 />
    </>
  );
  expect(screen.getByTestId('RenderWithReact17-1')).toBeDefined();
  expect(screen.getByTestId('RenderWithReact17-2')).toBeDefined();

  cleanup();
  expect(() => screen.getByText('RenderWithReact17-1')).toThrow();
  expect(() => screen.getByText('RenderWithReact17-2')).toThrow();

  render(<RenderWithReact17 />);
  expect(screen.getByTestId('RenderWithReact17-1')).toBeDefined();

  render(<RenderWithReact17 />);
  expect(screen.getByTestId('RenderWithReact17-1')).toBeDefined();
  expect(screen.getByTestId('RenderWithReact17-2')).toBeDefined();
});
