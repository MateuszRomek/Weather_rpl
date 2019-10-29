const hamburger = document.getElementById('hamburger');
const weatherCont = document.querySelector('.weatherContainer');
const form = document.querySelector('.city__form');
const getApi = (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=`
  const apiKey = '&appid=dda600049eb7762f904a895096988bb2';
  return fetch(`${url}${cityName}${apiKey}&count=5`)
  .then( response => response.json())
  .then( data => data )
  .catch(err => err)
}

hamburger.addEventListener('click', handleClickHamburger);
form.addEventListener('submit', submitCity);

function handleClickHamburger (){
  const cityChoose = document.querySelector('.city');
  const header = document.querySelector('.header');
  hamburger.classList.toggle('hamburger--active');
  header.classList.toggle('header--active');
  cityChoose.classList.toggle('city--active');
}

  function submitCity(e) {
    e.preventDefault();
    const inputVal = document.querySelector('.form__input').value.toLowerCase();
   
    getApi(inputVal).then( ({city, list}) => {
      weatherCont.classList.add('weather--active');

      const today = document.querySelector('.today__city');
      today.textContent = city.name;
      const todayTemp = document.querySelector('.today__temperature');
      todayTemp.firstChild.textContent = kelvinToCelc(list[0].main['temp_max']);
      const description = document.querySelector('.today__description');
      description.textContent = list[0].weather[0].description.toUpperCase();
    

      veryBadLoop(list);
    })
    handleClickHamburger();
    clearInput();
  }
    function veryBadLoop(res) {
      const dayTemperatures = document.querySelectorAll('.day__temperature');
      const dayNames = document.querySelectorAll('.day__name');
      let k = 5;
      let y = 5;
      
      dayTemperatures.forEach( day => {
        const {main} = res[k];
        day.firstChild.textContent = kelvinToCelc(main['temp_max']);
        k+=8;
      })

      dayNames.forEach( day => {
        day.textContent = displayDayName(res[y].dt_txt);
        y+=8;
      })     
    }

    function kelvinToCelc(kelvin) {
      return Math.floor(kelvin - 273.15);
    }

    function displayDayName(rawText) {
      const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const d = new Date(rawText);
      return days[d.getDay()];
    }
    function clearInput() {
      const inputV = document.querySelector('.form__input');
      inputV.value = '';
    }

    //current Date
  (function(){
    const currentDate = Date.now()
    const date = new Date(currentDate);
    const dayName = displayDayName(date);
    const displayDate = document.querySelector('[data-date]');
    displayDate.textContent = `${dayName}, ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}  `
    const displayTime = document.querySelector('[data-time]');
    displayTime.textContent = `${date.toString().slice(15,21)}`;
  })()