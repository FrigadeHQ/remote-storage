[![npm version](https://img.shields.io/npm/v/remote-storage)](https://www.npmjs.com/package/remote-storage)
[![tests](https://github.com/FrigadeHQ/remote-storage/actions/workflows/tests.yml/badge.svg)](https://github.com/FrigadeHQ/remote-storage/actions/workflows/tests.yml)
[![npm license](https://img.shields.io/npm/l/remote-storage)](https://www.npmjs.com/package/remote-storage)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


<H3 align="center"><strong>remoteStorage</strong></H3>
<div align="center">remoteStorage is a simple library that combines the localStorage API with a remote server to persist data across browsers and devices.</div>
<br />
<div align="center">
<a href="https://remote.storage">Website</a> 
<span> · </span>
<a href="https://codesandbox.io/p/sandbox/remote-storage-demo-35hgqz?file=%2Fsrc%2Findex.ts">Live Demo</a> 
<span> · </span>
<a href="https://github.com/FrigadeHQ/remote-storage">Source</a> 
<span> · </span>
<a href="https://github.com/FrigadeHQ/remote-storage">Docs</a></div>

<br />


## Why
Storing data in localStorage is useful, but it's not a good solution when you store data that needs to be shared across multiple devices or browsers.

For instance, let's say you want to show a welcome modal to all new users that sign up for your product. If you use localStorage to track if a user has already seen this modal, your users will continue to get the experience over and over again every time they switch devices or browsers.

That's where remoteStorage comes in. Using the same API as localStorage, remoteStorage allows you to easily read and write data on the fly while maintaining state across browsers and devices in order to provide a better user experience.

## Features

- 🔧 Simple API (same as localStorage)
- 🚀 Works with all Javascript frameworks
- 📦 Lightweight (~1 kB minified)
- ✨ Open source server and client (MIT license)
- 🍦 Free hosted community server


## Quick start

Install the library using your favorite package manager:

```bash
npm install remote-storage
```

Import the library and use it like you would localStorage:

```javascript
import { RemoteStorage } from 'remote-storage'

const remoteStorage = new RemoteStorage()

const hasSeenNewFeature = await remoteStorage.getItem('hasSeenNewFeature')

if (!hasSeenNewFeature) {
  await remoteStorage.setItem('hasSeenNewFeature', true)
  // Show your new feature!
}
```

That's it!

## Documentation

### User IDs

remoteStorage uses user IDs to identify users. A user ID is a string that uniquely identifies a user. It can be anything you want, but we recommend using a non-iterable UUID to prevent users from guessing other user IDs and accessing their data.

The User ID is set when you create a new instance of remoteStorage:

```javascript
const remoteStorage = new RemoteStorage({
  userId: '123e4567-e89b-12d3-a456-426614174000'
})
```

### Instance IDs

remoteStorage uses instance IDs to identify the application instance that is making the request. An instance ID is a string that uniquely identifies an application instance. Typically you would use the same instance ID for all requests from the same application instance.

The instance ID is set when you create a new instance of remoteStorage:

```javascript
const remoteStorage = new RemoteStorage({
  userId: '123e4567-e89b-12d3-a456-426614174000',
  instanceId: 'my-cool-app'
})
```

### Server

We offer a free hosted community server at `https://api.remote.storage` (the default behavior if no `serverAddress` is provided). This hosted server should not be used for production apps, but it's great for testing and prototyping.

To use a different server, simply pass the `serverAddress` option when creating a new instance of remoteStorage:
```javascript
const remoteStorage = new RemoteStorage({
  serverAddress: 'https://api.remote.storage',
  userId: '123e4567-e89b-12d3-a456-426614174000',
  instanceId: 'my-cool-app'
})
```

The server can be spun up using Docker in a few minutes. See the [server documentation](/apps/remote-storage-server/README.md) for more information.


### FAQ

#### What data should I store in remoteStorage?

remoteStorage should only be used for non-sensitive data. We recommend using it for things like user preferences, settings, and other non-sensitive data. Due to the nature of the public API, it's not a good fit for storing sensitive data like passwords or PII.

#### How is remoteStorage different from localStorage?

localStorage is a browser API that allows you to store data in the browser. The data is stored locally on the user's device and is not shared across devices or browsers. remoteStorage is a library that combines the localStorage API with a remote server to persist data across browsers and devices.

#### Can't anyone just guess a user ID and access someone else's data?

Yes. For this reason, we recommend using a non-iterable UUID for your user IDs. This makes it nearly impossible for users to guess other user IDs and access their data unless they know the user ID.

