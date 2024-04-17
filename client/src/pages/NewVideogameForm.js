import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';

function NewVideogameForm() {
    const [videogameName, setVideogameName] = useState('');
    const [videogameReleaseDate, setVideogameReleaseDate] = useState('');
    const [videogameGenre, setVideogameGenre] = useState('');
    const [videogamePrice, setVideogamePrice] = useState('');

    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Send a POST request to your backend API endpoint to add the new player
        fetch('http://localhost:8888/addVideogame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: videogameName,
                releaseDate: videogameReleaseDate,
                genre: videogameGenre,
                price: videogamePrice,
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Videogame added successfully');
                window.history.back();
            } else {
                console.error('Failed to add videogame');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h2>Add Player</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="videogameName" className="form-label">Videogame name</label>
                    <input type="text" className="form-control" id="videogameName" value={videogameName} onChange={(e) => setVideogameName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="videogameReleaseDate" className="form-label">Videogame release date</label>
                    <input type="text" className="form-control" id="videogameReleaseDate" value={videogameReleaseDate} onChange={(e) => setVideogameReleaseDate(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="videogameGenre" className="form-label">Videogame genre</label>
                    <input type="text" className="form-control" id="videogameGenre" value={videogameGenre} onChange={(e) => setVideogameGenre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="videogamePrice" className="form-label">Videogame price</label>
                    <input type="text" className="form-control" id="videogamePrice" value={videogamePrice} onChange={(e) => setVideogamePrice(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default NewVideogameForm;