// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css"
import axios from "axios";

const AdminDashboard = () => {
    const [categories] = useState([
      { id: 1, name: "Men" },
      { id: 2, name: "Women" },
      { id: 3, name: "Kids" },
    ]);
  
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sellers, setSellers] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState("");
    const [newSeller, setNewSeller] = useState({
      User_ID: 1,
      Store_Name: "",
      Store_Description: "",
      Contact_Number: "",
      Rating: "",
    });
  
    const [product, setProduct] = useState({
      Name: "",
      Description: "",
      Price: "",
      Stock_Quantity: "",
      Rating: "",
      Size: "",
      Color: "",
      AI_Tagging: "",
    });
  
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadColor, setUploadColor] = useState("");
    const [createdProductId, setCreatedProductId] = useState(null);
  
    useEffect(() => {
      fetchSellers();
    }, []);
  
    const fetchSellers = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/sellers");
        setSellers(res.data);
      } catch (err) {
        console.error("Error fetching sellers", err);
      }
    };
  
    const handleAddSeller = async () => {
      try {
        const res = await axios.post("http://localhost:8081/api/sellers", newSeller);
        alert("Seller added successfully!");
        setNewSeller({ User_ID: 1, Store_Name: "", Store_Description: "", Contact_Number: "", Rating: "" });
        fetchSellers();
      } catch (err) {
        console.error("Error adding seller", err);
      }
    };
  
    const handleProductChange = (e) => {
      setProduct({ ...product, [e.target.name]: e.target.value });
    };
  
    const handleAddProduct = async () => {
      try {
        const payload = {
          ...product,
          AI_Tagging: JSON.stringify({ tags: product.AI_Tagging.split(",") }),
          Category_ID: selectedCategory,
          Seller_ID: selectedSeller,
          Price: parseFloat(product.Price),
          Rating: parseFloat(product.Rating),
          Stock_Quantity: parseInt(product.Stock_Quantity),
        };
  
        const res = await axios.post("http://localhost:8081/api/products", payload);
        setCreatedProductId(res.data.Product_ID || res.data.productId);
        alert("Product added successfully!");
      } catch (err) {
        console.error("Error adding product", err);
      }
    };
  
    const handleImageUpload = async () => {
      try {
        const formData = new FormData();
        formData.append("Product_ID", createdProductId);
        formData.append("Color", uploadColor);
        formData.append("image", uploadedImage);
  
        await axios.post("http://localhost:8081/api/products/upload-image", formData);
        alert("Image uploaded successfully!");
      } catch (err) {
        console.error("Error uploading image", err);
      }
    };
  
    return (
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
  
        <div className="admin-card">
          <h3>Select Category</h3>
          <div className="select-row">
            <label>Select Category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">-- Select --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
  
        <div className="admin-card">
          <h3>Select/Add Seller</h3>
          <div className="select-row">
            <label>Select Seller:</label>
            <select value={selectedSeller} onChange={(e) => setSelectedSeller(e.target.value)}>
              <option value="">-- Select --</option>
              {sellers.map((seller) => (
                <option key={seller.Seller_ID} value={seller.Seller_ID}>{seller.Store_Name}</option>
              ))}
            </select>
            <button onClick={handleAddSeller}>Add New Seller</button>
          </div>
        </div>
  
        <div className="admin-card">
          <h3>Add Product</h3>
          <div className="product-form">
            <input name="Name" placeholder="Product Name" onChange={handleProductChange} />
            <input name="Description" placeholder="Description" onChange={handleProductChange} />
            <input name="Price" placeholder="Price" onChange={handleProductChange} />
            <input name="Stock_Quantity" placeholder="Stock Quantity" onChange={handleProductChange} />
            <input name="Rating" placeholder="Rating" onChange={handleProductChange} />
            <input name="Size" placeholder="Sizes (comma separated)" onChange={handleProductChange} />
            <input name="Color" placeholder="Colors (comma separated)" onChange={handleProductChange} />
            <input name="AI_Tagging" placeholder="Tags (comma separated)" onChange={handleProductChange} />
            <button className="submit-button" onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
  
        {createdProductId && (
          <div className="admin-card">
            <h3>Upload Product Image</h3>
            <div className="upload-section">
              <input type="text" placeholder="Color" value={uploadColor} onChange={(e) => setUploadColor(e.target.value)} />
              <input type="file" onChange={(e) => setUploadedImage(e.target.files[0])} />
              <button onClick={handleImageUpload}>Upload Image</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default AdminDashboard;
