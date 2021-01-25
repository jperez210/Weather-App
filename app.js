const api = {
    key: "eefc306f35c121cc977d10581db95625",
    base: "https://api.openweathermap.org/data/2.5/"  
}   

const search = document.querySelector(".search-bar");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value)
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=imperial&appid=${api.key}`)
    .then(response => {
        return response.json();
    }).then(displayData);
    
}

function displayData (response) {
    if (response.cod==="404" || search.value==="") {
        const message = document.querySelector('.message')
        message.classList.add('error');
        message.innerHTML = "Please enter a valid city.";
        setTimeout(() => message.remove(), 3000);
        search.value="";
    } else {
        const city = document.querySelector(".city");
        city.innerHTML = `${response.name}, ${response.sys.country}`;

        const now = new Date();
        const date = document.querySelector('.date');
        date.innerHTML = dateBuilder(now);
        
        const temp = document.querySelector(".temp");
        temp.innerHTML=`Temp: ${Math.round(response.main.temp)+ '°f'}`;

        const humid = document.querySelector(".humidity")
        humid.innerText =`Humidity: ${response.main.humidity}`+"%";

        const descprit = document.querySelector(".description");
        descprit.innerHTML = `${response.weather[0].main}`;

        const speed = document.querySelector('.wind');
        speed.innerHTML = `Wind Speed: ${response.wind.speed +'p/h'}`;

        const weatherIcon = document.querySelector(".icon");
        const iconUrl = "http://openweathermap.org/img/w/";
        weatherIcon.src= iconUrl+response.weather[0].icon+".png";

        search.value = "";
    }
}

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
    getData();
    }
});

const now = new Date();
const date = document.querySelector('.date');
date.innerHTML = dateBuilder(now);
    
function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${month} ${date}, ${year}`;
  
}



/*    }else{
    message.classList.add('error');
    message.innerHTML = "Browser not supported.";
    setTimeout(() => message.remove(), 3000);
}

const image= document.querySelector(.)
image.setAtttibute(src, img/night)

*/