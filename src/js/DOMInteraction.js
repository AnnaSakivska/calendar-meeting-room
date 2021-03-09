const authorisePopupDom = document.querySelector(".popup-container");
const authorizationBtnDOM = document.querySelector(".authorise-popup__btn");
const authoriseSelectDOM = document.getElementById("authorise-select");
const authorisedBtnDOM = document.querySelector(".calendar-header__authorized");
const calendarWindowDOM = document.querySelector(".calendar__main-page");
const newEventWindowDOM = document.querySelector(".new-event");
const addNewEventBtnDOM = document.querySelector(".calendar-header__new-ivent");
const formDOM = document.querySelector("form");
const participantsContainerDOM = document.querySelector(".participants");
const participantsDOM = document.querySelector(".new-event__participants");
const peopleMenuOptionsDOM = document.querySelectorAll(".menu-option");
const participantsMenu = document.querySelector(
  ".new-event__participants-menu"
);
const selectNewEvenDOM = document.querySelectorAll(".styled-select");
const meetingThemeInputDOM = document.getElementById("event-name");
const submitBtnDOM = document.querySelector(".new-event__submit");
const cancelBtnDOM = document.querySelector(".new-event__cancel");
const closeWarningDOM = document.getElementById("warning-close");
const warningMessage = document.querySelector(".new-event__warning");
const messageSuccessful = document.querySelector(".successful-message");
const dayDOM = document.getElementById("day");
const timeDOM = document.getElementById("time");
const memberShownNameDOM = document.querySelector(
  ".calendar-header__trigger span"
);
const calendarNameOptions = document.querySelectorAll(
  ".calendar-header__option"
);
const clendarMeetingSpotDom = document.querySelectorAll(
  ".calendar__meeting-space"
);
const deleteMeetingContainer = document.querySelector(
  ".delete-popup-container"
);
const deleteMeetingPopup = document.querySelector(".delete-popup");
const deleteOkBtn = document.querySelector("#delete");
const deleteNotBtn = document.querySelector("#delete-not");

export {
  authorisePopupDom,
  authorizationBtnDOM,
  authoriseSelectDOM,
  authorisedBtnDOM,
  calendarWindowDOM,
  newEventWindowDOM,
  addNewEventBtnDOM,
  formDOM,
  participantsContainerDOM,
  participantsDOM,
  peopleMenuOptionsDOM,
  participantsMenu,
  selectNewEvenDOM,
  meetingThemeInputDOM,
  submitBtnDOM,
  cancelBtnDOM,
  closeWarningDOM,
  warningMessage,
  messageSuccessful,
  dayDOM,
  timeDOM,
  memberShownNameDOM,
  calendarNameOptions,
  clendarMeetingSpotDom,
  deleteMeetingContainer,
  deleteMeetingPopup,
  deleteOkBtn,
  deleteNotBtn,
};
