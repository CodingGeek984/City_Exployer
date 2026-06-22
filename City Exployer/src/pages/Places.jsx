import { useState, useEffect } from "react";
import api from '../shared/axios';

const Places = () => {
    
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPlaces = async () => {

            try {

                const { data } = await api.get("/city_exployer_api.php/places.json");

                const items = Object.entries(data).map(([name, details]) => ({
                    name,
                    address: details.address,
                    rating: details.rating
                }));

                setPlaces(items);

            } catch (err) {
                setError(err.message || "Failed to load places");
            } finally {
                setLoading(false);
            }

        };

        fetchPlaces();

    }, []);

    if (loading) {
        return (
        <main className="page">
            <div className="places">
                <p className="loading">Loading places...</p>
            </div>
        </main>
        );
    }

    if (error) {
        return (
        <main className="page">
            <div className="places">
                <p className="error">{error}</p>
            </div>
        </main>
        );
    }

    return (
        <main className="page">
            <section className="places">
                <h2>Places</h2>
                <div className="places-container">
                    {places.map((place) => (
                        <div className="place-card" key={place.name}>
                            <div>
                                <span className="card-label">Place</span>
                                <h3>{place.name}</h3>
                                <p>{place.address}</p>
                            </div>
                            <strong>{place.rating}/5</strong>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Places;
