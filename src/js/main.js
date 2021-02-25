/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint max-classes-per-file: off */
/* eslint-disable class-methods-use-this */

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'airbnb-browser-shims'

const authorisePopupDom = document.querySelector('.popup-container')
const authorizationBtnDOM = document.querySelector('.authorise-popup__btn')
const authoriseSelectDOM = document.getElementById('authorise-select')
const authorisedBtnDOM = document.querySelector('.calendar-header__authorized')

const calendarWindowDOM = document.querySelector('.calendar__main-page')
const newEventWindowDOM = document.querySelector('.new-event')
const addNewEventBtnDOM = document.querySelector('.calendar-header__new-ivent')
const formDOM = document.querySelector('form')
const participantsContainerDOM = document.querySelector('.participants')
const participantsDOM = document.querySelector('.new-event__participants')
const peopleMenuOptionsDOM = document.querySelectorAll('.menu-option')
const participantsMenu = document.querySelector('.new-event__participants-menu')
const selectNewEvenDOM = document.querySelectorAll('.styled-select')
const meetingThemeInputDOM = document.getElementById('event-name')
const submitBtnDOM = document.querySelector('.new-event__submit')
const cancelBtnDOM = document.querySelector('.new-event__cancel')
const closeWarningDOM = document.getElementById('warning-close')
const warningMessage = document.querySelector('.new-event__warning')
const messageSuccessful = document.querySelector('.successful-message')
const dayDOM = document.getElementById('day')
const timeDOM = document.getElementById('time')
const memberShownNameDOM = document.querySelector('.calendar-header__trigger span')
const calendarNameOptions = document.querySelectorAll('.calendar-header__option')
const clendarMeetingSpotDom = document.querySelectorAll('.calendar__meeting-space')


// 1. ADD NEW EVENT FORM
const meetingparticipants = new Set()
let meetings = localStorage.getItem('meetings') ? JSON.parse(localStorage.getItem('meetings')) : []


// preventing input from reloading on Enter
meetingThemeInputDOM.addEventListener("keydown", (event) => { if (event.key === "Enter") event.preventDefault() })

function showSuccessfulMessage(innerMessage) {
  messageSuccessful.innerText = innerMessage
  messageSuccessful.classList.remove('d-none')
  setTimeout(() => { messageSuccessful.classList.add('d-none') }, 6000)
}

// Participants drop down functionality
function openDropDown() {
  participantsMenu.classList.toggle("d-none")
  participantsDOM.classList.toggle("up")
}

function closeDropDown() {
  participantsMenu.classList.add("d-none")
  participantsDOM.classList.remove("up")
}
participantsDOM.addEventListener('click', openDropDown)

window.addEventListener('click', (ev) => {
  if (!(ev.target.closest('.participants') === participantsContainerDOM)) closeDropDown()
  if (!(ev.target.closest('.styled-select') === selectNewEvenDOM[0])) selectNewEvenDOM[0].classList.remove('up')
  if (!(ev.target.closest('.styled-select') === selectNewEvenDOM[1])) selectNewEvenDOM[1].classList.remove('up')
  if (!(ev.target.closest('.calendar-header__select'))) document.querySelector('.calendar-header__select').classList.remove('open')
})

function chooseParticipant(ev) {
  const { target } = ev

  if (target.dataset.person === 'all members') {
    [...peopleMenuOptionsDOM].forEach(el => {
      if (el.dataset.person !== 'all members') meetingparticipants.add(el.dataset.person)
    })
    participantsDOM.innerText = target.dataset.person
    participantsDOM.style.textTransform = 'capitalize'
    closeDropDown()
    return
  }
  if (meetingparticipants.size === 7) {
    meetingparticipants.clear()
    meetingparticipants.add(target.dataset.person)
    participantsDOM.innerText = target.dataset.person
    return
  }
  if (meetingparticipants.size === 6 && !meetingparticipants.has(target.dataset.person)) {
    meetingparticipants.add(target.dataset.person)
    participantsDOM.innerText = 'All Members'
    showSuccessfulMessage('You added all possible participants to your meeting!')
    closeDropDown()
    return
  }
  if (meetingparticipants.size < 7) {
    meetingparticipants.add(target.dataset.person)
  }
  participantsDOM.innerText = [...meetingparticipants].join(', ')
  participantsDOM.style.textTransform = 'capitalize'
}
peopleMenuOptionsDOM.forEach(person => person.addEventListener('click', chooseParticipant))

