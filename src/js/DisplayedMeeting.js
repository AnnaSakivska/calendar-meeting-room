export default class DisplayedMeeting {
  constructor(meetingsArr, draggable) {
    this.meetingsArr = meetingsArr;
    this.draggable = draggable;
  }

  async insertMeeting() {
    if (await this.meetingsArr)
      this.meetingsArr.forEach((meeting) => {
        const parsedMeeting = JSON.parse(meeting.data);
        const meetingStop = document.getElementById(
          parsedMeeting.day
            .substring(0, 2)
            .concat("-", parsedMeeting.time.substring(0, 2))
            .toLowerCase()
        );
        meetingStop.innerHTML = `
                        <div class="calendar__meeting-wrapper occupied" id="${parsedMeeting.day
                          .substring(0, 2)
                          .concat("-", parsedMeeting.time.substring(0, 2))
                          .toLowerCase()}-drag" draggable="${this.draggable}">
                        <p class="calendar__meeting">${
                          parsedMeeting.evenName
                        }</p>
                        <span class="cup caledar__meeting-remove" id="remove-meeting">&#10006;</span>
                        </div>
                        `;
      });
  }
}
