/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import * as el from './DOMInteraction'
import DisplayedMeeting from './DisplayedMeeting'
import events from './EventsSingelton'

export default class Participant {
  constructor() {
    this.draggble = false
    this.chosenName = ''
    this.meetings = []
    this.displayedMeeting = {}
    this.filteredMeetings = []
  }

  selectName() {
    document.querySelector('.calendar-header__select').classList.toggle('open')
    document.querySelectorAll('.calendar-header__option').forEach((option) => {
      option.addEventListener('click', function () {
        if (!option.classList.contains('selected')) {
          if (option.parentNode.querySelector('.calendar-header__option.selected')) option.parentNode.querySelector('.calendar-header__option.selected').classList.remove('selected')
          option.classList.add('selected')
          option.closest('.calendar-header__select').querySelector('.calendar-header__trigger span').textContent = option.textContent
          el.clendarMeetingSpotDom.forEach(spot => { spot.innerHTML = '' })
          this.chosenName = option.textContent
          this.draggable = el.authorisedBtnDOM.innerText === 'Anna' ? el.authorisedBtnDOM.innerText === 'Anna' : false
          this.displayedMeeting = new DisplayedMeeting(events.getEvents(), this.draggable)

          if (option.textContent === 'All members' && events.getEvents()) this.displayedMeeting.insertMeeting()
          else if (this.chosenName && events.getEvents()) {
            this.filteredMeetings = events.getEvents().filter(meeting => JSON.parse(meeting.data).participants.includes(this.chosenName.toLowerCase()))
            this.displayedMeeting = new DisplayedMeeting(this.filteredMeetings, this.draggable)
            this.displayedMeeting.insertMeeting()
          }
        }
      })
    })
  }
}