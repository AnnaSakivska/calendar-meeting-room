import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'airbnb-browser-shims'
import * as el from './DOMInteraction'
import DropDown from './DropDown'
import NewEventWindow from './NewEventWindow'
import DisplayedMeeting from './DisplayedMeeting'
import Participant from './Participant'
import User from './User'
import Admin from './Admin'
import Warnning from './Warnning'
import request from './Request'

const dropDown = new DropDown(el.participantsMenu, el.participantsDOM)
const newEvent = new NewEventWindow()
const allParticipants = []
let displayedMeeting = {}
let meetings = []
let warnning = ''
let adminIsLoggedIn = false
let user

function authorise() {
  if (el.authoriseSelectDOM.value === 'Anna') {
    // authorise as Admin
    user = new Admin(el.authoriseSelectDOM.value, el.warningMessage, el.messageSuccessful)
    adminIsLoggedIn = true
    el.authorisePopupDom.classList.add('d-none')
    el.addNewEventBtnDOM.classList.remove('disabled-btn')
    el.authorisedBtnDOM.innerText = el.authoriseSelectDOM.value
  } else if (el.authoriseSelectDOM.value) {
    // authorise as User
    user = new User(el.authoriseSelectDOM.value, el.warningMessage, el.messageSuccessful)
    adminIsLoggedIn = false
    el.authorisePopupDom.classList.add('d-none')
    el.addNewEventBtnDOM.classList.add('disabled-btn')
    el.authorisedBtnDOM.innerText = el.authoriseSelectDOM.value
  }
  // Insert All meetings in the calendar
  request.makeGetRequest()
    .then((data) => { meetings = data })
    .then(() => {
      displayedMeeting = new DisplayedMeeting(meetings, adminIsLoggedIn)
      if (!meetings) {
        warnning = new Warnning(el.messageSuccessful, '-6rem', 'Your calendar is empty! No meetings have been planned!')
        warnning.showSuccessfulMessage()
      }
      displayedMeeting.insertMeeting()
      el.calendarNameOptions.forEach(option => option.classList.remove('selected'))
      document.querySelector('[data-value="all members"]').classList.add('selected')
      document.querySelector('.calendar-header__trigger span').textContent = 'All members'
    })
  // delete all warnings that are still showing
  warnning = new Warnning(el.warningMessage)
  warnning.closeWarning()
  warnning = new Warnning(el.messageSuccessful)
  warnning.closeWarning()
}

// Authorization
el.authorizationBtnDOM.addEventListener('click', authorise)

// Reauthorise
el.authorisedBtnDOM.addEventListener('click', () => el.authorisePopupDom.classList.remove('d-none'))

// Sort meetings by participant
document.querySelector('.calendar-header__select-wrapper').addEventListener('click', () => {
  const participant = new Participant()
  participant.selectName()
})

el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('mousedown', (ev) => user.addDraggableAtr(ev)))

// Drag & Drop
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('dragstart', (ev) => { if (adminIsLoggedIn) user.dragStart(ev) }))
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('drop', (ev) => user.drop(ev)))
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('dragend', (ev) => user.dragEnd(ev)))
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('dragover', (ev) => user.dragOver(ev)))

// Delete meeting
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('click', (ev) => user.showDeletePop(ev)))
el.deleteOkBtn.addEventListener('click', () => user.deleteMeeting())
el.deleteNotBtn.addEventListener('click', () => el.deleteMeetingContainer.classList.add('d-none'))

// Open new event window 
el.addNewEventBtnDOM.addEventListener('click', () => user.openNewEventWindow())

// preventing input from reloading on Enter
el.meetingThemeInputDOM.addEventListener("keydown", (event) => { if (event.key === "Enter") event.preventDefault() })

// Choose participant for new meeting
el.peopleMenuOptionsDOM.forEach(person => person.addEventListener('click', (event) => newEvent.chooseParticipant(event)))

// Choosing All members to be participants of the meeting
el.calendarNameOptions.forEach(option => { if (option.getAttribute('data-value') !== 'all members') allParticipants.push(option.getAttribute('data-value')) })

// Submit new event
el.submitBtnDOM.addEventListener('click', () => newEvent.submitNewEvent())

// Cancel new event window
el.cancelBtnDOM.addEventListener('click', () => newEvent.closeNewEventWindow())

// Init dropdown
el.participantsDOM.addEventListener('click', () => dropDown.openDropDown())

// close dropdowns when click outside
window.addEventListener('click', (ev) => {
  if (!(ev.target.closest('.participants') === el.participantsContainerDOM)) dropDown.closeDropDown()
  if (!(ev.target.closest('.styled-select') === el.selectNewEvenDOM[0])) el.selectNewEvenDOM[0].classList.remove('up')
  if (!(ev.target.closest('.styled-select') === el.selectNewEvenDOM[1])) el.selectNewEvenDOM[1].classList.remove('up')
  if (!(ev.target.closest('.calendar-header__select'))) document.querySelector('.calendar-header__select').classList.remove('open')
})

// Arrow up 
el.selectNewEvenDOM.forEach(select => select.addEventListener('click', (ev) => ev.target.closest('.styled-select').classList.toggle('up')))

// init close warning 
el.closeWarningDOM.addEventListener('click', () => {
  warnning = new Warnning(el.warningMessage)
  warnning.closeWarning()
})


