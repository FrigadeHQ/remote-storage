[![npm version](https://img.shields.io/npm/v/react-native-onboard)](https://www.npmjs.com/package/react-native-onboard)
[![npm version](https://github.com/FrigadeHQ/react-native-onboard/actions/workflows/tests.yml/badge.svg)](https://github.com/FrigadeHQ/react-native-onboard/actions/workflows/tests.yml)
[![npm license](https://img.shields.io/npm/l/react-native-onboard)](https://www.npmjs.com/package/react-native-onboard)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


<H3 align="center"><strong>centralStorage</strong></H3>
<div align="center">centralStorage is an open source library and server with the same API as localStorage that allows you to store data in a centralized storage.</div>
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
Storing data in localStorage is great, but it's not a good solution for storing data that needs to be shared across multiple devices for the same user. For example, if you want to store whether a user has seen the announcement of a new feature, you can't do that with localStorage because it's only available on the device that the user is currently using.

You could  spin up a database, but that's a lot of work for storing simple impression events, and it's not very scalable to always involve backend engineering to store the state of a simple binary flag.

That's where centralStorage comes in. It's a simple, open source library and server that allows you to store data in a centralized storage.

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


const centralStorage = new CentralStorage('https://central-storage.frigade.com')


const hasSeenModals = await centralStorage.getItem('hasSeenModals')

if (!hasSeenModals) {
  await centralStorage.setItem('hasSeenModals', true)
}
```
