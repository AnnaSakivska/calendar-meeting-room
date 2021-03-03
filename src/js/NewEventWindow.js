/* eslint-disable class-methods-use-this */
import * as el from './DOMInteraction'
import DropDown from './DropDown'
import Warnning from './Warnning'
import DisplayedMeeting from './DisplayedMeeting'
import request from './Request'

const dropDown = new DropDown(el.participantsMenu, el.participantsDOM)
const meetingparticipants = new Set()
let meetings

class NewEventWindow {
  constructor() {
    this.warnningMessage = ''
    this.warnning = ''
    this.displayedMeeting = {}
  }

  chooseParticipant(ev) {
    const { target } = ev
    this.warnningMessage = 'You added all possible participants to your meeting!'

    if (target.dataset.person === 'all members') {
      [...el.peopleMenuOptionsDOM].forEach(elem => {
        if (elem.dataset.person !== 'all members') meetingparticipants.add(elem.dataset.person)
      })
      el.participantsDOM.innerText = target.dataset.person
      el.participantsDOM.style.textTransform = 'capitalize'
      dropDown.closeDropDown()
      return
    }
    if (meetingparticipants.size === 7) {
      meetingparticipants.clear()
      meetingparticipants.add(target.dataset.person)
      el.participantsDOM.innerText = target.dataset.person
      return
    }
    if (meetingparticipants.size === 6 && !meetingparticipants.has(target.dataset.person)) {
      meetingparticipants.add(target.dataset.person)
      el.participantsDOM.innerText = 'All Members'
      this.warnning = new Warnning(el.messageSuccessful, '-14rem', this.warnningMessage)
      this.warnning.showSuccessfulMessage()
      dropDown.closeDropDown()
      return
    }
    if (meetingparticipants.size < 7) {
      meetingparticipants.add(target.dataset.person)
    }
    el.participantsDOM.innerText = [...meetingparticipants].join(', ')
    el.participantsDOM.style.textTransform = 'capitalize'
  }

  closeNewEventWindow() {
    el.newEventWindowDOM.classList.add("d-none")
    el.calendarWindowDOM.classList.remove("d-none")
    el.formDOM.reset()
    meetingparticipants.clear()
    el.participantsDOM.innerText = 'Select People'
    document.querySelector('[data-value="all members"]').classList.add('selected')
    document.querySelector('.calendar-header__trigger span').textContent = 'All members'
    request.makeGetRequest()
      .then((data) => { meetings = data })
      .then(() => {
        this.displayedMeeting = new DisplayedMeeting(meetings, true)
        this.displayedMeeting.insertMeeting()
      })
  }

  submitNewEvent() {
    const warningMessageText = el.warningMessage.children[0].children[1]
    const participantsArray = []
    let planningMeeting = {}
    meetingparticipants.forEach(v => participantsArray.push(v))
    this.warnning = new Warnning(el.warningMessage)

    this.warnning.closeWarning()
    if (!el.meetingThemeInputDOM.value) {
      warningMessageText.innerText = 'Please, enter the name of your meeting!'
      this.warnning.addWarning()
      return
    }
    if (meetingparticipants.size === 0) {
      warningMessageText.innerText = 'Please, choose participants for your meeting!'
      this.warnning.addWarning()
      return
    }
    if (!el.dayDOM.value) {
      warningMessageText.innerText = 'Please, choose the day of your meeting!'
      this.warnning.addWarning()
      return
    }
    if (!el.timeDOM.value) {
      warningMessageText.innerText = 'Please, choose the time of your meeting!'
      this.warnning.addWarning()
      return
    }

    planningMeeting = {
      evenName: el.meetingThemeInputDOM.value,
      participants: participantsArray,
      day: el.dayDOM.value,
      time: el.timeDOM.value
    }

    request.makeGetRequest().then((res) => {
      if (res && res.some(meeting => JSON.parse(meeting.data).time === planningMeeting.time && JSON.parse(meeting.data).day === planningMeeting.day)) {
        warningMessageText.innerText = 'Failed to create the event. Time slot is already booked!'
        this.warnning.addWarning()
      }
      else {
        request.postEventData(planningMeeting)
          .then(() => { this.closeNewEventWindow() })

        this.warnningMessage = 'The new meeting was successfully created!'
        this.warnning = new Warnning(el.messageSuccessful, '-6rem', this.warnningMessage)
        this.warnning.showSuccessfulMessage()
      }
    })
  }
}

export default NewEventWindow