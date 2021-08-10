import React, { useState } from 'react';
import './App.css';
import NasaArticle from './components/NasaArticle';

function App():JSX.Element {
  const [response, setResponse] = useState({
    date: "",
    explanation: "",
    title: "",
    urlImage: ""
  })
  const getInfo= async (e: any) => {
    const helloNasa = await fetch("https://api.nasa.gov/planetary/apod?api_key=jul0aUOtht7gcAOrbZDt9QIkfubTIDkCdOqrseKh")
    const helloApp = await helloNasa.json()
    console.log(helloApp);
    setResponse({
      date: helloApp.date,
      explanation: helloApp.explanation,
      title: helloApp.title,
      urlImage: helloApp.url
    })
  }
  const getObjectsNearest = async (e: any) => {    
    const astheroid = await fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-02-10&end_date=2021-02-10&api_key=jul0aUOtht7gcAOrbZDt9QIkfubTIDkCdOqrseKh")
    const jsonastheroid = await astheroid.json()
    const { near_earth_objects } = jsonastheroid;
    // it seems there is a problem with the petition
    Object.entries(near_earth_objects).forEach((e: any) => 
    e[1].map((element: any, i: number) => <article key={i}>
          <h2>{element.name}</h2>
          <p>Absolute Magnitude: {element.absolute_magnitude_h}</p>
          {
            element.close_approach_data.map((fecha: any) => <p>
            Closest Date: {fecha.close_approach_data_full}
            Artronomical Distance: {fecha.miss_distance.astronomical}
            Relative Velocity: {fecha.relative_velocity.kilometers_per_hour}km/h
            </p>)
          }
          <p>DANGER TO OUR PLANET: {element.is_potentially_hazardous_asteroid ? "Exactly" : "Unfortunally, no"}</p>
          <p>Estimated Diameter: minimal:{element.estimated_diameter.kilometers.estimated_diameter_min} maxim:{element.estimated_diameter.kilometers.estimated_diameter_max}</p>
          <p>More info: {element.nasa_jpl_url}</p>
        </article>
      )
    );
  }
  
  return <div className="container">
    <button onClick={getInfo}>Click Here to get the Info</button>
    <button onClick={getObjectsNearest}>And click Here to get the nearest objects to the planet</button>
    <NasaArticle {...response}/>
  </div>
}

export default App;
