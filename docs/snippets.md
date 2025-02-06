# Using Snippets

It's possible to write reusable snippets by creating an `.mdx` file in the `/src/snippets` directory and importing the file in the desired `.mdx` files inside of `/src/content`.

First create a file, in this case `src/snippets/test.mdx`:

```mdx
> This is a note I want to include as a snippet
```

Then, import and render it in the desired as such:

```mdx
import NoteSnippet from '@/snippets/test.mdx';

# Heading

Some text

<NoteSnippet />
```

## Using variables

You can pass variables to your snippet in the same way as you pass props to regular React components.

First, update your snippet to read from a props variable:

```mdx
> This is a note I want to include as a {props.text}
```

Then pass the prop to the snippet during render:

```mdx
<NoteSnippet text="snippet" />
```

It's all React components under the hood, so you can do any templating logic that is allowed in standard JSX.
