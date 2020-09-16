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

 export default makeDots;