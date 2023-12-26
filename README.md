# Webpack-starter

A webpack preConfigured start kit
There is two scripts for dev and build

if dev server have problems with hot reload
set "hot" flag to false in webpack.config.dev.js

**change title of your page in webpack.common.js html-webpack-plugin title property.**

## Codes for initializing
Create package json files
```
npm init -y
```
Webpack dependencies
```
npm install webpack webpack-cli --save-dev
npm install webpack-merge --save-dev
npm install webpack-dev-server --save-dev
npm install html-webpack-plugin --save-dev
```
Babel with babel loader
```
npm install babel-loader @babel/core @babel/preset-env --save-dev
```
CSS loaders
```
npm install style-loader css-loader --save-dev
npm install mini-css-extract-plugin --save-dev
```
SASS (Optional)
```
npm install sass-loader sass --save-dev
```
***you should change corresponding options in webpack config files if you prefer one css preprocessor over another or want pure css***

ESlint and Eslint Config
```
npm install eslint eslint-config-prettier prettier --save-dev --save-exact
npx eslint --init
```
Add "prettier" to extends section in eslintrc.json after Eslint config
```
"extends": ["some eslint config", "prettier"]
```

Tailwind and PostCSS (PostCss is required for tailwind) and Tailwind Config
```
npm install tailwindcss --save-dev
npx tailwindcss init
npm install postcss postcss-loader postcss-preset-env --save-dev
```
**if not using tailwind delete src/style.css and both tailwind and postcss configs.**

***you should change corresponding options in webpack config files if you prefer one css preprocessor over another or want pure css***

Jest (Optional)
```
npm install jest --save-dev
npm install --save-dev babel-jest
```
***If not using jest delete .babelrc and jest.config.js and mocks folder***

Jest Config (Just for demonstration)
```
npm init jest@latest
```

Production dependencies packages
```
npm install material-symbols@latest
```

## package.json scripts
```
"test": "jest",
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"start": "webpack serve --config webpack/webpack.config.dev.js",
"build": "webpack --config webpack/webpack.config.prod.js",
"push-dist": "git subtree push --prefix dist origin gh-pages"
```

***ToDo: will add more features like react and typescript support***