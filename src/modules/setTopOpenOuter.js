 
 function setTopOpenOuter() {
   let windowWidth = window.innerWidth;
   const popupContent = document.querySelector('.popup-content');
   popupContent.style.top = (window.innerHeight - popupContent.offsetHeight) / 2 + 'px';
   //if (windowWidth > 768) setTopOuter();
 }

 export default setTopOpenOuter;