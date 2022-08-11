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

let RenderWithReact17Counter = 0;

export const RenderWithReact17: FunctionComponent<
  PropsWithChildren<RenderWithReact17Props>
> = memo(({ children, wrapper: Wrapper }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divElement = divRef.current;

    if (divElement && children) {
      RenderWithReact17Counter++;
      const node = Wrapper ? <Wrapper>{children}</Wrapper> : children;
      if (typeof render === 'function') {
        mockConsole();
        render(<React.StrictMode>{node}</React.StrictMode>, divElement);
        unmockConsole();
      }
    }

    return () => {
      RenderWithReact17Counter--;
      if (typeof unmountComponentAtNode === 'function') {
        unmountComponentAtNode(divElement);
      }
    };
  }, [children]);

  return (
    <div id={`RenderWithReact17-${RenderWithReact17Counter}`} ref={divRef} />
  );
});
