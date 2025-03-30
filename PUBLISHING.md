# Publishing Guide for nedy-wallet-adapter

This guide explains how to publish the Solana wallet adapter packages under your own npm package prefix.

## Prerequisites

1. You need to have an [npm account](https://www.npmjs.com/signup)
2. Make sure you have Node.js 20+ and pnpm 9+ installed

## Steps to Publish

### 1. Setup

Before publishing, make sure you've customized the package information in the script files:

-   Open `update-package-info.js` and update:

    -   `NEW_PACKAGE_PREFIX`: Your npm package prefix (e.g., `nedy-wallet-adapter`)
    -   `NEW_AUTHOR`: Your name and email
    -   `NEW_REPOSITORY`: Your Git repository URL
    -   `NEW_LICENSE`: The license you want to use

-   Open `update-dependencies.js` and update:

    -   `NEW_PREFIX`: Make sure it matches your package prefix in `update-package-info.js`

-   Open `update-imports.js` and update:
    -   `NEW_PREFIX`: Make sure it matches your package prefix in the other files

### 2. Run the publishing script

```bash
./publish.sh
```

This script will:

1. Update all package.json files with your information
2. Update all internal dependencies to use your package prefix
3. Update import statements in source code files
4. Clean and build all packages
5. Login to npm (if needed)
6. Publish all packages to npm in the correct order

### 3. Verify the published packages

After publishing, verify that your packages are available on npm:

```bash
npm view nedy-wallet-adapter-base
```

You should see your package information.

## Troubleshooting

### Common Issues

1. **Publishing errors**: If you encounter errors when publishing, it might be because:

    - You're not logged in to npm
    - The package version already exists
    - The package name is already taken

2. **Dependency issues**: If packages fail to build or depend on each other incorrectly:

    - Make sure you've run the dependency update script
    - Check that all package versions are compatible

3. **Import issues**: If you see errors about missing '@solana/wallet-adapter-\*' packages:

    - Make sure you've run the import statement update script
    - Check if there are any hard-coded import strings in the code that weren't caught

4. **Name conflicts**: If your package name is already taken:
    - Choose a different package prefix

### Need Help?

If you need help with publishing, refer to:

-   [npm documentation](https://docs.npmjs.com/cli/v8/commands/npm-publish)
-   [pnpm documentation](https://pnpm.io/cli/publish)
