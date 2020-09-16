	const countTimer = (deadLine) => {
	  const timerHours = document.querySelector('#timer-hours'),
	    timerMinutes = document.querySelector('#timer-minutes'),
	    timerSeconds = document.querySelector('#timer-seconds');

	  const getTimeRemaining = () => {
	    let dateStop = new Date(deadLine).getTime(),
	      dateNow = new Date().getTime(),
	      timeRemaining = (dateStop - dateNow) / 1000,
	      seconds = Math.floor(timeRemaining % 60),
	      minutes = Math.floor((timeRemaining / 60) % 60),
	      hours = Math.floor(timeRemaining / 60 / 60) % 24;
	    seconds = (seconds < 10) ? '0' + Math.floor(timeRemaining % 60) : Math.floor(timeRemaining % 60);
	    minutes = (minutes < 10) ? '0' + Math.floor((timeRemaining / 60) % 60) : Math.floor((timeRemaining / 60) % 60);
	    hours = (hours < 10) ? '0' + Math.floor((timeRemaining / 60 / 60) % 24) : Math.floor((timeRemaining / 60 / 60) % 24);
	    //days = Math.floor(timeRemaining / 60 / 60 / 24);
	    return {
	      timeRemaining,
	      hours,
	      minutes,
	      seconds
	    };
	  }

	  const updateClock = () => {

	    let timer = getTimeRemaining();
	    if (timer.timeRemaining > 0) {
	      timerHours.textContent = timer.hours;
	      timerMinutes.textContent = timer.minutes;
	      timerSeconds.textContent = timer.seconds;

	    } else {
	      timerHours.textContent = '00';
	      timerMinutes.textContent = '00';
	      timerSeconds.textContent = '00';
	      clearInterval(intervalId);
	    }
	  }
	  let intervalId = setInterval(updateClock, 1000);
	}

	export default countTimer;