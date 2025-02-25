import React from "react";
import './DescriptionBox.css';

const DescriptionBox = () => {
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p> This website streamlines key business
                    processes, including inventory management, user transactions, secure payment processing,
                    and order fulfillment. The system is designed to offer customers a seamless and engaging
                    shopping experience, ensuring easy navigation, secure transactions, and quick order
                    processing.</p>
                    <p>E-commerce websites typically display products or services along with detailed descriptions.images,prices and outfit variations.</p>
            </div>
        </div>
    )
}

export default DescriptionBox;