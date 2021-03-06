import ee from './EventEmitter'
import request from './Server'

class EventsSingelton {
  constructor() {
    if (typeof EventsSingelton.instance === 'object') {
      return EventsSingelton.instance
    }
    this.meetings = []
    Request.instance = this
    return this
  }

  getEvents() {
    request.makeGetRequest()
      .then(data => { this.meetings = data })
    return this.meetings
  }
}

const events = new EventsSingelton(ee)

export default events