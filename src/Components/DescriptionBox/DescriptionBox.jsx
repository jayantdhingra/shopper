import React, {useState} from "react";
import './DescriptionBox.css';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState("description");
  
  // Sample review data with ratings
  const reviews = [
    { text: "Lovely top. Must buy!!!", rating: 5 },
    { text: "The fabric is nice. But little expensive.", rating: 3}
  ];
  
  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? "star filled" : "star"}>
            ★
          </span>
        ))}
      </div>
    );
  };
  
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === "description" ? "" : "fade"}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box ${activeTab === "reviews" ? "" : "fade"}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviews.length})
        </div>
      </div>
      {activeTab === "description" && (
        <div className="descriptionbox-description">
          <p>This website streamlines key business processes, including inventory management,
            user transactions, secure payment processing, and order fulfillment.
            The system is designed to offer customers a seamless and engaging shopping experience,
            ensuring easy navigation, secure transactions, and quick order processing.</p>
          <p>E-commerce websites typically display products or services along with detailed
            descriptions, images, prices and outfit variations.</p>
        </div>
      )}
      {activeTab === "reviews" && (
        <div className="descriptionbox-reviews">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <StarRating rating={review.rating} />
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DescriptionBox;