import * as el from "./DOMInteraction";
import DropDown from "./DropDown";
import Warnning from "./Warnning";
import DisplayedMeeting from "./DisplayedMeeting";
import request from "./Server";
import ee from "./EventEmitter";
import events from "./EventsSingelton";

const dropDown = new DropDown(el.participantsMenu, el.participantsDOM);
const meetingparticipants = new Set();

ee.on("post-event", (event, method) => {
  request.postEventData(event).then(() => method());
});

ee.on("get-and-insert-event", () => {
  request
    .makeGetRequest()
    .then((data) => {
      const displayedMeeting = new DisplayedMeeting(data, true);
      displayedMeeting.insertMeeting();
    })
    .then(() => {
      el.newEventWindowDOM.classList.add("d-none");
      el.calendarWindowDOM.classList.remove("d-none");
      el.formDOM.reset();
      meetingparticipants.clear();
      el.participantsDOM.innerText = "Select People";
      document
        .querySelector('[data-value="all members"]')
        .classList.add("selected");
      document.querySelector(".calendar-header__trigger span").textContent =
        "All members";
    });
});

class NewEventWindow {
  constructor() {
    this.warnningMessage = "";
    this.warnning = "";
    this.warningMessageText = el.warningMessage.children[0].children[1];
    this.participantsArray = [];
  }

  chooseParticipant(ev) {
    const { target } = ev;
    this.warnningMessage =
      "You added all possible participants to your meeting!";

    if (target.dataset.person === "all members") {
      [...el.peopleMenuOptionsDOM].forEach((elem) => {
        if (elem.dataset.person !== "all members")
          meetingparticipants.add(elem.dataset.person);
      });
      el.participantsDOM.innerText = target.dataset.person;
      el.participantsDOM.style.textTransform = "capitalize";
      dropDown.closeDropDown();
      return;
    }
    if (meetingparticipants.size === 7) {
      meetingparticipants.clear();
      meetingparticipants.add(target.dataset.person);
      el.participantsDOM.innerText = target.dataset.person;
      return;
    }
    if (
      meetingparticipants.size === 6 &&
      !meetingparticipants.has(target.dataset.person)
    ) {
      meetingparticipants.add(target.dataset.person);
      el.participantsDOM.innerText = "All Members";
      this.warnning = new Warnning(el.messageSuccessful, this.warnningMessage);
      this.warnning.showSuccessfulMessage();
      dropDown.closeDropDown();
      return;
    }
    if (meetingparticipants.size < 7) {
      meetingparticipants.add(target.dataset.person);
    }
    el.participantsDOM.innerText = [...meetingparticipants].join(", ");
    el.participantsDOM.style.textTransform = "capitalize";
  }

  closeNewEventWindow() {
    ee.emit("get-and-insert-event");
  }

  creatNewEvent(members) {
    const planningMeeting = {
      evenName: el.meetingThemeInputDOM.value,
      participants: members,
      day: el.dayDOM.value,
      time: el.timeDOM.value,
    };

    if (
      events.getEvents() &&
      events
        .getEvents()
        .some(
          (meeting) =>
            JSON.parse(meeting.data).time === planningMeeting.time &&
            JSON.parse(meeting.data).day === planningMeeting.day
        )
    ) {
      this.warningMessageText.innerText =
        "Failed to create the event. Time slot is already booked!";
      this.warnning.addWarning();
    } else {
      ee.emit("post-event", planningMeeting, this.closeNewEventWindow);
      this.warnningMessage = "The new meeting was successfully created!";
      this.warnning = new Warnning(el.messageSuccessful, this.warnningMessage);
      this.warnning.showSuccessfulMessage();
    }
  }

  submitNewEvent() {
    meetingparticipants.forEach((v) => this.participantsArray.push(v));
    this.warnning = new Warnning(el.warningMessage);

    this.warnning.closeWarning();
    if (!el.meetingThemeInputDOM.value) {
      this.warningMessageText.innerText =
        "Please, enter the name of your meeting!";
      this.warnning.addWarning();
      return;
    }
    if (meetingparticipants.size === 0) {
      this.warningMessageText.innerText =
        "Please, choose participants for your meeting!";
      this.warnning.addWarning();
      return;
    }
    if (!el.dayDOM.value) {
      this.warningMessageText.innerText =
        "Please, choose the day of your meeting!";
      this.warnning.addWarning();
      return;
    }
    if (!el.timeDOM.value) {
      this.warningMessageText.innerText =
        "Please, choose the time of your meeting!";
      this.warnning.addWarning();
      return;
    }

    this.creatNewEvent(this.participantsArray);
  }
}

export default NewEventWindow;
