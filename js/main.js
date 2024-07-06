const searchinput=document.getElementById(`searchinput`)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos){
      const lat= pos.coords.latitude;
       const long= pos.coords.longitude;
       console.log(lat);
       console.log(long);
       getWeatherData(`${lat},${long}`);

    }) 
    
}else{
    console.log("hello");
}

async function getWeatherData(hamada){
  let res= await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${hamada}&days=3&key=22225686f3e648a9905163546242506`)
  let finalres=await res.json()
  console.log(finalres);
  displayTodayWeather(finalres);
  displaytommorow(finalres)
  displayAfterTommorow(finalres)
}
searchinput.addEventListener('input',function (e) {
    getWeatherData(e.target.value)
})

function displayTodayWeather(finalres) {
    const todayDate =finalres.current.last_updated;
    let date = new Date(todayDate);
    const todayWeekDay=date.toLocaleString('en-us',{weekday:'long'});
    const todayDay =date.getDate()
    const todayMonth=date.toLocaleString('en-us',{month:'long'});
    const cityName=finalres.location.name;
    const todayDegree=finalres.current.temp_c;
    const todayCond=finalres.current.condition.text;
    const imageToday=finalres.current.condition.icon;
    const humidity=finalres.current.humidity;
    humiditytoday.innerHTML=humidity;
    imgToday.innerHTML=imageToday;
    todaycondtion.innerHTML=todayCond;
    tempToday.innerHTML=todayDegree;
    citytaday.innerHTML=cityName;
    todayweakday.innerHTML=todayWeekDay;
    dataToday.innerHTML=`${todayDay} ${todayMonth}`
    windSpeedToday.innerHTML=finalres.current.wind_kph;
    dirtoday.innerHTML=finalres.current.wind_dir;
    imgToday.setAttribute('src','https:'+finalres.current.condition.icon)
}
function displaytommorow({forecast}){
    tommorrowtoday.innerHTML= new Date(forecast.forecastday[1].date).toLocaleString('en-un',{weekday:'long'})
    iconTommorow.setAttribute('src','https:'+forecast.forecastday[1].day.condition.icon);
    tMaxtemp.innerHTML=forecast.forecastday[1].day.maxtemp_c;
    tMintemp.innerHTML=forecast.forecastday[1].day.mintemp_c;
}
function displayAfterTommorow({forecast}){
    Aftertommorrow.innerHTML= new Date(forecast.forecastday[2].date).toLocaleString('en-un',{weekday:'long'})
    iconAfterTom.setAttribute('src','https:'+forecast.forecastday[2].day.condition.icon);
    AftertommorowtMaxtemp.innerHTML=forecast.forecastday[2].day.maxtemp_c;
    AftertommorrowMinTemp.innerHTML=forecast.forecastday[2].day.mintemp_c;
    console.log("Hello");
}
