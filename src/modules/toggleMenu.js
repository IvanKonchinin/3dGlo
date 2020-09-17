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
     if (blockSearch) blockSearch.scrollIntoView({
       block: 'center',
       behavior: 'smooth'
     });
   }

   document.addEventListener('click', (event) => {
     let target = event.target;
    console.log(target);
     if (target.closest('.menu') || target.closest('.close-btn') || (target.closest('a') && target.closest('menu'))) {
       handlerMenu(event);
     }

     if ((target.tagName === 'A' && target.closest('menu')) || target.closest('a') && target.closest('main')) {
       scrollMenuItems(event);

     }
     if (!menu.contains(target) && !menuBtn.contains(target)) {
       menu.classList.remove('active-menu');
     }
   });
 }

 export default toggleMenu;