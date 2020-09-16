
const setTopOuter = () => {
  const popupContent = document.querySelector('.popup-content');
  let windowWidth = window.innerWidth;
  const popup = document.querySelector('.popup');
  popup.style.cssText = `
      display:block;
      opacity:0;
      transition:.5s;
      visibility:hidden;
    `;
  (windowWidth > 768) ? popupContent.style.top = '-100%': popupContent.style.top = '10%';

}

export default setTopOuter;