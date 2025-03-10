import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "Not Provided";

    return (
        <div>
            <h1>Subscription Successful</h1>
            <p>Thank you for subscribing! We've sent a confirmation to {email}.</p>
            <button onClick={() => navigate("/")}>Go Back</button>
        </div>
    );
};

export default Confirmation;