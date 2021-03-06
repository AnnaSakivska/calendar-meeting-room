import * as el from './DOMInteraction'
import DisplayedMeeting from './DisplayedMeeting'
import User from './User'
import Admin from './Admin'
import Warnning from './Warnning'
import events from './EventsSingelton'

let user
let adminIsLoggedIn = false

export default class Authorisation {
  constructor() {
    this.meetings = []
    this.displayedMeeting = {}
    this.user = {}
    this.warnning = {}
  }

  // Insert All meetings in the calendar
  insertAllMeetings() {
    this.displayedMeeting = new DisplayedMeeting(events.getEvents(), adminIsLoggedIn)
    if (!events.getEvents()) {
      this.warnning = new Warnning(el.messageSuccessful, 'Your calendar is empty! No meetings have been planned!')
      this.warnning.showSuccessfulMessage()
    }
    this.displayedMeeting.insertMeeting()
    el.calendarNameOptions.forEach(option => option.classList.remove('selected'))
    document.querySelector('[data-value="all members"]').classList.add('selected')
    document.querySelector('.calendar-header__trigger span').textContent = 'All members'
  }

  authorise() {
    if (el.authoriseSelectDOM.value === 'Anna') {
      // authorise as Admin
      user = new Admin(el.authoriseSelectDOM.value)
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
    this.insertAllMeetings(adminIsLoggedIn)
    // delete all warnings that are still showing
    this.warnning = new Warnning()
    this.warnning.closeWarning()
  }
}

const authorisation = new Authorisation()

// Authorization
el.authorizationBtnDOM.addEventListener('click', () => authorisation.authorise())

// Reauthorise
el.authorisedBtnDOM.addEventListener('click', () => el.authorisePopupDom.classList.remove('d-none'))

el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('mousedown', (ev) => user.addDraggableAtr(ev)))

// Drag & Drop
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('dragstart', (ev) => {
  if (adminIsLoggedIn) user.dragStart(ev)
}))
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('drop', (ev) => user.drop(ev)))
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('dragend', (ev) => user.dragEnd(ev)))
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('dragover', (ev) => user.dragOver(ev)))

// Delete meeting
el.clendarMeetingSpotDom.forEach(elem => elem.addEventListener('click', (ev) => user.showDeletePop(ev)))
el.deleteOkBtn.addEventListener('click', () => user.deleteMeeting())
el.deleteNotBtn.addEventListener('click', () => el.deleteMeetingContainer.classList.add('d-none'))

// Open new event window 
el.addNewEventBtnDOM.addEventListener('click', () => user.openNewEventWindow())