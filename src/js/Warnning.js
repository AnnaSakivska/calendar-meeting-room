import * as el from "./DOMInteraction";

class Warnning {
  constructor(messageContainer, message) {
    this.message = message;
    this.messageContainer = messageContainer;
  }

  showSuccessfulMessage() {
    this.messageContainer.innerText = this.message;
    this.messageContainer.classList.remove("d-none");
    setTimeout(() => {
      this.messageContainer.classList.add("d-none");
    }, 6000);
  }

  addWarning() {
    this.messageContainer.classList.remove("d-none");
    setTimeout(() => this.messageContainer.classList.add("d-none"), 6000);
  }

  closeWarning() {
    el.messageSuccessful.classList.add("d-none");
    el.warningMessage.classList.add("d-none");
  }
}

export default Warnning;
