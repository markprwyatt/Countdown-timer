
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const audio = document.querySelector('.siren');

let countdown;

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  clearInterval(countdown);
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if ( secondsLeft < 10) {
          audio.play();
      }
      if (secondsLeft < 1) {
          clearInterval(countdown);
          audio.pause();
      }
      displayTimeLeft(secondsLeft)
  },
  1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    let secondsLeft = seconds % 60;
    if (secondsLeft < 10) {
        secondsLeft = '0' + secondsLeft
    }
    const displayTime = `${minutes}:${secondsLeft}`;
    document.title = displayTime;
    
    timerDisplay.textContent = displayTime;
    
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const mins = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${mins}`
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    
    timer(mins * 60);
    this.reset();
})

