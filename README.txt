//https://medium.freecodecamp.org/how-to-combine-webpack-4-and-babel-7-to-create-a-fantastic-react-app-845797e036ff
{
  "packages_info": {
    "babel-loader": "helps webpack to transpile js code",
    "@babel/core": "This is core compiler of babel which lets you use babel loader",
    "@babel/preset-env": "This transpiles your code on the basis of your env target pollyfil in .babelrc presets env",
    "@babel/preset-react": "This is the preset i.e. list of plugins needed to transpile react code",
    "@babel/plugin-proposal-class-properties": "This plugin will be used to create functions for class properties if class is not supported by any browser",
    "clean-webpack-plugin": "This will clean the files of the build folder for us in each webpack build",
    "css-loader": "This will take the imports and urls and resolve those",
    "mini-css-extract-plugin": "This will extract css file used in components or js files and serve those as separate css files attached to those epcific component/js files use this in production rather than style-loader",
    "html-webpack-plugin": "This will generate or replace a given html file with generated bundle after webpack build",
    "style-loader": "This loads the style in head section use in development",
    "sass-loader":"converts sass to css",
    "node-sass" : "required dependency for sass-loader package",
    "webpack": "used to build/package the app",
    "webpack-cli": "help in running webpack commands in package.json script section",
    "webpack-dev-server": "used for local development environment",
    "@babel/plugin-syntax-dynamic-import": "in webpack we have default code spliting feature but when we use babel we need this for webpack"
  }
}


npx webpack-dev-server --config config/webpack.base.config.js  --open --hot --history-api-fallback

the --history-api-fallback informs to load index.html if getting 404.


In webpack a "module": can have multile rules that will run on specified type of files which pass the test regex.

The use of bable-loader in the rule as loader checks for .bablerc file and uses all the presets and plugins for the js
files that passes the rules.



--> use: ['style-loader', 'css-loader', 'sass-loader']
use takes object to apply single rule and take array to apply set of rules

this gets called in the order right to left like:
style-loader(css-loader(sass-loader('file')))

--> sass-loader: converts sass to css
--> css-loader : finds import and url and resolves those

{
  loader: 'css-loader',
  options: {
    modules: true, <-- convert the css to modules in CommonJS
    importLoaders: 1, <-- number of loader will run before this
    localIdentName: '[name]_[local]_[hash:base64]', <-- naming format to follow myScss_home_3tLcRBLyIztCS3uE84FbWe while importing
  }
},


--> style-loader : Adds CSS to the DOM by injecting a <style> tag


yarn start


webpack-dev-server serves a webpack app and updates the browser on changes.
--mode development tells webpack to compile the code in development mode. This is basically to make the compilation time faster.
--config config/webpack.base.config.js So by default if you have webpack.config.js file in your
         root app folder, you don’t have to supply the --config flag to it. But since I want to
         explicitly add all my webpack related configurations in the config folder, I pass in
         --config option that tells webpack where to look for the configuration
--open command opens the browser, when webpack is done with its compilation.
--hot flag tells webpack to actively watch for code changes in the src folder.
      If any changes happen, it reloads the browser.
--history-api-fallback This option enables History API Fallback support in webpack-dev-server,
                       effectively asking the server to fallback to index.html in the event that a
                       requested resource cannot be found.
--env.PLATFORM & --env.VERSION :
The new flags added in our start command — env.PLATFORM=local — env.VERSION=stag are passed to our
webpack configurations, which we can access with the env param in module.exports = function (env) {}.
So that we can do things conditionally using these.


using webpack-merge :

Previously where we where exporting an object,now we are exporting a function which returns merge
and takes in the configuration.


One new plugin I added for this is called new webpack.DefinePlugin. (Also that is why I had to include
webpack at the top of webpack.base.config.js.) What this does is: “The DefinePlugin allows you to create global
constants which can be configured at compile time.” [https://webpack.js.org/plugins/define-plugin/]

style-loader is used to actively watch and change our compiled .css in development mode,
while MiniCssExtractPlugin.loader is used when we need to extract that generated CSS into a separate module.
This is only for production.

new MiniCssExtractPlugin(),
new OptimizeCssAssetsPlugin(),
The first will extract this into a separate module called main.css and the other will minify/uglify the generated CSS.

with file loader we can do :import img from './file.png'

or we can also use: copy-webpack-plugin


we can do this in production build to save few bytes :
new HtmlWebpackPlugin({
  title: 'example',
  template: './src/index.html',
  filename: './index.html',
  inject: true,
  minify: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    minifyCSS: true,
    minifyURLs: true,
    minifyJS: true,
    removeComments: true,
    removeRedundantAttributes: true
  }
})

