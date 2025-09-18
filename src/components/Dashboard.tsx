import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { logoutUser } from '../firebase/auth';

const Dashboard: React.FC = () => {
  const { currentUser, userData } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to your Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      
      <div className="user-info">
        <h2>User Information</h2>
        <div className="info-item">
          <strong>Email:</strong> {currentUser?.email}
        </div>
        {userData?.displayName && (
          <div className="info-item">
            <strong>Display Name:</strong> {userData.displayName}
          </div>
        )}
        <div className="info-item">
          <strong>User ID:</strong> {currentUser?.uid}
        </div>
        {userData?.createdAt && (
          <div className="info-item">
            <strong>Account Created:</strong> {userData.createdAt.toDate().toLocaleDateString()}
          </div>
        )}
      </div>
      
      <div className="dashboard-content">
        <h3>Food List</h3>
        <input type="text" placeholder="Search food..." className="search-bar" />
        <button className="add-food-button">Add New Food</button>
        <div className="food-list">
          {/* Placeholder for food items */}
          <p>No food items available. Please add some!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
