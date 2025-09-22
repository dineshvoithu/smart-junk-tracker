import React, { useState, useEffect } from "react";
import axios from "axios";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/junkfoods");
      setFoods(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching foods:", error);
      setLoading(false);
    }
  };

  const getFoodEmoji = (foodName) => {
    switch (foodName.toLowerCase()) {
      case "pizza":
        return "🍕";
      case "parotta":
        return "🥙";
      case "burger":
        return "🍔";
      default:
        return "🍽️";
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🍽️</div>
        <div className="text-lg text-gray-600">
          Loading your food options...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          What are you craving today? 😋
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
              <div className="text-5xl mb-3">{getFoodEmoji(food.name)}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {food.name}
              </h3>
              <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2">
                <span className="text-sm text-gray-600 mr-2">⚡</span>
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
                  <span className="text-lg mr-2">⚠️</span>
                  <span className="font-medium">Health Alert!</span>
                </div>
                <p className="text-sm leading-relaxed">{food.healthRisks}</p>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">💡</span>
                  <span className="font-medium text-green-800">
                    Better Choices:
                  </span>
                </div>
                <p className="text-sm text-green-700">{food.alternatives}</p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-gray-500">
                  <span className="mr-2">📅</span>
                  Max {food.maxWeeklyLimit} times/week
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm">
                  I ate this! 🍴
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
        <p className="text-gray-700">
          💪 <strong>Remember:</strong> It's all about balance, not perfection!
        </p>
      </div>
    </div>
  );
};

export default FoodList;
