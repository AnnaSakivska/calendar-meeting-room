class Warnning {
  constructor(messageContainer, topOffset, message) {
    this.message = message
    this.messageContainer = messageContainer
    this.topOffset = topOffset
  }

  showSuccessfulMessage() {
    this.messageContainer.innerText = this.message
    this.messageContainer.classList.remove('d-none')
    this.messageContainer.style.top = this.topOffset ? this.topOffset : '-14rem'
    setTimeout(() => { this.messageContainer.classList.add('d-none') }, 6000)
  }

  addWarning() {
    this.messageContainer.classList.remove('d-none')
    this.messageContainer.style.top = this.topOffset ? this.topOffset : '-14rem'
    setTimeout(() => this.messageContainer.classList.add('d-none'), 6000)
  }

  closeWarning() {
    this.messageContainer.classList.add('d-none')
  }
}

export default Warnning