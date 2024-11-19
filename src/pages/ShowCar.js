import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ShowCar.css";

const ShowCar = () => {
    const { id } = useParams(); // Get car ID from route parameters
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('User not authenticated');

                const response = await fetch(`http://localhost:8080/cars/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch car details');
                }

                const data = await response.json();
                setCar(data);
                setFormData({
                    title: data.title,
                    description: data.description,
                    tags: data.tags.join(', '), // Convert array to a string
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]); // Fetch car data when component mounts

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagsChange = (e) => {
        setFormData({ ...formData, tags: e.target.value });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('User not authenticated');

            const response = await fetch(`https://car-management-backend-3g6n.onrender.com/cars/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map((tag) => tag.trim()), // Convert tags back to array
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update car details');
            }

            const updatedCar = await response.json();
            setCar(updatedCar);
            setIsEditing(false); // Exit edit mode
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!car) return <div>No car found</div>;

    return (
        <div className="show-car">
            <h1>{isEditing ? 'Edit Car Details' : car.title}</h1>
            {isEditing ? (
                <div className="edit-car">
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Tags:</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={handleTagsChange}
                            placeholder="Enter tags separated by commas"
                        />
                    </div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="car-details">
                    {/* <h2>{car.title}</h2>  */}
                    <p>{car.description}</p>
                    <div className="car-tags">
                        {car.tags.map((tag, index) => (
                            <span key={index} className="car-tag">{tag}</span>
                        ))}
                    </div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}

            <div className="car-images">
              
                {car.images && car.images.length > 0 ? (
                    car.images.map((image, index) => (
                        <img
                            key={index}
                            src={`https://car-management-backend-3g6n.onrender.com/${image}`}
                            alt={`Car ${index + 1}`}
                            style={{ width: '100%', maxWidth: '300px', marginBottom: '10px' }}
                        />
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
        </div>
    );
};

export default ShowCar;
