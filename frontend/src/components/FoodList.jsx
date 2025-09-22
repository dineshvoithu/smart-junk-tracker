import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodModal from "./FoodModal";
import WarningAlert from "./WarningAlert";
import {
  FaFire,
  FaUtensils,
  FaExclamationTriangle,
  FaLightbulb,
  FaCalendarAlt,
  FaCheckCircle,
  FaBullseye, // Changed from FaTarget
  FaPizzaSlice,
  FaHamburger,
  FaBolt,
} from "react-icons/fa";

const FoodList = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    fetchFoods();
    fetchTotalCalories();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/junkfoods`);
      setFoods(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching foods:", error);
      setLoading(false);
    }
  };

  const fetchTotalCalories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/logs/total-calories`
      );
      setTotalCalories(response.data.totalCalories || 0);
      setTotalItems(response.data.totalItems || 0);
    } catch (error) {
      console.error("Error fetching total calories:", error);
      // Keep default values (0) if API fails
    }
  };

  const getFoodIcon = (foodName) => {
    switch (foodName.toLowerCase()) {
      case "pizza":
        return <FaPizzaSlice className="text-5xl mb-3 text-red-500 mx-auto" />;
      case "parotta":
        return <FaUtensils className="text-5xl mb-3 text-yellow-600 mx-auto" />;
      case "burger":
        return (
          <FaHamburger className="text-5xl mb-3 text-yellow-700 mx-auto" />
        );
      default:
        return <FaUtensils className="text-5xl mb-3 text-gray-500 mx-auto" />;
    }
  };

  const getRiskStyle = (riskLevel) => {
    switch (riskLevel) {
      case "CRITICAL":
        return "bg-red-50 border border-red-200 text-red-800";
      case "HIGH":
        return "bg-orange-50 border border-orange-200 text-orange-800";
      default:
        return "bg-yellow-50 border border-yellow-200 text-yellow-800";
    }
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  const handleLogSuccess = (response) => {
    console.log("Log response:", response);

    // Refresh total calories after logging food
    fetchTotalCalories();

    // Show warning if exists
    if (response.warning) {
      setWarning(response.warning);
    } else {
      // Show success message
      alert("Food logged successfully! 🎉");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FaUtensils className="text-6xl mb-4 text-gray-400" />
        <div className="text-lg text-gray-600">
          Loading your food options...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Total Calories Display */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-8 max-w-2xl mx-auto">
        <div className="text-center">
          <FaFire className="text-4xl mb-2 text-orange-500 mx-auto" />
          <h3 className="text-2xl font-bold mb-2 text-gray-800">
            Your Total Intake
          </h3>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                {totalCalories}
              </div>
              <div className="text-sm text-gray-600">Total Calories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">
                {totalItems}
              </div>
              <div className="text-sm text-gray-600">Items Logged</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500 flex items-center justify-center">
            {totalCalories === 0 ? (
              <>
                <FaBullseye className="mr-2 text-blue-500" />
                Start logging your food to track calories!
              </>
            ) : totalCalories > 2000 ? (
              <>
                <FaExclamationTriangle className="mr-2 text-red-500" />
                Above recommended daily intake
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-2 text-green-500" />
                Keep tracking your progress!
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          What are you craving today?
        </h2>
        <p className="text-gray-600">
          Pick your guilty pleasure (but let's keep track!)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {foods.map((food, index) => (
          <div
            key={food.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-6 text-center border-b border-gray-100">
              {getFoodIcon(food.name)}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {food.name}
              </h3>
              <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2">
                <FaBolt className="text-sm text-gray-600 mr-2" />
                <span className="font-semibold text-gray-800">
                  {food.calories} calories
                </span>
              </div>
            </div>

            <div className="p-6">
              <div
                className={`p-4 rounded-lg mb-4 ${getRiskStyle(
                  food.riskLevel
                )}`}
              >
                <div className="flex items-center mb-2">
                  <FaExclamationTriangle className="text-lg mr-2" />
                  <span className="font-medium">Health Alert!</span>
                </div>
                <p className="text-sm leading-relaxed">{food.healthRisks}</p>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <FaLightbulb className="text-lg mr-2 text-green-600" />
                  <span className="font-medium text-green-800">
                    Better Choices:
                  </span>
                </div>
                <p className="text-sm text-green-700">{food.alternatives}</p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Max {food.maxWeeklyLimit} times/week
                </div>
                <button
                  onClick={() => handleFoodClick(food)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm flex items-center"
                >
                  <FaUtensils className="mr-2" />I ate this!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
        <p className="text-gray-700 flex items-center justify-center">
          <FaCheckCircle className="mr-2 text-green-500" />
          <strong>Remember:</strong> It's all about balance, not perfection!
        </p>
      </div>

      {selectedFood && (
        <FoodModal
          food={selectedFood}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedFood(null);
          }}
          onSuccess={handleLogSuccess}
        />
      )}

      <WarningAlert warning={warning} onClose={() => setWarning(null)} />
    </div>
  );
};

export default FoodList;
