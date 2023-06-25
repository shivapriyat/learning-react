node -v
basicreactapp> npm init
npm i --save-dev webpack webpack-cli webpack-dev-server
npm i --save-dev babel-loader @babel/preset-env @babel/core @babel/plugin-transform-runtime @babel/preset-react @babel/eslint-parser @babel/runtime @babel/cli
npm i --save-dev eslint eslint-config-airbnb-base 
npm i react react-dom
mkdir public
cd public 
touch index.html
cd ../
Create component file 
mkdir src
cd src
touch App.js
cd ../
Create index.js entrypoint to have reactDom.render method
touch index.js
Create webpack.config.js
touch webpack.config.js
touch .babelrc
npm run build
npm start
