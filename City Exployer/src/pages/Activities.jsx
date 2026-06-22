import { useEffect, useState } from "react";
import api from "../shared/axios";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);   

    useEffect(() => {

        const fetchActivities = async () => {
            
            try {

                const { data } = await api.get("/city_exployer_api.php/activities.json");
                
                setActivities(data.activities || []);

            } catch (err) {
                setError(err.message || "Failed to load activities");
            } finally {
                setLoading(false);
            }

        };

        fetchActivities();

    }, []);

    if (loading) {
        return (
        <main className="page">
            <section className="activities">
                <p className="loading">Loading...</p>
            </section>
        </main>
        );
    }

    if (error) {
        return (
        <main className="page">
            <section className="activities">
                <p className="error">{error}</p>
            </section>
        </main>
        );
    }

    return (
        <main className="page">
            <section className="activities">
                <h2>Activities</h2>
                <div className="activities-cards">
                    {activities.map((activity) => (
                        <div className="activity-card" key={activity.title}>
                            <img src={activity.image} alt={activity.title} />
                            <div>
                                <span className="card-label">Event</span>
                                <h3>{activity.title}</h3>
                                <p>{activity.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Activities;
