# Editing Menus

The menus throughout the site are generated using two combined methods:

1. Rendering the data in the [`menu.json`](../src/content/menu.json) file
2. Auto-generating from the [`api-schema-v2-1.598.1.json`](../src/content/schemas/api-schema-v2-1.598.1.json) file

## Editing `menu.json`

The sidebar menu shown on the three sections of the website is defined in the [`menu.json`](../src/content/menu.json) file. We opted for a manual, file-based process over auto-generating the menu because there are too many edge cases that make it complicated to generate the menu automatically (sorting, renaming menu items, hiding, moving, etc).

A base menu item looks like this:

```json
{
  "title": "Article",
  "path": "/article"
}
```

Each item can have a sub-list of items which is defined through the `children` property:

```json
{
  "title": "Parent 1",
  "path": "/parent-one",
  "children": [
    {
      "title": "Child 1",
      "path": "/child-one"
    }
  ]
}
```

You can create sections by leaving out the `path` property:

```json
{
  "title": "Section",
  "children": [
    {
      "title": "Article in section",
      "path": "/article-in-section"
    }
  ]
}
```

## Updating the API reference menu

Besides the items that are generated from the [`menu.json`](../src/content/menu.json) file, all menu items are auto-generated via the [`api-schema-v2-1.598.1.json`](../src/content/schemas/api-schema-v2-1.598.1.json) file. Replace this file to update the menu.
