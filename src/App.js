import './App.css';
import { useState, useEffect } from 'react'

function App() {


  const [input, setInput] = useState("")
  const [city, setCity] = useState("Cairo")
  const [weatherDetails, setWeatherDetails] = useState("false")


  useEffect(() => {

    fetch(`http://api.weatherstack.com/current?access_key=d4044d1ab984a734a344928609710bc3&query=${city}`)
      .then(res => res.json())
      .then(data => data.success === false ? setWeatherDetails("false") : setWeatherDetails(data))

  }, [city])

  function handleChange(e) {
    setInput(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setCity(input)
  }

  console.log(weatherDetails);

  return (

    weatherDetails &&

      weatherDetails === "false" ?

      <form onSubmit={handleSubmit}>
        <div className='card-wrapp'>
          <div className='card'>
            <div className='card-img'>
              <img src='https://images.unsplash.com/photo-1531923981709-9fd5eb67572c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwc2t5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'></img>
              <div className='img-details'>
              </div>
            </div>
            <div className='card-details'>
              <div className="search">
                <input onChange={handleChange} placeholder='Search city...'></input>
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
              <div className='weather-details'>
                <h2 style={{ color: "red" }}>Error: city not found! <br /><span style={{fontSize:"23px"}}>please enter a valid city name</span></h2>
              </div>
            </div>
          </div>
        </div>
      </form>

      :

      <form onSubmit={handleSubmit}>
        <div className='card-wrapp'>
          <div className='card'>
            <div className='card-img'>
              <img src='https://images.unsplash.com/photo-1531923981709-9fd5eb67572c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwc2t5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'></img>
              <div className='img-details'>
                <p> <span id='degree'>{weatherDetails.current.temperature}°</span> {weatherDetails.location.name}</p>
              </div>
            </div>
            <div className='card-details'>
              <div className="search">
                <input onChange={handleChange} placeholder='Search city...'></input>
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
              <div className='weather-details'>
                <h2>Weather details</h2>
                <p>Wind speed: <span>{weatherDetails.current.wind_speed} Km/h</span> </p>
                <p>Humidty: <span>{weatherDetails.current.humidity} %</span></p>
                <p>Pressure: <span>{weatherDetails.current.pressure} ps/m</span></p>
                <p>Visibility: <span>{weatherDetails.current.visibility} m</span></p>
              </div>
            </div>
          </div>
        </div>
      </form>
  );
}

export default App;
