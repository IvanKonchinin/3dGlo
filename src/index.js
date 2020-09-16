  'use strict';

  import countTimer from './modules/countTimer';
  import toggleMenu from './modules/toggleMenu';
  import setTopOpenOuter from './modules/setTopOpenOuter';
  import setTopOuter from './modules/setTopOuter';
  // import modalShow from './modules/modalShow';
  // import modalClose from './modules/modalClose';
  import togglePopup from './modules/togglePopup';
  import tabs from './modules/tabs';
  import slider from './modules/slider';
  import makeDots from './modules/makeDots';
  import changeImgCommand from './modules/changeImgCommand';
  import calc from './modules/calc';
  import sendForm from './modules/sendForm';
  import validateCalcInputs from './modules/validateCalcInputs';
  
  //tIMER
  countTimer('22 september 2020');
  //menu
  toggleMenu();
  //modal position of resize
  
  window.addEventListener('resize', setTopOpenOuter);
  //modal position default
  
  setTopOuter()
  //popup animation open
  
  //popup animation close 
  //popup
  togglePopup();
  //Tabs
  tabs();
  //slider
  //makeDots
  makeDots(slider);
  //changeImgCommand
  document.getElementById('command').addEventListener('mouseover', changeImgCommand);
  document.getElementById('command').addEventListener('mouseout', changeImgCommand);
  //validate calc inputs
  validateCalcInputs();
  //animate calc total
  //калькулятор
  calc(100); //сумма по умолчанию
  //send-ajax-form
  sendForm();