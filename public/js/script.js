const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.navbar__menu');

menuToggle.addEventListener('click', () => {
    menuList.classList.toggle('active');
});