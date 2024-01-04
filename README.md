[![npm version](https://img.shields.io/npm/v/central-storage)](https://www.npmjs.com/package/global-storage)
[![npm version](https://github.com/FrigadeHQ/react-native-onboard/actions/workflows/tests.yml/badge.svg)](https://github.com/FrigadeHQ/react-native-onboard/actions/workflows/tests.yml)
[![npm license](https://img.shields.io/npm/l/react-native-onboard)](https://www.npmjs.com/package/react-native-onboard)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


<H3 align="center"><strong>centralStorage</strong></H3>
<div align="center">centralStorage is a simple, open source library that combines the localStorage API with a single centralized location to store data.</div>
<br />
<div align="center">
<a href="https://frigade.com">Website</a> 
<span> · </span>
<a href="https://demo.frigade.com">Demo</a> 
<span> · </span>
<a href="https://github.com/FrigadeHQ">GitHub</a> 
<span> · </span>
<a href="https://docs.frigade.com">Docs</a></div>

<br />


## Why
Storing data in localStorage is useful, but it's not a good solution when you store data that needs to be shared across multiple devices or browsers.

For instance, let's say you want to hide an announcement of a new feature after a user has seen it already. If use localStorage to solve this, then if a user switches browsers or devices they will continue to get the experience over and over again.

That's where centralStorage comes in. Similar to localStorage, centralStorage allows you to easily store new data on the fly, but as a centralized storage solution it is persistent for users across browsers and devices in order to provide a better end user experience.

## Features

- 🔧 Simple API (same as localStorage)
- 🚀 Works with all Javascript frameworks
- 📦 Lightweight (~2 kB)
- ✨ Open source and self-hostable
- 🍦 Free hosted community server


## Quick start

Install the library:

```bash
npm install central-storage
```

Import the library and use it like you would localStorage:

```javascript
import { CentralStorage } from 'central-storage'


const centralStorage = new CentralStorage({ serverUrl: 'https://server.centralstorage.dev' })


const hasSeenNewFeature = await centralStorage.getItem('hasSeenNewFeature')

if (!hasSeenNewFeature) {
  await centralStorage.setItem('hasSeenNewFeature', true)
}
```

That's it!

## Documentation

### User IDs

centralStorage uses user IDs to identify users. A user ID is a string that uniquely identifies a user. It can be anything you want, but we recommend using a UUID.

The User ID is set when you create a new instance of centralStorage:

```javascript
const centralStorage = new CentralStorage({
  serverUrl: 'https://server.centralstorage.dev',
  userId: '123e4567-e89b-12d3-a456-426614174000'
})
```

### Instance IDs

centralStorage uses instance IDs to identify the application instance that is making the request. An instance ID is a string that uniquely identifies an application instance. Typically you would use the same instance ID for all requests from the same application instance.

The instance ID is set when you create a new instance of centralStorage:

```javascript
const centralStorage = new CentralStorage({
  serverUrl: 'https://server.centralstorage.dev',
  userId: '123e4567-e89b-12d3-a456-426614174000',
  instanceId: 'my-cool-app'
})
```

### Server

We offer a free hosted community server at `https://server.centraldstorage.dev`. The server should not be used for production apps, but it's great for testing and prototyping.

The server can be spun up using Docker in a few minutes. To get started, simply clone the repository and run `docker-compose up`:

```bash
git clone git@github.com:FrigadeHQ/central-storage.git
cd central-storage/apps/server
docker-compose up
```

The server runs on port 4000 by default.

### API

