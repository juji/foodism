# Foodism

This is a test app, develope as a tes-requirement for WEAREREASONABLEPEOPLE

## Dependencies
- NodeJS v6+
- yarn or npm

## install & build
### Requirements
For building the app, you will need these environment variables:
- REACT_APP_GOOGLE_API_KEY
- LISTEN_PORT

The environment variable will be read from `.env` file. Ussually this file is not included in the repo, but since we are testing, it will be convenient to include this and run the build in localhost.

### Build
In the root directory:
```bash
$ npm install # yarn
$ npm run build # yarn build
```
Doing that, will build the app in `build` directory. This directory can be served via node.js or nginx. The Production version will need HTTPS connection, since it will need the user location in `lat`, `long` corrdinates, which requires a secure connection. 

However, for `localhost`, HTTPS is not needed.

This app is designed to be run from the root directory.


## local browser testing
```bash
$ npm run start # yarn start
```
you can view the app in http://localhost:3000

## Deploy
Pushing to github will trigger travis.ci to build the app. Testing is part of the build process so we don;t need to add another test command.

In this package, the deploy command is not yet determined. 
We can choose from a multiple of choices as written in the [travis.ci doc](https://docs.travis-ci.com/user/deployment/).

## Backend
There is no backend, i choose the simplest approach for this project because of the time constraint. So, it's a Full frontend app with Google API as backend.

> For backend i usualy use express.js

