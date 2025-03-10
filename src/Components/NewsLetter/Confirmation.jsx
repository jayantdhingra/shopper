import { useLocation, useNavigate } from "react-router-dom";
import "./Confirmation.css";

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "Not Provided";

    return (
        <div className="confirmation-container">
            <h1 className="confirmation-title">Subscription Successful</h1>
            <p className="confirmation-message">Thank you for subscribing! We've sent a confirmation to <span className="email">{email}</span>.</p>
            <button className="back-button" onClick={() => navigate("/")}>Go Back</button>
        </div>
    );
};

export default Confirmation;
