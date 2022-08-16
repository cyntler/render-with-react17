import {
  ComponentType,
  FunctionComponent,
  memo,
  PropsWithChildren,
  StrictMode,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { mockConsole, unmockConsole } from './consoleMocker';

export interface RenderWithReact17Props {
  wrapper?: ComponentType<PropsWithChildren>;
  className?: string;
}

let renderWithReact17Counter = 0;

export const RenderWithReact17: FunctionComponent<
  PropsWithChildren<RenderWithReact17Props>
> = memo(({ children, wrapper: Wrapper, className }) => {
  const numOfComponentRendered = useMemo(() => {
    renderWithReact17Counter++;
    return renderWithReact17Counter;
  }, []);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divElement = divRef.current;

    if (divElement && children) {
      if (typeof render === 'function') {
        const node = Wrapper ? <Wrapper>{children}</Wrapper> : children;
        mockConsole();
        render(
          process.env.NODE_ENV !== 'development' ? (
            <StrictMode>{node}</StrictMode>
          ) : (
            <>{node}</>
          ),
          divElement
        );
        unmockConsole();
      }
    }
  }, [children, Wrapper]);

  useEffect(
    () => () => {
      renderWithReact17Counter--;
      if (divRef.current && typeof unmountComponentAtNode === 'function') {
        unmountComponentAtNode(divRef.current);
      }
    },
    []
  );

  const id = `RenderWithReact17-${numOfComponentRendered}`;

  return <div className={className} id={id} data-testid={id} ref={divRef} />;
});