// Arrow up 
selectNewEvenDOM.forEach(select => select.addEventListener('click', (ev) => ev.target.closest('.styled-select').classList.toggle('up')))

// 2. SUBMIT & CANCEL NEW EVENT
function addWarning() {
  warningMessage.classList.remove('d-none')
  setTimeout(() => warningMessage.classList.add('d-none'), 6000)
}

function closeWarning() {
  warningMessage.classList.add('d-none')
  messageSuccessful.classList.add('d-none')
}
closeWarningDOM.addEventListener('click', closeWarning)

// Remove all events from DOM
function removeEventsDOM() {
  clendarMeetingSpotDom.forEach(spot => {
    // eslint-disable-next-line no-param-reassign
    spot.innerHTML = ''
  })
}

function closeNewEventWindow() {
  newEventWindowDOM.classList.add("d-none")
  calendarWindowDOM.classList.remove("d-none")
  formDOM.reset()
  meetingparticipants.clear()
  participantsDOM.innerText = 'Select People'
}

function submitNewEvent() {
  const warningMessageText = warningMessage.children[0].children[1]
  const participantsArray = []
  let planningMeeting = {}
  meetingparticipants.forEach(v => participantsArray.push(v))
  warningMessage.style.top = '-14rem'

  closeWarning()
  if (!meetingThemeInputDOM.value) {
    warningMessageText.innerText = 'Please, enter the name of your meeting!'
    addWarning()
    return
  }
  if (meetingparticipants.size === 0) {
    warningMessageText.innerText = 'Please, choose participants for your meeting!'
    addWarning()
    return
  }
  if (!dayDOM.value) {
    warningMessageText.innerText = 'Please, choose the day of your meeting!'
    addWarning()
    return
  }
  if (!timeDOM.value) {
    warningMessageText.innerText = 'Please, choose the time of your meeting!'
    addWarning()
    return
  }

  planningMeeting = {
    evenName: meetingThemeInputDOM.value,
    participants: participantsArray,
    day: dayDOM.value,
    time: timeDOM.value
  }

  if (meetings.some(meeting => meeting.time === planningMeeting.time && meeting.day === planningMeeting.day)) {
    warningMessageText.innerText = 'Failed to create the event. Time slot is already booked!'
    addWarning()
    return
  }

  meetings.push(planningMeeting)
  localStorage.setItem('meetings', JSON.stringify(meetings))
  closeNewEventWindow()
  document.querySelector('[data-value="all members"]').classList.add('selected')
  document.querySelector('.calendar-header__trigger span').textContent = 'All members'
  insertMeeting(meetings)
  messageSuccessful.style.top = '-6rem'
  showSuccessfulMessage('The new meeting was successfully created!')
}
submitBtnDOM.addEventListener('click', submitNewEvent)

function cancelNewEvent() {
  closeNewEventWindow()
  memberShownNameDOM.innerText = 'Choose name'
  removeEventsDOM()
}
cancelBtnDOM.addEventListener('click', cancelNewEvent)

// 2. SHOW EVENT at Calendar page 
let filteredMeetings
const allParticipants = []

calendarNameOptions.forEach(option => {
  if (option.getAttribute('data-value') !== 'all members') allParticipants.push(option.getAttribute('data-value'))
})

