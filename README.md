[![npm-version](https://img.shields.io/npm/v/render-with-react17.svg)](https://www.npmjs.com/package/render-with-react17)
[![npm-download](https://img.shields.io/npm/dt/render-with-react17.svg)](https://www.npmjs.com/package/render-with-react17)

# render-with-react17

A simple util component to render components incompatible with React 18.x.

> This library was created to facilitate the migration of applications to React 18, in case not all components that you use in your application (mainly external) already work with the new version of React.

## Installation

To install the hook you can use npm:

```shell
npm i render-with-react17
```

or Yarn if you prefer:

```shell
yarn add render-with-react17
```

## Usage

The first step is to import the component:

```jsx
import { RenderWithReact17 } from 'render-with-react17';
```

Then move the rendering of the component that does not work inside the node `RenderWithReact17`.

```jsx
const Component = () => (
  <RenderWithReact17>
    <NotWorkingComponent />
  </RenderWithReact17>
);
```

The important thing is to render in this way only the **final component**, which has no type dependency such as global state management - context, store, etc.

This means that passing state via the `RenderWithReact17` component does not work at the moment. If a component inside `RenderWithReact17` uses e.g. `useContext` - this will not work. Therefore it is important to use this library to render components which all data receives with `props`.
