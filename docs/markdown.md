# Writing Markdown

Most of the content on the website is written in Markdown. We use the `.mdx` file format to extend Markdown's syntax to support custom React components.

## Meta data

The meta data is used to generate the metadata for the page. It is located at the top of the file and is used to generate the metadata for the page.

```mdx
---
title: Title of the page
description: Description of the page
lastUpdated: 2025-01-01
---
```

The following is a list of components that are supported through pure Markdown.

## Headings

```md
# Page title

Some text here

## Heading 1

Some text here

### Heading 2
```

## Line separators

```md
Some text

---

Some text
```

## Lists

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

## Links

```mdx
This is [a link](/api/something) for you to click.
```

In the Guides section, you can use a special `GuideLink` component to show a solid block link to an internal article:

```mdx
import { GuideLink } from '@/components';

<GuideLink href="/getting-started/api-bindings">Click me</GuideLink>
```

## Dividers

Dividers are gray lines that can be used to divide sections of content from each other

```mdx
Content before divider

---

Content after divider
```

## Notes

You can render a simple note using the `>` character in front of your note.

```mdx
> This is a note
```

You can render notes in different styles by using the custom `Note` component. The variants map to the GitHub-style admonitions which are `note`, `tip`, `important`, `warning` and `caution`.

A note without any props renders a simple `note` block:

```js
import { Note } from '@/components';

<Note>This is something I want to say</Note>;
```

You can change the variant and default heading by using the `variant` and `headline` component props:

```js
<Note variant="caution" headline="Be careful!">
  This is something I want to say
</Note>
```

## Code examples

You can render a simple code example without syntax highlighting or header by using backticks:

````mdx
```
this is some code
```
````

If you specify a programming language, the code example is syntax highlighted and a header with the programming language will be shown:

````mdx
```yaml
cliVersion: '1.3.1' # Example CLI version
authMethod: 'apiKey'
apiKey: '$(CLOUDSMITH_API_KEY)'
```
````

For complete control over the code example, use the `CodeBlock` component. Keep in mind that you need to wrap your code in `{''}` in order to preserve the line breaks, as JSX will remove it by default. This is an example of a code example that is syntax highlighted but without a header:

```mdx
<CodeBlock lang="yaml" header={false}>
  {`cliVersion: '1.3.1' # Example CLI version
authMethod: 'apiKey'
apiKey: '$(CLOUDSMITH_API_KEY)'`}
</CodeBlock>
```

## Images

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

## Tabs

The `Tabs` component comes with a bunch of helpers that make it possible to create tabbed content. It can take any custom component, but is often used for code examples:

```mdx
<Tabs defaultValue="example1">
  <TabsList>
    <TabsTrigger value="example1">Example 1</TabsTrigger>
    <TabsTrigger value="example2">Example 2</TabsTrigger>
    <TabsTrigger value="example3">Example 3</TabsTrigger>
  </TabsList>
  <TabsContent value="example1">
    <CodeBlock lang="js" header={false}>
      {`console.log("Example 1")`}
    </CodeBlock>
  </TabsContent>
  <TabsContent value="example2">
    <CodeBlock lang="js" header={false}>
      {`console.log("Example 2")`}
    </CodeBlock>
  </TabsContent>
  <TabsContent value="example3">
    <CodeBlock lang="js" header={false}>
      {`console.log("Example 3")`}
    </CodeBlock>
  </TabsContent>
</Tabs>
```

You can use the same syntax for other components by replacing the `CodeBlock` components with your custom component.

## Cards

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

````

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
````
