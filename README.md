# Cloudsmith Docs

The documentation of Cloudsmith.

## Contributor Guides

If you are first getting started, please read the following guide:

- [Getting Started](./docs/getting-started.md)

Then refer to the following guides on how to manage the content of the website:

- [Writing markdown](./docs/markdown.md)
- [Using snippets](./docs/snippets.md)
- [Editing menus](./docs/menus.md)
- [OpenAPI Schemas](./docs/schemas.md)

## Local Development

Make sure you are running Node version `22.12.0` (from `.nvmrc`). Then install dependencies.

```bash
npm i
```

Then run the desired task:

```bash
# Starts app and components in dev mode
npm run dev

# Build the app
npm run build

# Start the production server
npm run start

# Linting everything
npm run lint

# Lint JavaScript/TypeScript (ESLint flat config)
npm run lint:js

# Linting CSS
npm run lint:css

# Linting CSS and fixing
npm run lint:css:fix

# Download API schemas. Used in development mode to minimize the amount of requests to the API
npm run schemas:download

# Run test suite
npm run test
```

## Latest Branch Changes

This branch includes a dependency refresh and framework/tooling upgrades. Highlights:

- Next.js upgraded to 16.x and React/React DOM to 19.2.x.
- ESLint moved to flat config (`eslint.config.mjs`) and `npm run lint:js` now runs `eslint .`.
- TypeScript upgraded to 6.x, including compiler config updates for Next.js 16 (`moduleResolution: bundler`, updated includes/types).
- Shiki upgraded to 4.x, with code block styling updates.
- Video playback stack updated with a `react-player` v3 migration in `src/components/Video/Video.tsx`.
- Fixed Wistia URL compatibility in `src/components/Video/Video.tsx` to prevent `Cannot read properties of null (reading '1')` on `/developer-tools/terraform-provider`.
- API Sandbox input flow updated in `RequestBody.tsx` and `ParamInput.tsx`.
- Global/layout CSS updates in navigation, sidenav, homepage hero, background grid, and related components.
- Stylelint upgraded to 17.x with rule adjustments to preserve existing style patterns.

### Tooling

- [Turbopack](https://turbo.build/pack/docs)

### Framework

- [React 19](https://react.dev/)

### App

- [Next.js 16](https://nextjs.org/docs) using App Router

### General tooling

- [Typescript](https://typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [Prettier](https://prettier.io/)

## License

The Cloudsmith product documentation in the `src/content` folder and subfolders are licensed under a [CC-BY license](./LICENSE).

All other code in this repository is licensed under the [MIT license](./LICENSE-CODE).
