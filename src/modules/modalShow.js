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

 export default modalShow;