// insert meeting into the DOM
function insertMeeting(filteredArray) {
  filteredArray.forEach(meeting => {
    const meetingStop = document.getElementById(meeting.day.substring(0, 2).concat('-', meeting.time.substring(0, 2)).toLowerCase())
    meetingStop.innerHTML = `
                      <div class="calendar__meeting-wrapper occupied" id="${meeting.day.substring(0, 2).concat('-', meeting.time.substring(0, 2)).toLowerCase()}-drag" draggable="true">
                      <p class="calendar__meeting">${meeting.evenName}</p>
                      <span class="cup caledar__meeting-remove" id="remove-meeting">&#10006;</span>
                      </div>
                      `
  })
}

function selectName() {
  let chosenName
  this.querySelector('.calendar-header__select').classList.toggle('open')
  this.querySelectorAll('.calendar-header__option').forEach((option) => {
    option.addEventListener('click', function () {
      if (!this.classList.contains('selected')) {
        if (this.parentNode.querySelector('.calendar-header__option.selected')) this.parentNode.querySelector('.calendar-header__option.selected').classList.remove('selected')
        this.classList.add('selected')
        this.closest('.calendar-header__select').querySelector('.calendar-header__trigger span').textContent = this.textContent
        removeEventsDOM()
        chosenName = this.textContent
        if (this.textContent === 'All members' && meetings) insertMeeting(meetings)
        else if (chosenName && meetings) {
          filteredMeetings = meetings.filter(meeting => meeting.participants.includes(chosenName.toLowerCase()))
          insertMeeting(filteredMeetings)
        }
      }
    })
  })
}
document.querySelector('.calendar-header__select-wrapper').addEventListener('click', selectName)

// 3. Authorization
const deleteMeetingContainer = document.querySelector('.delete-popup-container')
const deleteMeetingPopup = document.querySelector('.delete-popup')
const deleteOkBtn = document.querySelector('#delete')
const deleteNotBtn = document.querySelector('#delete-not')
let user

class User {
  constructor(name) {
    this.name = name
  }

  addDraggableAtr(ev) { ev.target.closest('.calendar__meeting-wrapper').setAttribute('draggable', false) }

  openNewEventWindow() {
    closeWarning()
    warningMessage.children[0].children[1].innerHTML = 'Only the admin can add new meeting!'
    warningMessage.style.top = '-6rem'
    addWarning()
  }

  showDeletePop(e) {
    closeWarning()
    warningMessage.children[0].children[1].innerHTML = 'Only the admin can remove the meeting!'
    warningMessage.style.top = '-6rem'
    addWarning()
  }
}

class Admin extends User {
  constructor(name) {
    super(name)
    this.name = name
    this.currentWrapperId = ''
    this.daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    this.hours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    this.meetingId = ''
    this.meetingToDelete = {}
  }

  openNewEventWindow() {
    messageSuccessful.style.top = '-14rem'
    closeWarning()
    calendarNameOptions.forEach(el => el.classList.remove('selected'))
    newEventWindowDOM.classList.remove("d-none")
    calendarWindowDOM.classList.add("d-none")
  }

  addDraggableAtr(ev) { ev.target.closest('.calendar__meeting-wrapper').setAttribute('draggable', true) }


