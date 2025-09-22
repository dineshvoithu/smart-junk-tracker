import FoodList from "./components/FoodList";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                FoodieTracker
              </h1>
              <p className="text-gray-600 mt-1">
                Your personal junk food companion 🤝
              </p>
            </div>
            <div className="text-4xl">🥘</div>
          </div>
        </div>
      </header>

      <main>
        <FoodList />
      </main>

      <footer className="text-center py-6 text-gray-500 bg-white border-t border-gray-200">
        <p className="text-sm">Made with ❤️ for healthier choices</p>
      </footer>
    </div>
  );
}

export default App;
