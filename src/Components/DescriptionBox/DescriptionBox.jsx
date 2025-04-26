import React, { useState, useEffect } from "react";
import './DescriptionBox.css';
import axios from "axios";
import { useParams } from "react-router-dom";

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [productDescription, setProductDescription] = useState("");
  const [loadingProduct, setLoadingProduct] = useState(true);

  const { productId } = useParams();

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

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/products/${productId}/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error('Error fetching reviews:', err.message);
      } finally {
        setLoadingReviews(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/products/${productId}`);
        setProductDescription(res.data.Description);
      } catch (err) {
        console.error('Error fetching product description:', err.message);
      } finally {
        setLoadingProduct(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

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

      {/* Description Tab */}
      {activeTab === "description" && (
        <div className="descriptionbox-description">
          {loadingProduct ? (
            <p>Loading description...</p>
          ) : productDescription ? (
            <p>{productDescription}</p>
          ) : (
            <p>No description available for this product.</p>
          )}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="descriptionbox-reviews">
          {loadingReviews ? (
            <p>Loading reviews...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <StarRating rating={review.Rating} />
                <p><strong>{review.First_Name} {review.Last_Name}</strong> - {review.Review_Text}</p>
                <small>Posted on {new Date(review.Created_At).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;

