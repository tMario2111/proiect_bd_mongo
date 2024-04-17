import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Link , useLocation} from 'react-router-dom';

function Consoles() {
    const [consoles, setConsoles] = useState([]);
    const { gameId } = useParams();

    const location = useLocation();
    const { gameNameToTransfer } = location.state;

    useEffect(() => {
        fetch(`http://localhost:8888/getConsoles/${gameId}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(consoles => setConsoles(consoles))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>{gameNameToTransfer} supported consoles</h2>
            <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Manufacturer</th>
                </tr>
            </thead>
            <tbody>
                {
                    consoles.map(item => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.releasePrice.$numberDecimal.toString()}$</td>
                            <td>{item.manufacturer}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    );
}

export default Consoles;