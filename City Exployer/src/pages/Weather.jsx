import { useState, useEffect } from "react";
import api from '../shared/axios';

const Weather = () => {

    const [weathers, setWeathers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchWeather = async () => {

            try {

                const { data } = await api.get("/city_exployer_api.php/weather.json");
                
                setWeathers(Array.isArray(data) ? data : data.weathers || []);
                
            } catch (err) {
                setError(err.message || "Failed to load weather")
            } finally {
                setLoading(false);
            };

        };

        fetchWeather();

    }, []);


    if (loading) {
        return (
            <main className="page">
                <section className="weather">
                    <p className="loading">Loading weather...</p>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page">
                <section className="weather">
                    <p className="error">{error}</p>
                </section>
            </main>
        );
    }

    return (
    
        <main className="page">

            <section className="weather">
                <h2>Weather</h2>

                <div className="weather-list">

                    {weathers.map((weather) => (
                        <div className="weather-card" key={weather.date}>

                            <div>
                                <span className="card-label">{weather.date}</span>
                                <h3>{weather.status}</h3>
                            </div>
                            <strong>{weather.temp}°C</strong>

                        </div>
                    ))}

                </div>

            </section>

        </main>

    );

};

export default Weather;
