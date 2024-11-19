import React, { useState } from 'react';

import './AddCardData.css'; // Create a CSS file for styling  

const AddCarData = ({ onCarAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 10) {
            setError('You can upload up to 10 images only.');
            return;
        }
        setImages(files);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!title || !description || !tags || images.length === 0) {
            setError('All fields are required.');
            return;
        }
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
    
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://car-management-backend-3g6n.onrender.com/cars/add', {
                method: 'POST',
                headers: {
                    Authorization: `${token}`,
                },
                body: formData,
            });
        
            if (response.ok) {
                const newCar = await response.json();
                console.log("New car added:", newCar); // Debug
                setSuccess('Car added successfully!');
                onCarAdded(); // Trigger parent fetch
            } else {
                setError('Failed to add car.');
            }
        } catch (error) {
            console.error('Add car error:', error);
        }
        
    };

    return (
        <div className="add-car-container">
            <h2>Add a New Car</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter car title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter car description"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="tags">Tags (comma-separated)</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g. SUV, Automatic, Electric"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images">Upload Images (Max 10)</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                    <p className="info-text">You can upload up to 10 images.</p>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <button type="submit" className="submit-btn">Add Car</button>
            </form>
        </div>
    );
};

export default AddCarData;

