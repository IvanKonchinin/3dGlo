 const validateCalcInputs = () => {
   const validateInputs = document.querySelector('.calc-block');
   validateInputs.addEventListener('input', (event) => {
     let target = event.target;
     if (target.tagName === 'INPUT') {
       target.value = target.value.replace(/\D/g, '');
     }
   });
 };

export default validateCalcInputs;