
// src/components/RequestList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Import the RequestForm component
import RequestForm from './RequestForm'; 
import './RequestList.css';

const RequestList = () => {
	const [requests, setRequests] = useState([]);

	const fetchRequests = async () => {
		try {
			const response = 
				await axios.get('http://localhost:4000/requests');
			setRequests(response.data);
		} catch (error) {
			console.error('Error fetching requests:', error);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	const handleLike = async (id) => {
		try {
			await 
				axios.patch(`
http://localhost:4000/requests/${id}/like
				`);
			// Refresh the list of requests after liking
			fetchRequests();
		} catch (error) {
			console.error('Error liking request:', error);
		}
	};

	return (
		<div className="request-list-container">
			<RequestForm onAddRequest={
				(newRequest) =>
					setRequests([newRequest, ...requests])
			} />
			<ul className="request-list">
				{requests.map((request) => (
					<div key={request._id}
						className="request-item">
						<p className="resident-name">
							{request.residentName}
						</p>
						<p className="request-content">
							{request.content}
						</p>
						<p className="likes">
							Likes: {request.likes}
						</p>
						<button className="like-button"
							onClick=
							{
								() => handleLike(request._id)
							}>
							Like
						</button>
					</div>
				))}
			</ul>
		</div>
	);
};

export default RequestList;
