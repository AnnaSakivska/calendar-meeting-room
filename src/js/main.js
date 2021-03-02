/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'airbnb-browser-shims'
import User from './User'
import Admin from './Admin'
import Warnning from './Warnning'
import request from './Request'

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
let meetings = []
let warnningMessage
let warnning
let adminIsLoggedIn = false

// preventing input from reloading on Enter
meetingThemeInputDOM.addEventListener("keydown", (event) => { if (event.key === "Enter") event.preventDefault() })

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
  warnningMessage = 'You added all possible participants to your meeting!'

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
    warnning = new Warnning(messageSuccessful, '-14rem', warnningMessage)
    warnning.showSuccessfulMessage()
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
closeWarningDOM.addEventListener('click', () => {
  warnning = new Warnning(warningMessage)
  warnning.closeWarning()
})

// Remove all events from DOM
function removeEventsDOM() {
  clendarMeetingSpotDom.forEach(spot => {
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
  warnning = new Warnning(warningMessage)

  request.makeGetRequest()
    .then((data) => {
      if (data) meetings = data
      else meetings = []
    })
    .then(() => {
      insertMeeting(meetings)
    })

  warnning.closeWarning()
  if (!meetingThemeInputDOM.value) {
    warningMessageText.innerText = 'Please, enter the name of your meeting!'
    warnning.addWarning()
    return
  }
  if (meetingparticipants.size === 0) {
    warningMessageText.innerText = 'Please, choose participants for your meeting!'
    warnning.addWarning()
    return
  }
  if (!dayDOM.value) {
    warningMessageText.innerText = 'Please, choose the day of your meeting!'
    warnning.addWarning()
    return
  }
  if (!timeDOM.value) {
    warningMessageText.innerText = 'Please, choose the time of your meeting!'
    warnning.addWarning()
    return
  }

  planningMeeting = {
    evenName: meetingThemeInputDOM.value,
    participants: participantsArray,
    day: dayDOM.value,
    time: timeDOM.value
  }

  if (meetings && meetings.some(meeting => JSON.parse(meeting.data).time === planningMeeting.time && JSON.parse(meeting.data).day === planningMeeting.day)) {
    warningMessageText.innerText = 'Failed to create the event. Time slot is already booked!'
    warnning.addWarning()
    return
  }

  request.postEventData(planningMeeting)
    .then(() => {
      request.makeGetRequest()
        .then((data) => { meetings = data })
        .then(() => {
          insertMeeting(meetings)
        })
    })
    .catch(err => console.log(err))

  closeNewEventWindow()
  document.querySelector('[data-value="all members"]').classList.add('selected')
  document.querySelector('.calendar-header__trigger span').textContent = 'All members'

  warnningMessage = 'The new meeting was successfully created!'
  warnning = new Warnning(messageSuccessful, '-6rem', warnningMessage)
  warnning.showSuccessfulMessage()
}
submitBtnDOM.addEventListener('click', submitNewEvent)

function cancelNewEvent() {
  closeNewEventWindow()
  memberShownNameDOM.innerText = 'Choose name'
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

  if (filteredArray) filteredArray.forEach(meeting => {
    const parsedMeeting = JSON.parse(meeting.data)
    const meetingStop = document.getElementById(parsedMeeting.day.substring(0, 2).concat('-', parsedMeeting.time.substring(0, 2)).toLowerCase())
    meetingStop.innerHTML = `
                      <div class="calendar__meeting-wrapper occupied" id="${parsedMeeting.day.substring(0, 2).concat('-', parsedMeeting.time.substring(0, 2)).toLowerCase()}-drag" draggable="true">
                      <p class="calendar__meeting">${parsedMeeting.evenName}</p>
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
        if (this.textContent === 'All members' && meetings) {
          request.makeGetRequest()
            .then((data) => { meetings = data })
            .then(() => {
              insertMeeting(meetings)
            })
        }
        else if (chosenName && meetings) {
          filteredMeetings = meetings.filter(meeting => JSON.parse(meeting.data).participants.includes(chosenName.toLowerCase()))
          insertMeeting(filteredMeetings)
        }
      }
    })
  })
}
document.querySelector('.calendar-header__select-wrapper').addEventListener('click', selectName)

// 3. Authorization
const deleteMeetingContainer = document.querySelector('.delete-popup-container')
const deleteOkBtn = document.querySelector('#delete')
const deleteNotBtn = document.querySelector('#delete-not')
let user

request.makeGetRequest()
  .then((data) => { meetings = data })
  .then(() => {
    insertMeeting(meetings)
  })

function authorise() {
  if (authoriseSelectDOM.value === 'Anna') {
    user = new Admin(authoriseSelectDOM.value, warningMessage, messageSuccessful)
    adminIsLoggedIn = true
    authorisePopupDom.classList.add('d-none')
    addNewEventBtnDOM.classList.remove('disabled-btn')
    authorisedBtnDOM.innerText = authoriseSelectDOM.value
  } else if (authoriseSelectDOM.value) {
    user = new User(authoriseSelectDOM.value, warningMessage, messageSuccessful)
    adminIsLoggedIn = false
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
clendarMeetingSpotDom.forEach(el => el.addEventListener('dragstart', (ev) => {
  if (adminIsLoggedIn) user.dragStart(ev)
}))
clendarMeetingSpotDom.forEach(el => el.addEventListener('dragend', (ev) => user.dragEnd(ev)))
clendarMeetingSpotDom.forEach(el => el.addEventListener('dragover', (ev) => user.dragOver(ev)))

// Delete meeting
clendarMeetingSpotDom.forEach(el => el.addEventListener('click', (ev) => user.showDeletePop(ev)))
deleteOkBtn.addEventListener('click', () => user.deleteMeeting())
deleteNotBtn.addEventListener('click', () => deleteMeetingContainer.classList.add('d-none'))