const burgerBtn = document.querySelector('.burger_btn');
const menu = document.querySelector('.menu_list');

burgerBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
  burgerBtn.classList.toggle('active');
});
