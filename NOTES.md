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