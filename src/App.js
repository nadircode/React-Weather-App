import React, { useState , useEffect, useRef} from 'react';
import Weather from './Weather.js';
import reactDom from 'react-dom';
import {Config , YOUR_SECRET_API_KEY} from './Config.js';

function App() {
  console.log(YOUR_SECRET_API_KEY);
  const key = YOUR_SECRET_API_KEY ;
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5    
        }}
    />
);
const [item, setItem] = useState([]);
const [form, setForm] = useState({
  city : "",
  country : ""
});

const city_input = useRef("");
const country_input = useRef("");

useEffect(()=>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${key}`)
 .then(res=>res.json())
 .then((result)=>{
   console.log(result);
   setItem(result);
 }
 )
},[form]);


const fetch_Data = ()=>{
  if(city_input.current.value == "" || country_input.current.value == ""){
    alert("You need to enter city and country information");
  }
  else {
    console.log("city : " + city_input.current.value);
    console.log("Country : " + country_input.current.value);
   setForm({...form , city : city_input.current.value ,  country : country_input.current.value});
   console.log(form.city);
   console.log(form.country);
  }
}
  return (
      <>
    <div className='container'>
        
      <div className="row">
        <div className='col-9 info'>
          <div className='weather-info'>
              <Weather data = {item}/>
          </div>
        </div> 
         
        <div className='col-3 search'>
          <div className='navbar'>
              <div className='item'>
                <div
                 className='input' 
                  onKeyPress={(e)=>{
                    if(e.key=="Enter") {fetch_Data()}
                  }}
                >
                  
                  <input 
                  ref={city_input}
                  type="text"
                  placeholder="City" 
                  />

                  <input 
                  ref={country_input}
                  type="text"
                  placeholder="Country"                  
                  />
                  <button 
                  className="submit-btn"
                  onClick={fetch_Data}
                  >
                    Search
                  </button>
                  
                </div>
                  <hr color = "white" />
                  <div className='weather-details'>
                      <h4>Weather details</h4>
                      <div className='w-details'>
                          <div className='c1'>        
                          <p>Cloudy</p>
                          <p>Humidity</p>
                          <p>Wind</p>
                          </div>
                          <div className='c2'> 
                          {(item.main && item.main.humidity)?
                          (<>
                           <p>{item.clouds.all}%</p>
                              <p>{item.main.humidity}%</p>
                              <p>{item.wind.speed}km/h</p>
                            </>)
                            : (<div></div>)
                          }
                          </div>
                      </div>
                  </div>
                
              </div>
          </div>

        </div>        

      </div>
      
    </div>
    </>
  );
  }

export default App;
