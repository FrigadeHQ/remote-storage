[![npm version](https://img.shields.io/npm/v/@frigade/js)](https://www.npmjs.com/package/@frigade/js)
[![npm version](https://github.com/FrigadeHQ/javascript/actions/workflows/tests.yml/badge.svg)](https://github.com/FrigadeHQ/javascript/actions/workflows/tests.yml)
[![typescript](https://camo.githubusercontent.com/0f9fcc0ac1b8617ad4989364f60f78b2d6b32985ad6a508f215f14d8f897b8d3/68747470733a2f2f62616467656e2e6e65742f62616467652f547970655363726970742f7374726963742532302546302539462539322541412f626c7565)](https://www.npmjs.com/package/@frigade/js)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<H3 align="center"><strong>Frigade Javascript SDK</strong></H3>
<div align="center">The easiest way for developers to build high-quality product onboarding and education.</div>
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

![Frigade iamge](https://frigade.com/img/frigademetaimage-v2.png)

## Install

Install the package from your command line.

#### With yarn

```bash
yarn add @frigade/js
```

#### With npm

```bash
npm install @frigade/js
```

## Usage

Simply `import { Frigade }  from '@frigade/js'` and use it. Example:

```js
import {Frigade} from 'packages/js-client'

const frigade = new Frigade('FRIGADE_API_KEY')

await frigade.identify('USER_ID', {
  name: 'USER_NAME',
  email: 'USER_EMAIL',
  signed_up_at: 'USER_SIGNED_UP_AT' // ISO 8601 format
})

// Optional: send organization/group id
await frigade.group('ORGANIZATION_ID', {
  name: 'COMPANY_NAME',
})
```

## API Reference

#### Get a flow:

```js
const flow = await frigade.getFlow('FLOW_ID')
// Flow data defined in config.yml in the Frigade dashboard
console.log('Flow status:', flow.isCompleted)
console.log('Flow data:', flow.rawData)
```

#### Marking a flow as completed:

```js
const flow = await frigade.getFlow('FLOW_ID')
await flow.complete()
```

#### Marking a step in a flow as completed:

```js
const flow = await frigade.getFlow('FLOW_ID')
const step = flow.steps.get('STEP_ID')
await step.start()
await step.complete()
```

#### Sending tracking events:

```js
await frigade.track('EVENT_NAME', {
  property1: 'value1',
  property2: 'value2',
})
```

#### Event handlers
Global event handlers can be registered to be notified when any state change occurs in any flow. For example, to be notified when a flow is completed:

```js
// This callback will be called when a the current user/group changes state in any flow
const callback = (updatedFlow, previousFlow) => {
  console.log('Flow state changed:', flow.isCompleted)
  console.log('Step state changed:', flow.steps.get('STEP_ID').isCompleted)
};

frigade.onStateChange(callback);
// To remove the callback use:
frigade.removeOnFlowStateChangeHandler(callback);
```
Flow specific event handlers can be registered to be notified when a specific flow changes state. For example, to be notified when a flow is completed:

```js
// This callback will be called when a the current user/group changes state in the flow with id FLOW_ID
const flow = await frigade.getFlow('FLOW_ID')
const callback = (updatedFlow, previousFlow) => {
  console.log('Flow state changed:', flow.isCompleted)
  console.log('Step state changed:', flow.steps.get('STEP_ID').isCompleted)
};
flow.onStateChange(callback);
```
To only target a specific step in a flow, use:
```js
// This callback will be called when a the current user/group changes state in the flow with id FLOW_ID and step with id STEP_ID
const flow = await frigade.getFlow('FLOW_ID')
const step = flow.steps.get('STEP_ID')
const callback = (updatedStep, previousStep) => {
  console.log('Step state changed:', step.isCompleted)
};
step.onStateChange(callback);
```


## Cross-platform support

All non-UI related functionality of the SDK works in all JavaScript environments (Node.js, browser, React Native, etc.).

## TypeScript support

This package contains TypeScript definitions of the `frigade` object.

## About Frigade

[Frigade](<https://frigade.com>) is a developer-first platform for building quality product onboarding. A powerful,
flexible API and native SDKs allow you to build onboarding 10x faster, experiment more easily, and drive customer
success.

Frigade supports a series of use cases such as:

- **Registration**: Maximize the number of users getting through your sign up flows with beautiful explainers, progress
  bars, and forms.
- **Activation**: Convert more customers by taking them through a series of key onboarding items specific to their role,
  permissions, or goals.
- **Adoption**: Introduce audiences to specific features that deliver value with native hotspots, tooltips, tours, and
  interactive product guides.
- **Engagement**: Keep active customers engaged, announce new product features, and create lifecycle specific
  re-onboarding flows for dormant or churned customers.
- **Retention**: Increase retention by delivering the right content at the right time, and by asking your users for
  feedback on the product.

# Features

**Component Library**

Unstyled, ready-made components for building high‑quality user onboarding, faster. Onboarding checklists, tooltips,
product walkthroughs, and much more. [See components](https://frigade.com/components)

**Integrations**

Integrations with Segment, Mixpanel, Posthog, and more to power targeting, analytics, and communications.

**Content Management**

Lightweight CMS built-in to update and test onboarding copy and content.

**Versioning**

Frigade makes it easy to manage multiple versions of onboarding across staging and production. Revisit previous versions
of onboarding to see how they performed and make improvements.

**Customer Journeys**

Frigade automatically tracks state management and onboarding progress. Give your team full observability into the
customer journey, and use Frigade to kick off automated workflows.


To learn more, visit [frigade.com](<https://frigade.com>)

