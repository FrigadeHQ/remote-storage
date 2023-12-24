import { FlowStep, Frigade } from '../src'
import { generateGuestId } from '../src/shared/utils'
import { getRandomID } from './util'
import { Flow } from '../src/.'

const testAPIKey = 'api_public_3MPLH7NJ9L0U963XKW7BPE2IT137GC6L742JLC2XCT6NOIYSI4QUI9I1RA3ZOGIL'
const testFlowId = 'flow_yJfjksFrs5QEH0c8'
const testFlowStepId = 'checklist-step-one'

test('can init Frigade', async () => {
  const frigade = new Frigade(testAPIKey, {})
  const flows = await frigade.getFlows()
  expect(flows.length).toBeGreaterThan(0)
})

test('flows have fields set', async () => {
  const frigade = new Frigade(testAPIKey, {})
  const flows = await frigade.getFlows()
  expect(
    flows.filter((flow) => flow.id && flow.rawData && flow.rawData.type).length
  ).toBeGreaterThan(0)
  const flow = flows[0]
  flow.steps.forEach((step) => {
    expect(step.id).toBeDefined()
    expect(step.title).toBeDefined()
  })
})

test('read and set flow state', async () => {
  const frigade = new Frigade(testAPIKey, {
    userId: generateGuestId(),
  })
  const flow = await frigade.getFlow(testFlowId)
  expect(flow).toBeDefined()
  expect(flow.id).toEqual(testFlowId)
  expect(flow.isCompleted).toBeFalsy()
  await flow.complete()
  expect(flow.isCompleted).toBeTruthy()
})

test('read and set flow step state', async () => {
  const frigade = new Frigade(testAPIKey, {
    userId: generateGuestId(),
  })
  const flow = await frigade.getFlow(testFlowId)
  expect(flow).toBeDefined()
  expect(flow.id).toEqual(testFlowId)
  const step = flow.steps.get(testFlowStepId)
  expect(flow.getCurrentStepIndex()).toEqual(0)
  expect(step).toBeDefined()
  expect(step.isCompleted).toBeFalsy()
  expect(step.isStarted).toBeFalsy()
  await step.start()
  expect(flow.getCurrentStepIndex()).toEqual(0)
  expect(step.isStarted).toBeTruthy()
  await step.complete()
  expect(flow.getCurrentStepIndex()).toEqual(1)
  expect(step.isCompleted).toBeTruthy()
  await step.reset()
  expect(step.isCompleted).toBeFalsy()
  expect(step.isStarted).toBeFalsy()
  expect(flow.getCurrentStepIndex()).toEqual(0)
})

test('navigates back and forth in a flow', async () => {
  const frigade = new Frigade(testAPIKey, {
    userId: generateGuestId(),
  })
  const flow = await frigade.getFlow(testFlowId)
  expect(flow).toBeDefined()
  expect(flow.id).toEqual(testFlowId)
  const previousStep = flow.steps.get(testFlowStepId)
  expect(flow.getCurrentStepIndex()).toEqual(0)
  expect(previousStep).toBeDefined()
  expect(previousStep.isCompleted).toBeFalsy()
  expect(previousStep.isStarted).toBeFalsy()
  await flow.forward()
  expect(flow.getCurrentStepIndex()).toEqual(1)
  const currentStep = flow.getCurrentStep()
  expect(currentStep.isStarted).toBeTruthy()
  expect(currentStep.isCompleted).toBeFalsy()
  await flow.back()
  expect(flow.getCurrentStepIndex()).toEqual(0)
  expect(previousStep.isStarted).toBeTruthy()
  expect(previousStep.isCompleted).toBeFalsy()
})

