# Getting Started

The Cloudsmith documentation website is a static website created with Next.js using two different types of content:

- Text content written in Markdown (`.mdx`) inside of the [`src/content`](./src/content) folder.
- The API reference is generated from a OpenApi definition file stored in the [`src/content/schemas`](./src/content/schemas) folder

The path of the `.mdx` file will determine the slug in the URL, e.g. `src/content/my-folder/my-file.mdx` will be available as `docs.cloudsmith.com/my-folder/my-file`.

## Local development

In order to make changes to the website, you will need to run the website locally on your computer and use Git to push your changes to a branch.

Follow these steps to get a local development setup going:

1. Make sure you are running the Node.js version that is specified in the [`.nvmrc`](./nvmrc) file. When this text was written, the version is `22.12.0`.
2. Clone down the repo into your computer using the following command: `git clone git@github.com:cloudsmith-io/cloudsmith-docs.git`.
3. Run `cd cloudsmith-docs` to move into the project folder
4. Run `npm i` to install the dependencies
5. Run `npm run dev` to run the website locally. Go to http:localhost:3000 to see the website.

Whenever you make changes to a file, the website will automatically reload the changes.

## Publishing changes

In order to publish your changes, you will need to submit a Pull Request on GitHub. This flow normally goes like this:

1. Create a new git branch with `git checkout -b my-branch-name`
2. Make edits to the files
3. Commit your files to the git branch. Make sure that your [commits are signed](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) since it's a requirement for all repositories in the Cloudsmith GitHub organization.
4. Push your changes to GitHub with `git push origin my-branch-name`
5. Go to github.com to submit a Pull Request

When you submit a Pull Request, a deploy preview will be generated and inserted as a comment in the Pull Request. This is a great way to preview any changes to the documentation in a shareable link before merging the Pull Request.
