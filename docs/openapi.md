# OpenAPI Schemas

The `/api` pages are automatically generated based on two OpenAPI files in `src/content/schemas` holding the `v1` and `v2` API paths.

There are two special features:

- If a path has `"experimental"` as a tag, it will be listed with a big noted saying that this API endpoint is in early access.
- If a path has a `sandboxLink` property with a fully qualified URL, the page will show a API Sandbox link to that URL.

## Updating the schemas

In order to update the schema files in this repo, do the following:

### 1. Download schemas

First, download the two schema files from here:

- [V1 Swagger definition file](https://api.cloudsmith.io/v1/swagger/?format=openapi)
- [V2 OpenAPI definition file](https://api.cloudsmith.io/v2/openapi/?format=json)

### 2. Convert Swagger to OpenAPI

Then, convert the V1 swagger definition to OpenApi definition with the [`swagger2openapi](https://github.com/APIs-guru/swagger2openapi) CLI tool:

```
swagger2openapi -o api-schema-v1.json swagger.json
```

### 3. Add `versionAlias`

In each file, add a `info.versionAlias` key with `"v1"` or `"v2"` right below the `info.version` property. See the existing files in the repo if needed.
