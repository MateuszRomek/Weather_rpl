const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', handleClickHamburger)



function handleClickHamburger (){
  const cityChoose = document.querySelector('.city');
  hamburger.classList.toggle('hamburger--active');
  const header = document.querySelector('.header');
  header.classList.toggle('header--active');
  cityChoose.classList.toggle('city--active');
}