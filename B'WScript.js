

var latitude;
var longitude;
const button = document.querySelector('.btn');
const input = document.querySelector('.inputBox');
const apiKey = 'f9fb1a69e0edf0af34470979749a1261';
const apiurl1 ='https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';
const apiurl ='https://api.openweathermap.org/data/2.5/weather?';
var city = document.getElementById('showTemp');
var cityName = document.querySelector('.city');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var weatherIcon = document.querySelector('.wicon');
const atomspace = document.querySelector('.atmospheric');
const error1 = document.querySelector('.error');
const show1 = document.querySelector('.show');
const sunrise = document.querySelector('.sunrisespan');
const sunset = document.querySelector('.sunsetspan');


    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
       console.log("Latitude: " + latitude + " Longitude: " + longitude);
     }
 //-----------Time Conversion-----------------
 function timeCoversion(t1){
  let date1 = new Date(t1*1000);
  return `${date1.getHours()}:${date1.getMinutes()}:${date1.getSeconds()}`;
}

//--------------Change The Wether Icon Based on Weather Condition---------------------
  function changeImage(icon){
      if(icon == 'Clouds'){
        weatherIcon.src = "S:/Prodigy/Task5/Img/clouds.png";
       }else if(icon == 'Clear'){
        weatherIcon.src = 'S:/Prodigy/Task5/Img/clear.png'
      }else if(icon == 'Rain'){
        weatherIcon.src = 'S:/Prodigy/Task5/Img/rain.png'
      }else if(icon == 'Drizzle'){
        weatherIcon.src = 'S:/Prodigy/Task5/Img/drizzle.png'
      }else if(icon == 'Mist'){
        weatherIcon.src = 'S:/Prodigy/Task5/Img/mist.png'
      }
  }
  function otherInfo(data){
    sunrise.innerText = timeCoversion(data.sys.sunrise);
    sunset.innerText = timeCoversion(data.sys.sunset);
    city.innerText = Math.round(data.main.temp)+`°C`;
    cityName.innerText=data.name;
    wind.innerText = data.wind.speed+'km/h';
    humidity.innerText =data.main.humidity+'%';
    atomspace.innerText = data.weather[0].description;
    document.querySelector('.maxTempspan').innerText = Math.round(data.main.temp_max)+`°C`;
    document.querySelector('.minTempspan').innerText = Math.round(data.main.temp_min)+`°C`;
  }

 

  async function weather1(latitude,longitude){
       
      const response = await fetch(apiurl+`lat=${latitude}&lon=${longitude}`+`&appid=${apiKey}&units=metric`);
      if(response.status == 404){
        error1.style.display = "block";
        show1.style.display = "none";
         
      }else{
        error1.style.display = "none";
        show1.style.display = "block";
        var data = await response.json();
        console.log(data);
        otherInfo(data)
        changeImage(data.weather[0].main);
        
    }
  }

    async function weather(city){
      const response = await fetch(apiurl+`q=${city}`+`&appid=${apiKey}&units=metric`);
      if(response.status == 404){
          error1.style.display = "block";
         show1.style.display = "none";
      }else{
        error1.style.display = "none";
        show1.style.display = "block";
        var data = await response.json();;
        console.log(data);
        otherInfo(data);
        changeImage(data.weather[0].main);
         
      }
    }
    
    button.addEventListener('click',()=>{
        if(input.value==""){
            weather1(latitude,longitude);
        }else{
            weather(input.value.toLowerCase()); 
        }
    });
  
    if (navigator.geolocation) {
        const loc =navigator.geolocation.getCurrentPosition(showPosition, showError);
        console.log(loc)
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
      function showError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
    }
     
    




