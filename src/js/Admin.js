/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import User from './User'
import Warnning from './Warnning'
import request from './Request'

const messageSuccessful = document.querySelector('.successful-message')
const calendarNameOptions = document.querySelectorAll('.calendar-header__option')
const newEventWindowDOM = document.querySelector('.new-event')
const calendarWindowDOM = document.querySelector('.calendar__main-page')
const warningMessage = document.querySelector('.new-event__warning')
const deleteMeetingPopup = document.querySelector('.delete-popup')
const deleteMeetingContainer = document.querySelector('.delete-popup-container')

let warnningMessage
let warnning
let meetings
request.makeGetRequest()
  .then((data) => {
    if (data) meetings = data
    else meetings = []
  })

class Admin extends User {
  constructor(name, warningMessage1, succMessage) {
    super(name, warningMessage1, succMessage)
    this.name = name
    this.calendarMeetingWrapper = document.querySelectorAll('.calendar__meeting-wrapper')
    this.currentWrapperId = ''
    this.daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    this.hours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    this.meetingId = ''
    this.meetingTitle = ''
    this.meetingToDelete = {}
    this.draggedMeeting = {}
  }

  openNewEventWindow() {
    messageSuccessful.style.top = '-14rem'
    this.warnning.closeWarning()
    this.succWarning.closeWarning()
    calendarNameOptions.forEach(el => el.classList.remove('selected'))
    newEventWindowDOM.classList.remove("d-none")
    calendarWindowDOM.classList.add("d-none")
  }

  addDraggableAtr(ev) {
    if (ev.target.closest('.calendar__meeting-wrapper')) this.calendarMeetingWrapper.forEach(el => el.setAttribute('draggable', true))
  }

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
    let draggedEvID

    target.classList.remove('d-none')
    if (meetings.some(meeting => JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase() === target.id)) {
      this.warnning.closeWarning()
      this.succWarning.closeWarning()
      warningMessage.children[0].children[1].innerHTML = 'Failed to move the event. Time slot is already taken!'
      warningMessage.style.top = '-6rem'
      this.warnning.addWarning()
      return
    }

    warningMessage.classList.add('d-none')
    const data = ev.dataTransfer.getData("text")
    ev.target.appendChild(document.getElementById(data))
    ev.target.children[0].id = ev.target.id.concat('-', 'drag')

    request.makeGetRequest()
      .then((res) => { meetings = res })
      .then(() => {
        draggedEvID = meetings.filter(meeting => this.currentWrapperId === JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())[0].id
        this.draggedMeeting = JSON.parse(meetings.filter(meeting => this.currentWrapperId === JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())[0].data)
        this.draggedMeeting.day = this.daysOfWeek.filter(day => day.substring(0, 2).toLowerCase() === target.id.substring(0, 2))[0]
        this.draggedMeeting.time = this.hours.filter(time => time.substring(0, 2) === target.id.substring(3, 5))[0]
        request.deletEventData(draggedEvID)
          .then(() => {
            request.makeGetRequest()
              .then((res) => { meetings = res })
          })
      })
      .then(() => {
        request.postEventData(this.draggedMeeting)
          .then(() => {
            request.makeGetRequest()
              .then((res) => { meetings = res })
          })
      })
  }

  showDeletePop(e) {
    const { target } = e
    if (target && target.id === 'remove-meeting') {
      request.makeGetRequest()
        .then((res) => { meetings = res })
        .then(() => {
          this.meetingToDelete = meetings.filter((meeting) => target.parentNode.parentNode.id === JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())
          this.meetingId = target.parentNode.parentNode.id
          this.meetingTitle = JSON.parse(this.meetingToDelete[0].data).evenName
          deleteMeetingPopup.children[0].innerHTML = `Are you sure you want to delete <br> "${this.meetingTitle}" event?`
          deleteMeetingContainer.classList.remove('d-none')
        })
    }
  }

  async deleteMeeting() {
    // delete event from common array 'meetings' and localSrorage
    const deleteMeetingDOM = document.querySelector(`#${this.meetingId}`)
    meetings = meetings.filter((meeting) => this.meetingId !== JSON.parse(meeting.data).day.substring(0, 2).concat('-', JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())
    request.deletEventData(this.meetingToDelete[0].id)
    // delete event from the DOM
    deleteMeetingDOM.innerHTML = ''
    deleteMeetingContainer.classList.add('d-none')

    // console.log(this.meetingToDelete[0])
    warnningMessage = `The "${this.meetingTitle}" meeting was successfully deleted!`
    warnning = new Warnning(messageSuccessful, '-6rem', warnningMessage)
    warnning.showSuccessfulMessage()
  }
}

export default Admin