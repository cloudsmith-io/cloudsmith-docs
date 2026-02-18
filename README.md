# Cloudsmith Docs

The documentation of Cloudsmith.

## Getting Started

If you are first getting started, please read the following guide:

- [Getting Started](./docs/getting-started.md)

Then refer to the following guides on how to manage the content of the website:

- [Writing markdown](./docs/markdown.md)
- [Using snippets](./docs/snippets.md)
- [Editing menus](./docs/menus.md)
- [OopenAPI Schemas](./docs/schemas.md)

## Getting started

Make sure you’re running Node version `22.11.0` (LTS). Then install the dependencies.

```bash
npm i
```
Next run the desired task

```bash
# Starts app and components in dev mode
npm run dev

# Build the app
npm run build

# Build the app
npm run start

# Linting everything
npm run lint

# Linting JS
npm run lint:js

# Linting CSS
npm run lint:css

# Linting CSS and fixing
npm run lint:css:fix

# Download API schemas. Used in development mode to minimize the amount of requests to the API
npm run schemas:download
```

> [!NOTE]  
> Only development mode is using Turbopack atm. This will change in the future when Turbopack supports build process. Be aware that Turbopack is the successor of Webpack meaning it's [not 1:1 compatible](https://turbo.build/pack/docs/migrating-from-webpack).

### Tooling

- [Turbopack](https://turbo.build/pack/docs)

### Framework

- [React 19](https://react.dev/)

### App

- [Next.js 15](https://nextjs.org/docs) using App Router

### General tooling

- [Typescript](https://typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [Prettier](https://prettier.io/)

## License

The Cloudsmith product documentation in the `src/content` folder and subfolders are licensed under a [CC-BY license](./LICENSE).

All other code in this repository is licensed under the [MIT license](./LICENSE-CODE).
