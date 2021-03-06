import Server from './Server'

class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    const event = this.events[eventName]
    if (event) this.events[eventName].push(callback)
    else this.events[eventName] = [callback]
  }

  emit(eventName, ...rest) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(func => {
        func.apply(Server, rest)
      })
    }
  }
}

const ee = new EventEmitter()

export default ee

