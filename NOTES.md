### INSTALL TAILWINDCSS
```bash
## install
$ npm install -D tailwindcss postcss autoprefixer

## init tailwindcss in the project
$ npx tailwindcss init -p
```
Install vscode extensions:
- Tailwind CSS IntelliSense
- PostCSS Language Support


Modify the **tailwind.config.cjs** file as in the example below:

**tailwind.config.cjs**
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      }
    },
  },
  plugins: [],
}
```


Create **styles** folder and **global.css** file with the content bellow:
**global.css**
```css
@tailwind base;
@tailwind utilities;
@tailwind components;
```

In your **App.tsx** file or main index of your application import the global.css, example:

**App.tsx**
```jsx
import './styles/global.css';

export function App() {
  return (
    <h1 className="font-bold text-5xl text-violet-500">
      Hello World!
    </h1>
  )
}
```

### INSTALL STORYBOOK
```bash
## install 
$ npx sb init --builder @storybook/builder-vite --use-npm

## run storybook
$ npm run storybook
```

change theme to dark, you need to create a file called **manager.js** inside the **.storybook** directory at the root of your project:
**maganer.js**
```js
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.dark,
})
```

change **preview.cjs** file inside the .storybook directory too:
**preview.cjs**
```js
import { themes } from '@storybook/theming';

import '../src/styles/global.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
}
```

**NOTE**: restart storybook

### DEPLOY IN THE GITHUB PAGES
This deploy was done on github pages using the "**storybook-deployer**" tool

See more in https://github.com/storybookjs/storybook-deployer

```bash
# create a repository in your github

# install storybook-deployer
$ npm i @storybook/storybook-deployer --save-dev
```

in the **package.json** file, create the script like the example below:
```json
"scripts": {
  "build-storybook": "build-storybook",
  "deploy-storybook": "storybook-to-ghpages"
  ...
}
```

At the end of the file **./storybook/main.cjs** put this code:
```js
viteFinal: (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      config.base = '{{YOUR_REPO_NAME}}'
    }

    return config
  }
```

the **./storybook/main.cjs** file should look like the example below:
```js
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  viteFinal: (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      config.base = '/design-system-lab-reactjs/'
    }

    return config
  }
}
```

###### Create workflow
in the root directory create "**.github/workflows/deploy-docs.yml**", create this file like the example below:
```yml
name: Deploy Storybook

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook

      - name: Deploy Storybook
        run: npm run deploy-storybook -- --ci --existing-output-dir=storybook-static
        env:
          GH_TOKEN: ${{ github.actor }}:${{ secrets.GITHUB_TOKEN }}
```