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
//animate calc total
  const animate = ({timing, draw, duration}) =>{
    let start = performance.now();
    requestAnimationFrame(function myAnimate(time) {

      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      let progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(myAnimate);
      }
    });
  };

  //калькулятор
  const calc = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
      countValue = 1,
      dayValue = 1;

      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

      if(calcCount.value > 1){
        countValue += (calcCount.value - 1) / 10;
      }  
      if(calcDay.value && calcDay.value < 5){
        dayValue *= 2;
      }
      else if(calcDay.value && calcDay.value < 10){
        dayValue *= 1.5;
      }
      if(typeValue && squareValue){
        total = price * typeValue * squareValue * countValue * dayValue; 
      }
      if (total > 0) {
         animate({
          duration: 500,
          timing: function (timeFraction) {
            return Math.pow(timeFraction, 5);
          },
          draw: function (progress) {
            totalValue.textContent = Math.floor(progress * total);
          }
        });
        }
    };


    calcBlock.addEventListener('change', (event) => {
      let target = event.target;
      if(target.matches('select') || target.matches('input')){
        countSum();
      }
    });      
  };
  calc(100);//сумма по умолчанию

  //send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = `
        <div class="sk-wave">
          <div class="sk-rect sk-rect-1"></div> 
          <div class="sk-rect sk-rect-2"></div> 
          <div class="sk-rect sk-rect-3"></div> 
          <div class="sk-rect sk-rect-4"></div> 
          <div class="sk-rect sk-rect-5"></div>
          </div>
      `,
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');

    statusMessage.style.cssText = `font-size:2rem;`;
    document.addEventListener('submit', (event)=>{
      event.preventDefault();
      let target = event.target;
      
      const formData = new FormData(target);
      let phoneInput = target.querySelector('input.form-phone');
      
      let body = {};
    
      formData.forEach((val, key) => {
        body[key] = val;
      });
      if (/^\+?[78]*\d{10}$/.test(phoneInput.value)) {
        phoneInput.style.border = '';
        target.appendChild(statusMessage);
        statusMessage.insertAdjacentHTML('afterbegin', loadMessage);

      postData(body)
        .then(() => statusMessage.textContent = successMessage)
        .catch(() => statusMessage.textContent = errorMessage);

      } else {
        target.style.cssText = 'border:2px solid red;background:#fff';
        return;
      }
      clearInputsForms(target);
    });
 
    //clearInputsForms
    const clearInputsForms = (target)=>{
      let targetFormInputs = target.querySelectorAll('input');
      targetFormInputs.forEach((item) => {
        item.value = '';
      });
    };

    //inputsValidate
    const inputsValidate = ()=>{
      document.addEventListener('input', (event) => {
        let target = event.target;
        if (target.matches('[name="user_name"]') || target.matches('[name="user_message"]')) {
            target.value = target.value.replace(/[^а-яА-ЯёЁ,.!?\s]/, '');
        } 
        else if (target.matches('[name="user_phone"]')){
            target.value = target.value.replace( /[^\+?[0-9]/i,'');
             if (/^\+?[78][0-9]{10}$/.test(target.value)) {
              target.style.cssText = 'border:2px solid green';
              target.setCustomValidity('');
             }
             else if (target.value.length === 0) {
              target.style.border = '';
             }
             else{
              target.setCustomValidity('Введите значение в формате +79273335544 или 89273335544');
              target.style.cssText = 'border:2px solid red;';
             }
        }
      });
    };
    inputsValidate();

    const postData = (body) => {

      return new Promise((resolve, reject) => {

      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        request.status === 200 ? resolve() : reject(request.status);
      });

      request.open('POST', './server.php');
      // request.setRequestHeader('Content-Type', 'multipart/form-data');//вариант формата отправки
      request.setRequestHeader('Content-Type', 'application/json');

     
      // request.send(formData);//вариант формата отправки
      request.send(JSON.stringify(body));

      });  

    }
  };
  sendForm();
});





