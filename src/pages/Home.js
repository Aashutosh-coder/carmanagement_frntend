import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import AddCarData from './AddCarData';
import './Home.css';
import CarCard from './CarCard';



import { useEffect } from 'react';

function Home() {
    const navigate = useNavigate();
    const [showAddCarForm, setShowAddCarForm] = useState(false);
    const [cars, setCars] = useState([]);

    // Fetch cars from the server
    const fetchCars = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Fetching cars..."); // Debug
            const response = await fetch('https://car-management-backend-3g6n.onrender.com/cars', {
                headers: {
                    Authorization: `${token}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched cars:", data); // Debug
                setCars(data);
            } else {
                console.error('Failed to fetch cars.');
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    useEffect(() => {
        fetchCars(); // Fetch cars when the component mounts
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => navigate('/login'), 1000);
    };

    // Fetch cars again after a new car is added
    const handleCarAdded = () => {
        fetchCars();
    };

    return (
        <div>
            {/* Navbar */}
            <div className="parent-nav">
                <div className="left">
                    <img
                        className="nav-logo"
                        src="https://bl-i.thgim.com/public/incoming/32t9i4/article65313925.ece/alternates/FREE_1200/Spyne%20Black%20png.png"
                        alt="Spyne Cars"
                    />
                    <button
                        className="add-car-btn"
                        onClick={() => setShowAddCarForm(true)}
                    >
                        Add Cars
                    </button>
            <Link to= "/apidocs">
                    <button
                        className="add-car-btn"
                        
                        >
                        Api Docs
                    </button>
                        </Link>
                </div>
                <button className="right" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {showAddCarForm && (
                <div className="overlay">
                    <div className="overlay-content">
                        <AddCarData
                            onCarAdded={handleCarAdded} // Trigger fetch on car addition
                        />
                        <button
                            className="close-overlay-btn"
                            onClick={() => setShowAddCarForm(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <CarCard cars={cars} setCars={setCars} /> {/* Pass shared state */}

            <ToastContainer />
        </div>
    );
}

export default Home;

