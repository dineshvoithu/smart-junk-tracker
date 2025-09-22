import React, { useState } from "react";
import axios from "axios";
import {
  FaPizzaSlice,
  FaHamburger,
  FaUtensils,
  FaTimes,
  FaPlus,
  FaMinus,
  FaEdit,
} from "react-icons/fa";

const FoodModal = ({ food, isOpen, onClose, onSuccess }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/logs`, {
        userId: 1,
        quantity: quantity,
        junkFood: {
          id: food.id,
        },
      });

      // Pass the response back to parent
      onSuccess(response.data);

      // Reset and close
      setQuantity(1);
      onClose();
    } catch (error) {
      console.error("Error logging food:", error);
      alert("Failed to log food. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const getFoodIcon = (foodName) => {
    switch (foodName.toLowerCase()) {
      case "pizza":
        return <FaPizzaSlice className="text-3xl text-red-500" />;
      case "parotta":
        return <FaUtensils className="text-3xl text-yellow-600" />;
      case "burger":
        return <FaHamburger className="text-3xl text-yellow-700" />;
      default:
        return <FaUtensils className="text-3xl text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3">{getFoodIcon(food.name)}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Log {food.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {food.calories} calories each
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl p-1"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many did you eat?
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              >
                <FaMinus className="text-gray-600" />
              </button>
              <div className="text-center">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center text-2xl font-bold border-b-2 border-orange-300 focus:border-orange-500 outline-none"
                  min="1"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {quantity * food.calories} total calories
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              >
                <FaPlus className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Quick select:</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuantity(num)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    quantity === num
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <FaEdit className="mr-2" />
              {loading ? "Logging..." : "Log Food"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodModal;
