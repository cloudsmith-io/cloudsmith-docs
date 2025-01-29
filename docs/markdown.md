# Writing Markdown

Most of the content on the website is written in Markdown. We use the `.mdx` file format to extend Markdown's syntax to support custom React components.

## Basic Markdown

The following is a list of components that are supported through pure Markdown.

### Heading

```md
# Page title

Some text here

## Heading 1

Some text here

### Heading 2
```

### Line separator

```md
Some text

---

Some text
```

### List

```md
- Item 1
- Item 2
- Item 3

1. Item 1
2. Item 2
3. Item 3

- Item 1
  1. Sub item 1
  2. Sub item 2
  3. Sub item 3
- Item 2
```

### Link

```mdx
This is [a link](/api/something) for you to click.
```

### Note

You can render a simple note using the `>` character in front of your note. This will render a `Note` custom component (see below) with in a `note` variant and without a background.

```mdx
> This is a note
```

### Code example

````mdx
```yaml
cliVersion: '1.3.1' # Example CLI version
authMethod: 'apiKey'
apiKey: '$(CLOUDSMITH_API_KEY)'
```
````

## Custom Components

### Images

We use a custom component for images in order to provide options for different layout mechanisms. Images can be saved anywhere in the repository and should be imported into the `.mdx` file and passed to the `BlockImage` component.

```js
import { BlockImage } from '@/components';
import testImage from './images/test.png';

<BlockImage src={testImage} alt="Image alt text">
  This is a caption that I'd like to show for the image
</BlockImage>;
```

For vertical images, the `BlockImage` component can be floated left or right:

```js
// Align image left with caption on the right
<BlockImage src={testImage} alt="Image alt text" align="left">
  This is a caption that I'd like to show for the image
</BlockImage>;

// Align image right with caption on the left
<BlockImage src={testImage} alt="Image alt text" align="right">
  This is a caption that I'd like to show for the image
</BlockImage>;
```

### Note

You can render notes in different styles depending on the needs. The variants map to the GitHub-style admonitions which are `note`, `tip`, `important`, `warning` and `caution`. These variants can be rendered with or without a heading.

A note without any props render a simple `note` block:

```js
import { Note } from '@/components';

<Note>This is something I want to say</Note>;
```

You can change the variant and heading by using the `variant` and `heading` component props:

```js
<Note variant="caution" heading="Be careful!">
  This is something I want to say
</Note>
```

### Cards

You can render a row of cards using the `Flex` and `Card` components. You can have as many cards as you want in a flex container, and the `width` property on each card determines how many cards are shown in a row before they go on a new line.

**Note: We still haven't created proper spacings for these components. Go ahead and use the following code below, and then we'll tweak the syntax and spacings so the cards are easy to use**

Show three cards in a row:

```js
import { Card, Flex } from '@/components';

<Flex gap="l" align="stretch">
  <Card
    title="First card"
    description="This is the card description"
    href="/"
    linkText="Read more"
    icon="utility/documentation"
  />
  <Card
    title="Second card"
    description="This is the card description"
    href="/"
    linkText="Read more"
    icon="utility/guide"
  />
  <Card
    title="Third card"
    description="This is the card description"
    href="/"
    linkText="Read more"
    icon="utility/guide"
  />
</Flex>;
```

Show four cards, two in each row:

```js
import { Card, Flex } from '@/components';

<Flex gap="l" align="stretch">
  <Card
    title="First card"
    description="This is the card description"
    href="/"
    linkText="Read more"
    icon="utility/documentation"
    width="half"
  />
  <Card
    title="Second card"
    description="This is the card description"
    href="/"
    linkText="Read more"
    icon="utility/guide"
    width="half"
  />
  <Card
    title="Third card"
    description="This is the card description"
    href="/"
    linkText="Read more"
    icon="utility/guide"
    width="half"
  />
  <Card
    title=" card"
    description="This is the card description"
    href="/"
    linkText="Read more"
    icon="utility/guide"
    width="half"
  />
</Flex>;
```
