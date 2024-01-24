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

- ✨ Simple API (same as localStorage)
- 🔐 Secure (built-in JWT support)
- 👌 Works with all Javascript frameworks
- 📦 Lightweight (~1 kB minified)
- 🔓 Open source server and client (MIT license)
- 🆓 Free hosted community server

## Quick start

Install the library using your favorite package manager:

```bash
npm install remote-storage
```

Import the library and use it like you would localStorage:

```javascript
import { RemoteStorage } from 'remote-storage'

const remoteStorage = new RemoteStorage({ userId: "my-user-id" })

const hasSeenNewFeature = await remoteStorage.getItem('hasSeenNewFeature')

if (!hasSeenNewFeature) {
  await remoteStorage.setItem('hasSeenNewFeature', true)
  // Highlight your new and exciting feature!
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

If you don't provide a user ID, remoteStorage will generate a random UUID which will change every time the user visits your site. This is useful for testing, but defeats the purpose of remoteStorage since the data will not persist across devices or browsers.

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

#### How do I authenticate requests to remoteStorage?

remoteStorage can be used without any authentication, but we highly recommend using JSON Web Tokens (JWT) to authenticate requests to the server. This can be done by setting the `JWT_SECRET` environment variable in `.env` to your JWT secret for the server.
See the [server documentation](/apps/remote-storage-server/README.md) for more information.

## Contributing

Pull requests are always welcome. Note that if you are going to propose drastic changes, make sure to open an issue for discussion first. This will ensure that your PR will be accepted before you start working on it.

For any existing issues that do not yet have an assigned contributor, feel free to comment on the issue if you would like to work on it. We will assign the issue to you if we think you are a good fit.

**Making changes:** implement your bug fix or feature, write tests to cover it and make sure all tests are passing. Ensure your commit leverages [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) and that your commit message follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format.
Then open a pull request to the main branch.
