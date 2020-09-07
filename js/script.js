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

    const menu = document.querySelector('menu'),
          menuBtn = document.querySelector('.menu');
         
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    }  
    //scrollMenu
    const scrollMenuItems = (e) => {
      
      let target = e.target;
      target = (target.tagName !== 'A') ? target.closest('a') : target;
      e.preventDefault();
      let itemHrefAttr = target.getAttribute('href');
      let blockSearch = document.querySelector(`${itemHrefAttr}`);
      if(blockSearch) blockSearch.scrollIntoView({block: 'center', behavior: 'smooth'});
    }
    
    document.addEventListener('click', () => {
      let target = event.target;
      
      if (target.closest('.menu') || target.closest('.close-btn') || (target.closest('li') && target.closest('menu'))){
        handlerMenu(event);
      }
      
      if ((target.tagName === 'A' && target.closest('menu')) || target.closest('a') && target.closest('main')) {
        scrollMenuItems(event);
        
      }
      if (!menu.contains(target) && !menuBtn.contains(target)){
        menu.classList.remove('active-menu');
      }
    });
  }
  toggleMenu();

  //modal position of resize
  let windowWidth = window.innerWidth;
  function setTopOpenOuter() {
    popupContent.style.top = (window.innerHeight - popupContent.offsetHeight) / 2 + 'px';
    if (windowWidth > 768) setTopOuter();
  }
  window.addEventListener('resize', setTopOpenOuter);

  //modal position default
  const popupContent = document.querySelector('.popup-content');
  const setTopOuter = () => {
    const popup = document.querySelector('.popup');
    popup.style.cssText = `
      display:block;
      opacity:0;
      transition:.5s;
      visibility:hidden;
    `;
    (windowWidth > 768) ? popupContent.style.top = '-100%' : popupContent.style.top = '10%';
    
  }
  setTopOuter()
  
  //popup animation open
  let modalStatus = false,
      popupDrive;
  const modalShow = () => {
    modalStatus = true;
    let start = new Date().getTime(),
        startTop = popupContent.getBoundingClientRect().top,
        finalTop = (window.innerHeight - popupContent.offsetHeight) / 2,
        offset = popupContent.offsetHeight + finalTop;

     popupDrive = function(){
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

     popupDrive = function () {
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
          popupBtn = document.querySelectorAll('.popup-btn');
          
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.cssText = `
          opacity:1;
          transition:.5s;
          visibility:visible;
          display:block;
        `;
        (windowWidth > 768) ? modalShow() : popupContent.style.top = '10%';
      });
    });

    popup.addEventListener('click', (e) => {
      let target = e.target;
      if(target.classList.contains('popup-close')){
            popup.style.cssText = `
          opacity:0;
          transition:.5s;
          visibility:hidden;
          display:block;
        `;
        (windowWidth > 768) ? modalClose() : popupContent.style.top = '10%';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          modalClose();
          popup.style.cssText = `
              opacity:0;
              transition:.5s;
              visibility:hidden;
              display:block;
            `;
        }
      } 
         
    });

  }

  togglePopup();

  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++){
        if(index === i){
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    }

    tabHeader.addEventListener('click', (e) => {
      let target = e.target;
          target = target.closest('.service-header-tab');

      if (target) {
          tab.forEach((item, i) => {
            if (item === target) {
              toggleTabContent(i);
            }
          })
      }
    });

  }
  tabs();

  //slider
  

  const slider = () => {

    const slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          dot = document.querySelectorAll('.dot'),
          slider = document.querySelector('.portfolio-content');

    let currentSlide = 0;
    let interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    }

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    }

    const autoplaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    };

    const startSlide = (time = 10000) => {
      interval = setInterval(autoplaySlide, time);
    };
    

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')){
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if(target.matches('#arrow-right')){
        currentSlide++;
      } else if(target.matches('#arrow-left')){
        currentSlide--;
      } else if(target.matches('.dot')){
        dot.forEach((elem, index) => {
          if(elem === target){
            currentSlide = index;
          }
        });
      }
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      if(currentSlide < 0){
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if(event.target.matches('.portfolio-btn') || 
         event.target.matches('.dot')){
            stopSlide();
          }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
          event.target.matches('.dot')) {
            startSlide();
      }
    });

    startSlide(1500);
  };
//makeDots
  const makeDots = (callback) => {
    let slide = document.querySelectorAll('.portfolio-item');
    const portfolioDots = document.querySelector('.portfolio-dots');

    slide.forEach((elem, index) => {

      if (index === slide.length - 1) {
        portfolioDots.insertAdjacentHTML('afterbegin', '<li class="dot dot-active"></li>');
      } else {
        portfolioDots.insertAdjacentHTML('afterbegin', '<li class="dot"></li>');
      }
    });
    callback();
  };
  makeDots(slider);
  
  //changeImgCommand
  const changeImgCommand = (event) => {
    let target = event.target;
      if (target.matches('.command__photo')){
        [target.src, target.dataset.img] = [target.dataset.img, target.src];
      }
  };
  document.getElementById('command').addEventListener('mouseover', changeImgCommand);
  document.getElementById('command').addEventListener('mouseout', changeImgCommand);

  //validate calc inputs
  const validateCalcInputs = () => {
    const validateInputs = document.querySelector('.calc-block');
    validateInputs.addEventListener('input', (event) => {
      let target = event.target;
      if(target.tagName === 'INPUT'){
        target.value = target.value.replace(/\D/g, ''); 
      }
    });
  };
  validateCalcInputs();
});