test('handle flow event changes', async () => {
  const frigade = new Frigade(testAPIKey, {
    userId: getRandomID(),
  })

  const callback1 = jest.fn((flow: Flow) => {
    if (flow.id != testFlowId) {
      return
    }
    expect(flow).toBeDefined()
    expect(flow.id).toEqual(testFlowId)
    expect(flow.isCompleted).toBeFalsy()
    expect(flow.isStarted).toBeTruthy()
  })
  frigade.onStateChange(callback1)
  const flow = await frigade.getFlow(testFlowId)
  expect(flow).toBeDefined()
  expect(flow.id).toEqual(testFlowId)
  expect(flow.isCompleted).toBeFalsy()
  expect(callback1).toHaveBeenCalledTimes(0)
  await flow.getStepByIndex(0).complete()
  expect(flow.isCompleted).toBeFalsy()
  expect(callback1).toHaveBeenCalled()
  frigade.removeStateChangeHandler(callback1)

  const callback2 = jest.fn((flow) => {
    if (flow.id != testFlowId) {
      return
    }
    expect(flow).toBeDefined()
    expect(flow.id).toEqual(testFlowId)
    expect(flow.isCompleted).toBeTruthy()
  })
  frigade.onStateChange(callback2)
  expect(callback2).toHaveBeenCalledTimes(0)
  await flow.complete()
  expect(flow.isCompleted).toBeTruthy()
  expect(callback2).toHaveBeenCalled()
  frigade.removeStateChangeHandler(callback2)
})

test('handle flow event changes unsubscribe', async () => {
  const frigade = new Frigade(testAPIKey, {
    userId: getRandomID(),
  })
  const callback = jest.fn(() => {})
  frigade.onStateChange(callback)
  const flow = await frigade.getFlow(testFlowId)
  expect(flow).toBeDefined()
  expect(flow.id).toEqual(testFlowId)
  expect(flow.isCompleted).toBeFalsy()
  frigade.removeStateChangeHandler(callback)
  await flow.complete()
  expect(flow.isCompleted).toBeTruthy()
  expect(callback).toHaveBeenCalledTimes(0)
})

test('handle single flow event changes subscribes and unsubscribes', async () => {
  const frigade = new Frigade(testAPIKey, {
    userId: getRandomID(),
  })
  const instanceId = frigade.config.__instanceId
  expect(instanceId).toBeDefined()
  const callback = jest.fn((flow: Flow) => {
    expect(flow).toBeDefined()
    expect(flow.id).toEqual(testFlowId)
  })
  const flow = await frigade.getFlow(testFlowId)
  flow.onStateChange(callback)
  expect(flow).toBeDefined()
  expect(flow.id).toEqual(testFlowId)
  expect(flow.isCompleted).toBeFalsy()
  expect(flow.isStarted).toBeFalsy()
  expect(callback).toHaveBeenCalledTimes(0)
  await flow.complete()
  expect(flow.isCompleted).toBeTruthy()
  expect(callback).toHaveBeenCalledTimes(2)
  flow.removeStateChangeHandler(callback)
  expect(frigade.config.__instanceId).toEqual(instanceId)
  expect(flow.config.__instanceId).toEqual(instanceId)
})

test('handle step event changes', async () => {
  const frigade = new Frigade(testAPIKey, {
    userId: getRandomID(),
  })

  const callback = jest.fn((step: FlowStep) => {
    expect(step).toBeDefined()
    expect(step.id).toEqual(testFlowStepId)
  })
  const flow = await frigade.getFlow(testFlowId)

  expect(callback).toHaveBeenCalledTimes(0)
  flow.steps.get(testFlowStepId).onStateChange(callback)
  expect(callback).toHaveBeenCalledTimes(0)
  await flow.steps.get(testFlowStepId).start()
  expect(callback).toHaveBeenCalledTimes(1)
  await flow.steps.get(testFlowStepId).complete()
  expect(callback).toHaveBeenCalledTimes(2)
})

test('custom variables get substituted', async () => {
  const frigade = new Frigade(testAPIKey, {
    userId: getRandomID(),
  })
  const flow = await frigade.getFlow(testFlowId)
  expect(flow).toBeDefined()
  expect(flow.getStepByIndex(0)).toBeDefined()
  expect(flow.getStepByIndex(0).subtitle).toContain('${email}')
  expect(flow.getStepByIndex(0).subtitle).toContain('${name}')
  const step = flow.steps.get(testFlowStepId)
  const customVariables = {
    name: 'John Doe',
    email: 'john@doe.com',
  }
  flow.applyVariables(customVariables)
  expect(step.subtitle).toContain(customVariables.email)
  expect(step.subtitle).toContain(customVariables.name)
  // Complete the first step. Expect content to still be substituted.
  await step.complete()
  expect(step.subtitle).toContain(customVariables.email)
  expect(step.subtitle).toContain(customVariables.name)
})
