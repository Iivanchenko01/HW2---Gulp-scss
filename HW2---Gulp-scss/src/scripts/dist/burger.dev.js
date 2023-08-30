"use strict";

var burgerBtn = document.querySelector('.burger_btn');
var menu = document.querySelector('.menu_list');
burgerBtn.addEventListener('click', function () {
  menu.classList.toggle('active');
  burgerBtn.classList.toggle('active');
});