import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'airbnb-browser-shims'

import './Authorisation'
import * as el from './DOMInteraction'
import './EventEmitter'
import DropDown from './DropDown'
import NewEventWindow from './NewEventWindow'
import Participant from './Participant'
import Warnning from './Warnning'

const dropDown = new DropDown(el.participantsMenu, el.participantsDOM)
const newEvent = new NewEventWindow()
const allParticipants = []
const warnning = new Warnning()


// Sort meetings by participant
document.querySelector('.calendar-header__select-wrapper').addEventListener('click', () => {
  const participant = new Participant()
  participant.selectName()
})

// preventing input from reloading on Enter
el.meetingThemeInputDOM.addEventListener("keydown", (event) => { if (event.key === "Enter") event.preventDefault() })

// Choose participant for new meeting
el.peopleMenuOptionsDOM.forEach(person => person.addEventListener('click', (event) => newEvent.chooseParticipant(event)))

// Choosing All members to be participants of the meeting
el.calendarNameOptions.forEach(option => { if (option.getAttribute('data-value') !== 'all members') allParticipants.push(option.getAttribute('data-value')) })

// Submit new event
el.submitBtnDOM.addEventListener('click', () => newEvent.submitNewEvent())

// Cancel new event window
el.cancelBtnDOM.addEventListener('click', () => {
  warnning.closeWarning()
  newEvent.closeNewEventWindow()
})

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
el.closeWarningDOM.addEventListener('click', () => { warnning.closeWarning() })


