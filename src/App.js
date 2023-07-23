import React, { useState } from 'react';
import axios from 'axios';
import LoopedAudio from './LoopedAudio';


function App() {

	const [data, setData] = useState({})
	const [location, setLocation] = useState('');


	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=standard&appid=b60bcea5e7b054d4f9b146e83a496766`

	const searchLocation = (event) => {
		if (event.key === 'Enter') {
			axios.get(url).then((response) => {
				setData(response.data)
				console.log(response.data)
			})
			setLocation('')
		}

	}

	return (

		<div>
			<LoopedAudio />
			<div className="app">

				<div className="search">
					<input
						value={location}
						onChange={event => setLocation(event.target.value)}
						onKeyDown={searchLocation}
						placeholder='Enter Location'
						type='text' />
				</div>

				<div className="container">

					<div className="top">

						<div className='location'>
							<h2>{data.name}</h2>
						</div>

						<div className="temp">
							{data.main ? <h1> {(data.main.temp - 273.15).toFixed()}°C</h1> : null}
						</div>

						<div className="Description">
							{data.weather ? <p> {data.weather[0].main}</p> : null}
						</div>

					</div>

					{data.name != undefined &&

						<div className="bottom">

							<div className="feels Like">
								{data.main ? <p className='bold'> {(data.main.feels_like - 273.15).toFixed()}°C</p> : null}
								<p>Feels like</p>
							</div>

							<div className="humidity">
								{data.main ? <p className='bold'> {data.main.humidity}%</p> : null}
								<p>Humidity</p>
							</div>

							<div className="wind">
								{data.main ? <p className='bold'> {(data.wind.speed * 1.6).toFixed(2)} Km/Hr</p> : null}
								<p>Wind Speed</p>
							</div>

						</div>}

				</div>

			</div>

		</div>

	);
}

export default App;
