# Cloudsmith Docs

The documentation of Cloudsmith; replacement for [Cloudsmith.io/docs](https://help.cloudsmith.io/docs)

## Getting Started

If you are first getting started, please read the following guide:

- [Getting Started](./docs/getting-started.md)

Then refer to the following guides on how to manage the content of the website:

- [Writing markdown](./docs/markdown.md)
- [Using snippets](./docs/snippets.md)
- [Editing menus](./docs/menus.md)

## Getting started

Make sure you’re running Node version `22.11.0` (LTS). Then install the dependencies.

```bash
pnpm i
```

Next run the desired task

```bash
# Starts app and components in dev mode
pnpm dev

# Build the app
pnpm build

# Build the app
pnpm start

# Linting everything
pnpm lint

# Linting JS
pnpm lint:js

# Linting CSS
pnpm lint:css

# Linting CSS and fixing
pnpm lint:css:fix

# Download API schemas. Used in development mode to minimize the amount of requests to the API
pnpm schema
```

> [!NOTE]  
> Only development mode is using Turbopack atm. This will change in the future when Turbopack supports build process. Be aware that Turbopack is the successor of Webpack meaning it's [not 1:1 compatible](https://turbo.build/pack/docs/migrating-from-webpack).

### Tooling

- [PNPM](https://pnpm.io/)
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
