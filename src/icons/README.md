# Icons

This folder contains all the icons used in the project. The icons are in SVG format and are used as React components.

There is different ways of using the icons to support different use cases. Main usecase is to enable us to use SVG sprites to reduce the number of requests to the server. It also makes it possible to handle icons as normal React components if needed.

Sprites can be achieved by using the prop `as="symbol"` and `as="use"` together on the same page. Make sure to use the icons with `as="symbol"` before you use them with `as="use"`.

## Usage

**As normal SVG file**

```js
import { Icon } from '@/icons';

<Icon name="close" title="Close icon" />;
```

Outputs:

```html
<svg width="16" height="16" viewBox="0 0 16 16">
  <title>Close icon</title>
  <path (...) />
</svg>
```

**As symbol**

```js
<Icon name="close" as="symbol" title="Close" />
```

Outputs:

```html
<svg width="16" height="16" viewBox="0 0 16 16">
  <title>Close icon</title>
  <symbol id="close">
    <path (...) />
  </symbol>
</svg>
```

**As use**

```js
<Icon name="close" as="use" title="Close" />
```

Outputs:

```html
<svg width="16" height="16" viewBox="0 0 16 16">
  <use href="#close" />
</svg>
```

## Specific props

It's possible to pass specific props to the SVG element. For example, you can pass a orientation prop to the icon to flip it. Then those props can be used in the icon component to manipulate the SVG element accordingly.

To get the correct types of icons with specific props, import the icon directly from the icon folder.

```tsx
import { ArrowIcon } from '@/icons/close';

<ArrowIcon direction="up" title="Arrow up" />;
```
