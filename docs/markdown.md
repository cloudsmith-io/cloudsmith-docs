# Writing Markdown

Most of the content on the website is written in Markdown. We use the `.mdx` file format to extend Markdown's syntax to support custom React components.

## Markdown

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
