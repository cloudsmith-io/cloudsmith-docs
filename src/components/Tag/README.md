# Tag component

The Tag component is used to display a tag with variants like `size`, `type` and `variant`. The component expects a `children` prop to be passed.

To make the component easier to consume you can instead of variant pass a `method` or `statusCode` prop. Those props will be used to determine the variant. In these case the children prop will be used as the text if no `children` prop is passed.

**Basic**

```js
<Tag size="small" type="status" />
```

**With `method`**

```js
<Tag method="get" />
```

**With `statusCode`**

```js
<Tag statusCode="200" />
```
