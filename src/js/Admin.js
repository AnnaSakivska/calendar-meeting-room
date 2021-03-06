/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import User from './User'
import * as el from './DOMInteraction'

import Warnning from './Warnning'
import request from './Server'
import ee from './EventEmitter'
import events from './EventsSingelton'

let warnningMessage
let warnning
let meetings = events.getEvents()

ee.on('delete-event', request.deletEventData)
ee.on('put-event', (event, id) => { request.putEventData(event, id).then(() => events.getEvents()) })

class Admin extends User {
  constructor(name) {
    super(name)
    this.name = name
    this.calendarMeetingWrapper = document.querySelectorAll('.calendar__meeting-wrapper')
    this.currentWrapperId = ''
    this.daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    this.hours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    this.meetingId = ''
    this.meetingTitle = ''
    this.meetingToDelete = {}
    this.draggedMeeting = {}
    this.draggedEvID = ''
  }

  openNewEventWindow() {
    this.warnning.closeWarning()
    el.calendarNameOptions.forEach(elem => elem.classList.remove('selected'))
    el.newEventWindowDOM.classList.remove("d-none")
    el.calendarWindowDOM.classList.add("d-none")
  }

  addDraggableAtr(ev) { if (ev.target.closest('.calendar__meeting-wrapper')) this.calendarMeetingWrapper.forEach(elem => elem.setAttribute('draggable', true)) }

  dragStart(ev) {
    const target = ev.target.closest('.calendar__meeting-space')
    if (!(ev.target.closest('.calendar-header__select'))) document.querySelector('.calendar-header__select').classList.remove('open')
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData("text", ev.target.id)
    setTimeout(() => (ev.target.classList.add('d-none')), 0)
    target.children[0].classList.add('hold')
    this.currentWrapperId = target.id
  }

  dragEnd(ev) {
    ev.preventDefault()
    const target = ev.target.closest('.calendar__meeting-space')
    document.getElementById(this.currentWrapperId).classList.remove('d-none')
    target.children[0].classList.remove('hold')
    target.children[0].classList.remove('d-none')
  }

  // eslint-disable-next-line class-methods-use-this
  dragOver(ev) {
    ev.preventDefault()
  }

  drop(ev) {
    ev.preventDefault()
    const target = ev.target.closest('.calendar__meeting-space')
    const data = ev.dataTransfer.getData("text")

    target.classList.remove('d-none')
    if (meetings.some(meeting => JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase() === target.id)) {
      this.warnning.closeWarning()
      el.warningMessage.children[0].children[1].innerHTML = 'Failed to move the event. Time slot is already taken!'
      this.warnning.addWarning()
      return
    }

    el.warningMessage.classList.add('d-none')
    ev.target.appendChild(document.getElementById(data))
    ev.target.children[0].id = ev.target.id.concat('-', 'drag')

    this.draggedEvID = events.getEvents().filter(meeting => this.currentWrapperId === JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())[0].id
    this.draggedMeeting = JSON.parse(events.getEvents().filter(meeting => this.currentWrapperId === JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())[0].data)
    this.draggedMeeting.day = this.daysOfWeek.filter(day => day.substring(0, 2).toLowerCase() === target.id.substring(0, 2))[0]
    this.draggedMeeting.time = this.hours.filter(time => time.substring(0, 2) === target.id.substring(3, 5))[0]

    ee.emit('put-event', this.draggedMeeting, this.draggedEvID)
  }

  showDeletePop(e) {
    const { target } = e
    if (target && target.id === 'remove-meeting') {
      this.meetingToDelete = events.getEvents().filter((meeting) => target.parentNode.parentNode.id === JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())
      this.meetingId = target.parentNode.parentNode.id
      this.meetingTitle = JSON.parse(this.meetingToDelete[0].data).evenName
      el.deleteMeetingPopup.children[0].innerHTML = `Are you sure you want to delete <br> "${this.meetingTitle}" event?`
      el.deleteMeetingContainer.classList.remove('d-none')
    }
  }

  deleteMeeting() {
    // delete event from common array 'meetings' and server
    const deleteMeetingDOM = document.querySelector(`#${this.meetingId}`)
    meetings = meetings.filter((meeting) => this.meetingId !== JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())
    ee.emit('delete-event', this.meetingToDelete[0].id)
    // delete event from the DOM
    deleteMeetingDOM.innerHTML = ''
    el.deleteMeetingContainer.classList.add('d-none')
    // warning
    warnningMessage = `The "${this.meetingTitle}" meeting was successfully deleted!`
    warnning = new Warnning(el.messageSuccessful, warnningMessage)
    warnning.showSuccessfulMessage()
  }
}

export default Admin