  dragStart(ev) {
    const target = ev.target.closest('.calendar__meeting-space')
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

  dragOver(ev) {
    ev.preventDefault()
  }

  drop(ev) {
    ev.preventDefault()
    const target = ev.target.closest('.calendar__meeting-space')
    target.classList.remove('d-none')
    if (meetings.some(meeting => meeting.day.substring(0, 2).concat('-', meeting.time.substring(0, 2)).toLowerCase() === target.id)) {
      closeWarning()
      warningMessage.children[0].children[1].innerHTML = 'Failed to move the event. Time slot is already taken!'
      warningMessage.style.top = '-6rem'
      addWarning()
      return
    }

    warningMessage.classList.add('d-none')
    const data = ev.dataTransfer.getData("text")
    ev.target.appendChild(document.getElementById(data))
    ev.target.children[0].id = ev.target.id.concat('-', 'drag')

    meetings = meetings.map(meeting => {
      if (this.currentWrapperId === meeting.day.substring(0, 2).concat('-', meeting.time.substring(0, 2)).toLowerCase()) {
        meeting.day = this.daysOfWeek.filter(day => day.substring(0, 2).toLowerCase() === target.id.substring(0, 2))[0]
        meeting.time = this.hours.filter(time => time.substring(0, 2) === target.id.substring(3, 5))[0]
      }
      return meeting
    })
    localStorage.setItem('meetings', JSON.stringify(meetings))
  }

  showDeletePop(e) {
    const { target } = e
    if (target && target.id === 'remove-meeting') {
      this.meetingToDelete = meetings.filter((meeting) => target.parentNode.parentNode.id === meeting.day.substring(0, 2).concat('-', meeting.time.substring(0, 2)).toLowerCase())
      this.meetingId = target.parentNode.parentNode.id
      deleteMeetingPopup.children[0].innerHTML = `Are you sure you want to delete <br> "${this.meetingToDelete[0].evenName}" event?`
      deleteMeetingContainer.classList.remove('d-none')
    }
  }

  deleteMeeting() {
    // delete event from common array 'meetings' and localSrorage
    const deleteMeetingDOM = document.querySelector(`#${this.meetingId}`)
    meetings = meetings.filter((meeting) => this.meetingId !== meeting.day.substring(0, 2).concat('-', meeting.time.substring(0, 2)).toLowerCase())
    localStorage.setItem('meetings', JSON.stringify(meetings))
    // delete event from the DOM
    deleteMeetingDOM.innerHTML = ''
    deleteMeetingContainer.classList.add('d-none')
    showSuccessfulMessage(`The "${this.meetingToDelete[0].evenName}" meeting was successfully deleted!`)
    messageSuccessful.style.top = '-6rem'
  }
}

insertMeeting(meetings)

function authorise() {
  if (authoriseSelectDOM.value === 'Anna') {
    user = new Admin(authoriseSelectDOM.value)
    authorisePopupDom.classList.add('d-none')
    addNewEventBtnDOM.classList.remove('disabled-btn')
    authorisedBtnDOM.innerText = authoriseSelectDOM.value
  } else if (authoriseSelectDOM.value) {
    user = new User(authoriseSelectDOM.value)
    authorisePopupDom.classList.add('d-none')
    addNewEventBtnDOM.classList.add('disabled-btn')
    authorisedBtnDOM.innerText = authoriseSelectDOM.value
  }
}

authorizationBtnDOM.addEventListener('click', authorise)

authorisedBtnDOM.addEventListener('click', () => authorisePopupDom.classList.remove('d-none'))

// open & clole new event page
addNewEventBtnDOM.addEventListener('click', () => user.openNewEventWindow())

clendarMeetingSpotDom.forEach(el => el.addEventListener('mousedown', (ev) => user.addDraggableAtr(ev)))

// Drag & Drop
clendarMeetingSpotDom.forEach(el => el.addEventListener('drop', (ev) => user.drop(ev)))
clendarMeetingSpotDom.forEach(el => el.addEventListener('dragstart', (ev) => user.dragStart(ev)))
clendarMeetingSpotDom.forEach(el => el.addEventListener('dragend', (ev) => user.dragEnd(ev)))
clendarMeetingSpotDom.forEach(el => el.addEventListener('dragover', (ev) => user.dragOver(ev)))

// Delete meeting
clendarMeetingSpotDom.forEach(el => el.addEventListener('click', (ev) => user.showDeletePop(ev)))
deleteOkBtn.addEventListener('click', () => user.deleteMeeting())
deleteNotBtn.addEventListener('click', () => deleteMeetingContainer.classList.add('d-none'))