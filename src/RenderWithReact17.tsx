import React, {
  ComponentType,
  FunctionComponent,
  memo,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { mockConsole, unmockConsole } from './consoleMocker';

export interface RenderWithReact17Props {
  wrapper?: ComponentType<PropsWithChildren>;
}

let renderWithReact17Counter = 0;

export const RenderWithReact17: FunctionComponent<
  PropsWithChildren<RenderWithReact17Props>
> = memo(({ children, wrapper: Wrapper }) => {
  const numOfComponentRendered = useRef(
    renderWithReact17Counter === 1
      ? renderWithReact17Counter++
      : renderWithReact17Counter++ - 1
  );
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divElement = divRef.current;

    if (divElement && children) {
      const node = Wrapper ? <Wrapper>{children}</Wrapper> : children;
      if (typeof render === 'function') {
        mockConsole();
        render(<React.StrictMode>{node}</React.StrictMode>, divElement);
        unmockConsole();
      }
    }
  }, [children]);

  useEffect(
    () => () => {
      if (divRef.current && typeof unmountComponentAtNode === 'function') {
        unmountComponentAtNode(divRef.current);
      }
    },
    []
  );

  return (
    <div
      id={`RenderWithReact17-${numOfComponentRendered.current}`}
      ref={divRef}
    />
  );
});
