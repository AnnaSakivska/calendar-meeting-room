class DropDown {
  constructor(membersMenu, membersDOM) {
    this.membersMenu = membersMenu
    this.membersDOM = membersDOM
  }

  openDropDown() {
    this.membersMenu.classList.toggle("d-none")
    this.membersDOM.classList.toggle("up")
  }

  closeDropDown() {
    this.membersMenu.classList.add("d-none")
    this.membersDOM.classList.remove("up")
  }
}

export default DropDown