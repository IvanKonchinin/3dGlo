
 function setTopOpenOuter() {
   let windowWidth = window.innerWidth;
   const popupContent = document.querySelector('.popup-content');
   popupContent.style.top = (window.innerHeight - popupContent.offsetHeight) / 2 + 'px';
  (windowWidth > 768) ? popupContent.style.top = '-100%': popupContent.style.top = '10%';
 }

 export default setTopOpenOuter;