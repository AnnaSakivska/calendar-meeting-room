import Warnning from './Warnning'

const errorWarning = new Warnning(document.querySelector('.new-event__warning'))

function Catch(target, key, descriptor) {
  const originalMethod = descriptor.value
  const calendarMeetingWrapper = document.querySelectorAll(".calendar__meeting-wrapper")

  descriptor.value = async function (...args) {
    try {

      // console.log('decorator working')
      return await originalMethod.apply(this, args)
    }
    catch (error) {
      if (error.response) document.querySelector('.new-event__warning-message').innerText = `Sorry, something went wrong (${error.message} with status code - ${error.response.status}).
                                                                            Please, try again later.`
      else document.querySelector('.new-event__warning-message').innerText = `Sorry, something went wrong (${error.message}). Please, try again later.`
      errorWarning.addWarning()

    }
    return descriptor
  }
}

export default Catch