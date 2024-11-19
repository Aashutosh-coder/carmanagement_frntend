import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure react-router is used for navigation
import "./CarCard.css";

const CarCard = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // For navigation to the ShowCar component

    // Fetch cars from the API
    const fetchCars = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('User not authenticated');

            const response = await fetch('https://car-management-backend-3g6n.onrender.com/cars/user-cars', {
                method: 'GET',
                headers: {
                    Authorization: ` ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cars');
            }

            const data = await response.json();
            setCars(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete car by ID
    const deleteCar = async (carId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('User not authenticated');

            const response = await fetch(`https://car-management-backend-3g6n.onrender.com/cars/delete/${carId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: ` ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete car');
            }

            // Remove the deleted car from the state
            setCars(cars.filter((car) => car._id !== carId));
            alert('Car deleted successfully!');
        } catch (error) {
            alert('Error deleting car: ' + error.message);
        }
    };

    // Fetch cars when the component mounts
    useEffect(() => {
        fetchCars();
    }, []);

    // Loading state
    if (loading) return <div>Loading...</div>;

    // Error state
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="car-list">
            {/* Show a message when no cars are present */}
            {cars.length === 0 ? (
                <div className="no-cars">
                    <h2> No Cars </h2>
                </div>
            ) : (
                
                cars.map((car) => (
                    <div className="car-card" key={car._id}>
                        <h3 className="car-title">{car.title}</h3>
                        <p className="car-description">{car.description}</p>
                        <div className="car-tags">
                            {car.tags.map((tag, index) => (
                                <span className="car-tag" key={index}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="car-actions">
                            <button
                                className="btn-delete"
                                onClick={() => deleteCar(car._id)}
                            >
                                Delete
                            </button>
                            <button
                                className="btn-view"
                                onClick={() => navigate(`/car/${car._id}`)} // Use car's ID for navigation
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))
            )}
            <p>Refresh for New Added cars </p>
        </div>
    );
};

export default CarCard;
