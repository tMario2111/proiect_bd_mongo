import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

function Videogames() {
    const [videogames, setVideogames] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch('http://localhost:8888/getVideogames', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(videogames => setVideogames(videogames))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (gameId) => {
        fetch(`http://localhost:8888/deleteVideogame/${gameId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setVideogames(videogames.filter(videogame => videogame._id !== gameId));
                }
            })
            .catch(error => console.error('Error deleting videogame:', error));
    };

    return (
        <div>
            <h2>My Videogames</h2>
            <Link to={`/addVideogame`}>
                <button type="button" className="btn btn-primary">Add videogame</button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Release date</th>
                        <th>Price</th>
                        <th>Reviews</th>
                        <th>Supported consoles</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {videogames.map(item => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.genre}</td>
                            <td>{new Date(item.releaseDate).toLocaleDateString("en-GB")}</td>
                            <td>{item.releasePrice.$numberDecimal.toString()}$</td>
                            <td><Link to={`/reviews/${item._id}`} state={{ gameNameToTransfer: item.name }}>
                                View reviews</Link></td>
                            <td><Link to={`/consoles/${item._id}`} state={{ gameNameToTransfer: item.name }}>
                                View supported consoles</Link></td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                <Link to={`/editVideogame/${item._id}`} state={{ videogameDataToEdit: item }}>
                                    <button className="btn btn-primary ml-2">Edit</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Videogames