import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './weather';
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

   useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

      useEffect(() => {  
    fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=d80a3f79d367cf248ff64ed67a7ba0ef`)
      .then((res) => res.json())
      .then((result) => {
      setData(result);
      console.log(result);
    });
  }, [lat, long]);

  return (
      <div className="App">
        {(typeof data.main != 'undefined') ? (
          <Weather weatherData={data}/>
        ): (
          <div>
            <Dimmer active>
              <Loader>Loading..</Loader>
            </Dimmer>
         </div>
       )}
   </div>
  );
}

export default App;