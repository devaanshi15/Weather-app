 const apikey = "77f8a58e3038fae86c5db4ee7b85d061";

 const weatherDataEl = document.getElementById("weather-data")
 //target all the document, using a function/method get and in brackets use the id from html we used
 //now we have access to elemnt "weather-data"

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

// the following gonna trigger a function when the form is submitted
//event- whatever inside the form submission happpened we get the data here using event
formEl.addEventListener("submit",(event)=>
{
    event.preventDefault(); //not refreshing the page 
    const cityValue = cityInputEl.value;    //we got the input enter city from the user and now will save it in the console log
    console.log(cityValue);    //we got access to the info of input

    //now we can use this input (cityValue) -> pass it to a function -> fetch the data from api
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue)
{
    //fetching data from the api - best way use try and catch method
    //it asks info from api, if correct request - its going to get data
    //if data dosent come in any situation we can understand it by catching the error
    try 
    {
        //to create a request to open weather api to get weather data
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        //await- wait until the response comes and then goes to the next line and dosent prevent the code to read the next line
        //based on the dynamic request of the city we need a back tick ` to write down a dynamic url 
        
        //cod: 200-ok, 401-error
        if(!response.ok)
        {
            throw new Error("Network response was not ok")  //show in console log
        }

        const data = await response.json()  //covert response to data
        //console.log(data)   //get the data and show it

        
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`
        //get the element                   change the html code inside the element
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}℃`
        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = details.map( (detail) => `<div>${detail}</div>`).join("");
   
    } catch (error) 
    {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "ERROR! Please try again";
        weatherDataEl.querySelector(".details").innerHTML = "";
        
    }

}