import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Link , useLocation} from 'react-router-dom';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const { gameId } = useParams();

    const location = useLocation();
    const { gameNameToTransfer } = location.state;

    useEffect(() => {
        fetch(`http://localhost:8888/getReviews/${gameId}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(reviews => setReviews(reviews))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
        <h2>{gameNameToTransfer}'s reviews</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Critic</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {
                    reviews.map(item => (
                        <tr>
                            <td>{item.critic}</td>
                            <td>{item.score} / {item.maximumScore}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    )
}

export default Reviews