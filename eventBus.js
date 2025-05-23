class EventBus {
  constructor() {
    this.events = {} // {[event: string], Function[]}
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  publish(event, data) {
    const targetEvent = this.events[event]
    if (!targetEvent) {
      throw new Error(`没有匹配的${event}`)
    }
    for (let item of targetEvent) {
      data ? item(data) : item()
    }
  }

  unSubscribe(event) {
    const { [event]: targetEvent, ...rest } = this.events
    this.events = rest
  }

  // 只订阅一次
  once(eventName, callback) {
    const onceCallback = (...args) => {
      callback(...args)
      this.unSubscribe(eventName, onceCallback)
    }
    this.subscribe(eventName, onceCallback)
  }
}

const eventBus = new EventBus()

eventBus.subscribe('click', () => {
  console.log('订阅了click1')
})
eventBus.subscribe('change', () => {
  console.log('订阅了change')
})

eventBus.publish('click')
eventBus.publish('click')
console.log('event: ', eventBus)
eventBus.unSubscribe('click')
console.log('event: ', eventBus)

eventBus.once('input', () => {
  console.log('订阅了input')
})

eventBus.publish('input')

const p = { name: 'leoochen', age: 18 }
const { name, ...rest } = p

console.log(rest, 'rest')