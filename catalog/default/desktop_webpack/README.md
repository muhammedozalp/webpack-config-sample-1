# Frontend Documentation

> This webpack configuration is using Node.js interface while compiling __async-multiple configs with watch mode__.
> Webpack provides a Node.js API which can be used directly in Node.js runtime.
> 
> The Node.js API is useful in scenarios in which you need to customize the build or development process since all the reporting and error handling must be done manually and webpack only does the compiling part.
>
> For this reason the stats configuration options will not have any effect in the webpack() call.



## Setting-up Frontend Layer with Yarn Workspaces
-    node version: 14.15.4
-    yarn version: 1.22.10
-    cwd root => `yarn install`

## @sample_workspaces/desktop_webpack versiyon
-    "webpack": "5.60.0",
-    "webpack-cli": "4.9.1"


## Assets Compile Commands
First things first navigate to __desktop_webpack__ folder in terminal via `cd` command      
Suppose that you are in the root of repo do as `cd catalog/view/theme/default/desktop_webpack`      
1. Development commands
    -    `mix-dev`
    -    `build-dev`
    -    `build-dev-watch`
    -    `build-dev-all`
    -    `build-dev-all-watch`
2. Production commands
    -    `mix-prod`
    -    `build-prod`
    -    `build-prod-watch`
    -    `build-prod-all`
    -    `build-prod-all-watch`
3. Debug commands
    -    `debug-dev`
    -    `debug-prod`
    -    `debug-prod-stats`
    -    `debug-whybundled`
    -    `debug-whybundledby`
4. Documentation and test section
    -    `doc`
    -    `test-eslint`
    -    `test-stylelint`
    -    `test-webpackconfig`


## As a Second Perspective for Assets Compile Commands
1.  compiling without babel debug in terminal and without bundle analyzer report
    -   `yarn build-dev`
    -   `yarn build-dev-watch`
    -   `yarn build-prod`
    -   `yarn build-prod-watch`
2.  compiling with babel debug in terminal and with bundle analyzer report
    -    `yarn debug-dev`
    -    `yarn debug-prod`
3. compiling with babel debug in terminal and with bundle analyzer report and creating a stats.json file in production mode
    -    `yarn debug-prod-stats`
4. analyzing stats.json in terminal
    -    `yarn debug-whybundled`
    -    `yarn debug-whybundledby`
5. creating documentation using jsdoc
    -    `yarn doc`
6. analyze javascript code
    -    `yarn test-eslint`
7. analyze css/scss code
    -    `yarn test-stylelint`
8. analyze webpack configuration
    -    `yarn test-webpackconfig`
9. run both desktop_webpack and desktop_mix workspaces
    -    `build-dev-all`
    -    `build-dev-all-watch`
    -    `build-prod-all`
    -    `build-prod-all-watch`
10. run only desktop_mix workspace commands
    -    `yarn mix-dev`
    -    `yarn mix-prod`

## Detailed Info Pages

Detailed information that explains structure and modules related with __@sample_workspaces/desktop_webpack__ workspace is placed under [desktop_webpack/jsdocs/](./repo_sample/resources/desktop_webpack/jsdocs) directory.

1. Common info
    1.   eslint
    2.   intl-tel-input
    3.   jsdoc
    4.   library test
    5.   stylelint
    6.   ua_parser
    7.   yarn workspaces

2. Set-up info
    1.   npm_modules
    2.   sss
    3.   webpack modules













#### Base
- Base settings [@tutorial-md](./jsdocs/tutorials/tasks/task.base.settings.md) [@tutorial-jsDoc](./tutorial-task.base.settings.html)
#### Main
- common.js file webpack config [@tutorial-md](./jsdocs/tutorials/tasks/task.main.commonJsFileConfig.md) [@tutorial-jsDoc](./tutorial-task.main.commonJsFileConfig.html)
- Copying static files [@tutorial-md](./jsdocs/tutorials/tasks/task.main.copyStaticFiles.md) [@tutorial-jsDoc](./tutorial-task.main.copyStaticFiles.html)
- Main webpack configuration [@tutorial-md](./jsdocs/tutorials/tasks/task.main.webpack.config.md) [@tutorial-jsDoc](./tutorial-task.main.webpack.config.html)
#### Third Party
- Copy javascript pretty files [@tutorial-md](./jsdocs/tutorials/tasks/task.thirdParty.copyJsPrettyFiles.md) [@tutorial-jsDoc](./tutorial-task.thirdParty.copyJsPrettyFiles.html)

#### Utils
#### Vendor
