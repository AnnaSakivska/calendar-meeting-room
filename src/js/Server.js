import axios from 'axios'

class Server {
  constructor() {
    if (typeof Request.instance === 'object') {
      return Request.instance
    }
    this.baseUrl = 'http://158.101.166.74:8080/api/data/anna_sakiv/events'
    this.meetings = []
    Request.instance = this
    return this
  }

  async makeGetRequest() {
    const res = await axios.get(this.baseUrl)
    return res.data
  }

  async postEventData(event) {
    const res = await axios({
      method: 'post',
      url: this.baseUrl,
      data: JSON.stringify({ data: JSON.stringify(event) })
    })
    return res
  }

  async putEventData(event, id) {
    const res = await axios({
      method: 'put',
      url: `${this.baseUrl}/${id}`,
      data: JSON.stringify({ data: JSON.stringify(event) })
    })
    return res
  }

  async deletEventData(id) {
    await axios.delete(`${this.baseUrl}/${id}`)
  }
}

const request = new Server()
export default request