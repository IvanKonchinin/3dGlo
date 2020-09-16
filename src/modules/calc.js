  const animate = ({
    timing,
    draw,
    duration
  }) => {
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

     if (calcCount.value > 1) {
       countValue += (calcCount.value - 1) / 10;
     }
     if (calcDay.value && calcDay.value < 5) {
       dayValue *= 2;
     } else if (calcDay.value && calcDay.value < 10) {
       dayValue *= 1.5;
     }
     if (typeValue && squareValue) {
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
     if (target.matches('select') || target.matches('input')) {
       countSum();
     }
   });
 };

 export default calc;