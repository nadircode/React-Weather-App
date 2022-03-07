import React, { useState } from 'react';
import './App.css';

function Weather(props){
    const {data} = props;
    const dateBuilder = (d) => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "June","July", "Aug", "Sepr", "Oct", "Nov", "Dec"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
      
        return `${day} ${date} ${month} ${year}`;
      }
    return (
         <>
        {(data.main && data.main.temp)
         ?( <>
         <div id="number"> {Math.floor(data.main.temp - 273.15)}° </div>
         <div id="city-date"> <p id="city"> {data.name}</p> 
         <p id="date">{dateBuilder(new Date())}</p>
         </div>
         <div id="icon-info">
           <img alt='icon' src={"http://openweathermap.org/img/w/"+ data.weather[0].icon + ".png"}></img>
           <h4 id="main">{data.weather[0].main}</h4>
         </div>
         </>)
         :(<div>Enter City and Country Information Clearly</div>)
        }
        </>
    );
}
export default Weather;