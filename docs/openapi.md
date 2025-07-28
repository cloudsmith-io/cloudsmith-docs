# OpenAPI Schemas

The `/api` pages are automatically generated based on two OpenAPI files in `src/content/schemas` holding the `v1` and `v2` API paths.

There are two special features:

- If a path has `"experimental"` as a tag, it will be listed with a big noted saying that this API endpoint is in early access.
- If a path has a `sandboxLink` property with a fully qualified URL, the page will show a API Sandbox link to that URL.
