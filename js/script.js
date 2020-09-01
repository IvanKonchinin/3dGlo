'use strict';

window.addEventListener('DOMContentLoaded', () => {

  //tIMER
	function countTimer(deadLine) {
		let timerHours = document.querySelector('#timer-hours'),
			  timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
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
          return { timeRemaining, hours, minutes, seconds };
    }

      function updateClock(){
      
      let timer = getTimeRemaining();
        if (timer.timeRemaining > 0) {
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;
            
        } 
        else {
              timerHours.textContent = '00';
              timerMinutes.textContent = '00';
              timerSeconds.textContent = '00';
              clearInterval(intervalId);
        }
      }
    let intervalId = setInterval(updateClock, 1000);
  }
  
  countTimer('02 september 2020');
});





