import React from 'react'
import './CSS/MyOrders.css'

const ordersData = [
  { id: 1, product: 'Cozy Fleece Zip-Up Hoodie', quantity: 1, price: 1200 },
  { id: 2, product: 'Waterproof Rain Jacket with Hood', quantity: 2, price: 600 },
  { id: 3, product: 'Adventure Time Cargo Shorts', quantity: 1, price: 150 },
];

export const MyOrders = () => {
  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>${order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
