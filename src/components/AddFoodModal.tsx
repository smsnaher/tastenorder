import React, { useState } from 'react';
import './AddFoodModal.css';

interface AddFoodModalProps {
  foodName: string;
  setFoodName: (name: string) => void;
  addFood: (food?: any) => void;
  addError: string;
  addSuccess: string;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({
  foodName,
  setFoodName,
  addFood,
  addError,
  addSuccess,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const openModal = () => {
    setShowModal(true);
    setFoodName('');
    setCategory('');
    setCuisine('');
    setPrice('');
    setImage('');
  };

  const closeModal = () => {
    setShowModal(false);
    setFoodName('');
    setCategory('');
    setCuisine('');
    setPrice('');
    setImage('');
  };

  return (
    <>
      <button className="add-food-button" onClick={openModal}>+ New Food</button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            <h4>Add Food</h4>
            <form
              onSubmit={e => {
                e.preventDefault();
                addFood({
                  name: foodName,
                  category,
                  cuisine,
                  price,
                  image,
                });
                closeModal();
              }}
            >
              <input
                type="text"
                placeholder="Food name"
                className="search-bar modal-input"
                value={foodName}
                onChange={e => setFoodName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Category"
                className="search-bar modal-input"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Cuisine"
                className="search-bar modal-input"
                value={cuisine}
                onChange={e => setCuisine(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="search-bar modal-input"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className="search-bar modal-input"
                value={image}
                onChange={e => setImage(e.target.value)}
                required
              />
              <button
                className="add-food-button modal-save-btn"
                type="submit"
              >
                Save
              </button>
            </form>
            {addError && <div className="error-message">{addError}</div>}
            {addSuccess && <div className="success-message">{addSuccess}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default AddFoodModal;
