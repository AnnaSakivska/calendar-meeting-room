import Warnning from './Warnning'

class User {
  constructor(name, warningMessage, succMessage) {
    this.name = name
    this.warningMessage = warningMessage
    this.calendarMeetingWrapper = document.querySelectorAll('.calendar__meeting-wrapper')
    this.warnning = new Warnning(warningMessage)
    this.succWarning = new Warnning(succMessage)
  }

  addDraggableAtr(ev) {
    if (ev.target.closest('.calendar__meeting-wrapper')) this.calendarMeetingWrapper.forEach(el => el.setAttribute('draggable', false))
  }

  openNewEventWindow() {
    this.warnning.closeWarning()
    this.warningMessage.children[0].children[1].innerHTML = 'Only the admin can add new meeting!'
    this.warnning.addWarning()
  }

  showDeletePop(e) {
    this.warnning.closeWarning()
    if (e.target.closest('.caledar__meeting-remove')) {
      this.warningMessage.children[0].children[1].innerHTML = 'Only the admin can remove the meeting!'
      this.warnning.addWarning()
    }
  }
}

export default User