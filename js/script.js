'use strict';

window.addEventListener('DOMContentLoaded', () => {

  
  //tIMER
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
          return { timeRemaining, hours, minutes, seconds };
    }

      const updateClock = () => {
      
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

  //menu

  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li'),
          btnMouse = document.querySelectorAll('main a');
    
    const handlerMenu = (e) => {
      menu.classList.toggle('active-menu');
      
    }  
    //scrollMenu
    const scrollMenuItems = (e) => {
      let target = e.target;
      target = (e.target.tagName !== 'A') ? e.target.closest('a') : e.target;
      e.preventDefault();
      let itemHrefAttr = target.getAttribute('href');
      let blockSearch = document.querySelector(`${itemHrefAttr}`);
      blockSearch.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    menuItems.forEach((elem) => elem.addEventListener('click', scrollMenuItems));
    btnMouse.forEach((elem) => elem.addEventListener('click', scrollMenuItems));
  }
  toggleMenu();

  //modal position default
  const popupContent = document.querySelector('.popup-content');
  function setTopOuter() {
    const popup = document.querySelector('.popup');
    popup.style.cssText = `
      display:block;
      opacity:0;
      transition:.5s;
      visibility:hidden;
    `;
    popupContent.style.top = '-100%';
  }

  setTopOuter();
  
  //popup animation open
  let modalStatus = false;
  const modalShow = () => {
    modalStatus = true;
    let start = new Date().getTime(),
        startTop = popupContent.getBoundingClientRect().top,
        finalTop = (window.innerHeight - popupContent.offsetHeight) / 2,
        offset = popupContent.offsetHeight + finalTop;

    let popupDrive = function(){
      let now = new Date().getTime() - start,
          currTop = Math.round(startTop + offset * now / 400);
          currTop = (currTop > finalTop) ? finalTop : currTop;
          popupContent.style.top = currTop + 'px';

          if(currTop < finalTop){
            requestAnimationFrame(popupDrive);
          }
    }
    requestAnimationFrame(popupDrive);
  }

  //popup animation close
  const modalClose = function(){
    if (modalStatus) {
        modalStatus = false;
    
    let start = new Date().getTime(),
        startTop = popupContent.getBoundingClientRect().top,
        finalTop = -popupContent.offsetHeight,
        offset = popupContent.offsetHeight + (window.innerHeight - popupContent.offsetHeight) / 2;

    let popupDrive = function () {
      let now = new Date().getTime() - start,
          currTop = Math.round(startTop - offset * now / 400);
          currTop = (currTop < finalTop) ? finalTop : currTop;
          popupContent.style.top = currTop + 'px';
      if (currTop > finalTop) {
        requestAnimationFrame(popupDrive);
      } 
    }
      requestAnimationFrame(popupDrive);
    }
  } 

  //popup
  const togglePopup = () => {
    
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');
    
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.cssText = `
          opacity:1;
          transition:.5s;
          visibility:visible;
          display:block;
        `;
        (window.innerWidth <= 768) ? popupContent.style.top = '10%' : modalShow();
        
      });
    });

    popupClose.addEventListener('click', () => {
      (window.innerWidth <= 768) ? popupContent.style.top = '-100%' : modalClose();
      popup.style.cssText = `
      opacity:0;
      transition:.5s;
      visibility:hidden;
      display:block;
    `;
      
    });
    
  }

//modal position of resize
  function setTopOpenOuter() {
    popupContent.style.top = (window.innerHeight - popupContent.offsetHeight) / 2 + 'px';
  }
  window.addEventListener('resize', setTopOpenOuter);

  togglePopup();
});





