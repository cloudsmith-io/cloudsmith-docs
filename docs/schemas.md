# OpenAPI Schemas

The `/api` pages are automatically generated based on two OpenAPI files in `src/content/schemas` holding the `v1` and `v2` API paths.

To update these schemas, you need to manually run the `npm run schemas:download` script. This will pull down the schemas and do the needed conversions.

## Special features

There are two special features:

- If a path has `"experimental"` as a tag, it will be listed with a big noted saying that this API endpoint is in early access.
- If a path has a `sandboxLink` property with a fully qualified URL, the page will show a API Sandbox link to that URL.
- Each schema needs to have a `info.versionAlias` key with `"v1"` or `"v2"` right below the `info.version` property. See the existing files in the repo if needed.
