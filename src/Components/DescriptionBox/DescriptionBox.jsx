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

  const [canReview, setCanReview] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  // Check if user can review
  useEffect(() => {
    const checkCanReview = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you saved it
        const res = await axios.get(`http://localhost:8081/api/products/${productId}/can-review`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCanReview(res.data.canReview);
      } catch (err) {
        console.error('Error checking review eligibility:', err.message);
      }
    };

    if (productId) {
      checkCanReview();
    }
  }, [productId]);

  // Handle submit review
  const handleSubmitReview = async () => {
    if (newRating === 0 || newReview.trim() === "") {
      alert("Please provide both a rating and a review text.");
      return; 
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8081/api/products/${productId}/reviews`, 
        {
          rating: newRating,
          reviewText: newReview
        }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Review submitted!');
      setNewReview('');
      setNewRating(0);

      // 🟰 Refresh the reviews after submitting
      fetchReviews();
    } catch (err) {
      console.error('Error submitting review:', err.message);
      alert('Failed to submit review.');
    }
  };


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

  useEffect(() => {
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
      {canReview && (
        <div className="submit-review">
          <h3 className="descriptionbox-nav-box review">Write a Review</h3>
          <select value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))}>
            <option value={0}>Select Rating</option>
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num} Star{num > 1 && 's'}</option>
            ))}
          </select>
          <textarea 
            value={newReview} 
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review..."
          />
          <button onClick={handleSubmitReview}>Submit Review</button>
        </div>
      )}

    </div>
  );
};

export default DescriptionBox;

