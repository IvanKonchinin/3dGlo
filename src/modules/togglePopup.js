 let modalStatus = false,
   popupDrive;
 const popupContent = document.querySelector('.popup-content');
 const modalShow = () => {
   modalStatus = true;
   let start = new Date().getTime(),
     startTop = popupContent.getBoundingClientRect().top,
     finalTop = (window.innerHeight - popupContent.offsetHeight) / 2,
     offset = popupContent.offsetHeight + finalTop;

   popupDrive = function () {
     let now = new Date().getTime() - start,
       currTop = Math.round(startTop + offset * now / 400);
     currTop = (currTop > finalTop) ? finalTop : currTop;
     popupContent.style.top = currTop + 'px';

     if (currTop < finalTop) {
       requestAnimationFrame(popupDrive);
     }
   }
   requestAnimationFrame(popupDrive);
 }

const modalClose = function () {
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
      (window.innerWidth > 768) ? modalShow(): popupContent.style.top = '10%';
    });
  });

  popup.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('popup-close')) {
      popup.style.cssText = `
          opacity:0;
          transition:.5s;
          visibility:hidden;
          display:block;
        `;
      (window.innerWidth > 768) ? modalClose(): popupContent.style.top = '10%';
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
      (window.innerWidth > 768) ? modalClose(): popupContent.style.top = '10%';
      }
    }
  });
}

export default togglePopup;