import React, { useState } from 'react';
import './Dashboard.scss';
import AddFoodModal from './AddFoodModal';
import { useAuth } from '../hooks/useAuth';
import { logoutUser } from '../firebase/auth';
import { addFoodItem, getFoodsForUser, deleteFoodItem } from '../firebase/food';
import type { FoodData } from '../firebase/food';


const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [foodName, setFoodName] = useState('');

  const [foodList, setFoodList] = useState<FoodData[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Load foods from Firestore for the current user
  const loadFoods = async () => {
    if (!currentUser) return;
    try {
      const foods = await getFoodsForUser(currentUser.uid);
      setFoodList(foods);
    } catch (error) {
      setAddError('Failed to load foods.');
      console.error(error);
    }
  };

  React.useEffect(() => {
    loadFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);





  const addFood = async (foodObj?: Partial<FoodData>) => {
    setAddError('');
    setAddSuccess('');
    if (!currentUser) {
      setAddError('User not authenticated.');
      return;
    }
    // If called from modal, use foodObj; else fallback to foodName only
    let foodToAdd: Omit<FoodData, 'id' | 'createdAt'>;
    if (foodObj && typeof foodObj.name === 'string') {
      foodToAdd = {
        name: foodObj.name,
        category: foodObj.category ?? '',
        cuisine: foodObj.cuisine ?? '',
        price: foodObj.price ?? '',
        image: foodObj.image ?? '',
        userId: currentUser.uid
      };
    } else {
      foodToAdd = {
        name: foodName,
        category: '',
        cuisine: '',
        price: '',
        image: '',
        userId: currentUser.uid
      };
    }
    if (!foodToAdd.name) {
      setAddError('Please enter a food name.');
      return;
    }
    try {
      await addFoodItem(foodToAdd);
      setAddSuccess('Food added!');
      setFoodName('');
      loadFoods();
    } catch (error) {
      setAddError('Failed to add food.');
      console.error(error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteFoodItem(id);
      setFoodList((prev) => prev.filter((food) => food.id !== id));
    } catch (error) {
      setAddError('Failed to delete food.');
      console.error(error);
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
        <a href="/tastenorder/profile" className="profile-link">View Profile</a>
      </div>

      <div className="dashboard-content">
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Food List</h3>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              className={viewMode === 'grid' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setViewMode('grid')}
              title="Grid View"
              style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', background: viewMode === 'grid' ? '#e8f5e9' : '#fff', cursor: 'pointer' }}
            >
              &#9638; Grid
            </button>
            <button
              className={viewMode === 'list' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setViewMode('list')}
              title="List View"
              style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', background: viewMode === 'list' ? '#e3f2fd' : '#fff', cursor: 'pointer' }}
            >
              &#9776; List
            </button>
            <AddFoodModal
              foodName={foodName}
              setFoodName={setFoodName}
              addFood={addFood}
              addError={addError}
              addSuccess={addSuccess}
            />
          </div>
        </div>
        {addError && <div className="error-message">{addError}</div>}
        {addSuccess && <div className="success-message">{addSuccess}</div>}
        <div className="food-list">
          {foodList.length === 0 ? (
            <p>No food items available. Please add some!</p>
          ) : (
            <div className={`food-card-list ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}> 
              {foodList.map((food) => (
                <div className="food-card" key={food.id}>
                  <button
                    className="food-card-delete"
                    onClick={() => food.id && handleDelete(food.id)}
                    title="Delete"
                  >
                    &times;
                  </button>
                  <img
                    src={food.image || undefined}
                    alt={food.name}
                    className="food-card-image"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="100%25" height="100%25" fill="%23e0e0e0"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="%23777">No Image</text></svg>';
                    }}
                  />
                  <div className="food-card-details">
                    <h4 className="food-card-title">{food.name}</h4>
                  <div className="food-card-detail"><b>Category:</b> {food.category}</div>
                  <div className="food-card-detail"><b>Cuisine:</b> {food.cuisine}</div>
                  <div className="food-card-detail"><b>Price:</b> ${food.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
