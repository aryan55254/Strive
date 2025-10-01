import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiservice from "../services/api.service";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  InboxIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// --- Sub-components for a cleaner structure ---

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-700 border-t-sky-500 rounded-full animate-spin"></div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-20 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
    <InboxIcon className="h-16 w-16 mx-auto mb-4 text-gray-500" />
    <h3 className="text-2xl font-semibold text-white">No Saved Diet Plans</h3>
    <p className="mt-2 text-gray-400">
      You haven't saved any AI-generated diet plans yet.
    </p>
    <Link
      to="/generatediet"
      className="mt-6 inline-block bg-sky-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-sky-500 transition-colors"
    >
      Create a New Diet Plan
    </Link>
  </div>
);

// Component to display the full details of an expanded plan
const PlanDetails = ({ planData }) => (
  <div className="pt-6 mt-6 border-t border-gray-700">
    <h2 className="text-2xl font-bold text-center mb-4">
      {planData.planTitle}
    </h2>
    <div className="text-center text-gray-400 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/50 p-4 rounded-xl">
      <div>
        <strong>Calories:</strong>
        <br />
        {planData.dailyAverage.calories} kcal
      </div>
      <div>
        <strong>Protein:</strong>
        <br />
        {planData.dailyAverage.proteinGrams}g
      </div>
      <div>
        <strong>Carbs:</strong>
        <br />
        {planData.dailyAverage.carbsGrams}g
      </div>
      <div>
        <strong>Fat:</strong>
        <br />
        {planData.dailyAverage.fatGrams}g
      </div>
    </div>
    <div className="space-y-6">
      {planData.weeklySchedule.map((day) => (
        <div key={day.day} className="bg-gray-900/50 rounded-lg p-4">
          <h3 className="text-xl font-bold text-sky-400">{day.day}</h3>
          {day.meals.map((meal) => (
            <div key={meal.mealType} className="mt-3">
              <h4 className="font-semibold text-white">
                {meal.mealType} ({meal.time})
              </h4>
              <ul className="list-disc list-inside text-gray-300 pl-4 text-sm">
                {meal.items.map((item) => (
                  <li key={item.food}>
                    {item.food} ({item.quantity})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// The main card for each saved diet
const DietCard = ({ diet, planNumber, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await apiservice.delete(`/api/plans/delete_diet/${diet._id}`);
      onDelete(diet._id);
    } catch (error) {
      console.error("Failed to delete diet plan:", error);
      setIsDeleting(false);
    }
  };

  const creationDate = new Date(diet.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl transition-all duration-300 hover:border-sky-500/50">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg font-bold text-white">
            Diet Plan #{planNumber}
          </h3>
          <p className="text-sm text-gray-400">Saved on: {creationDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 rounded-full transition-colors hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50"
            aria-label="Delete diet plan"
          >
            {isDeleting ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              <TrashIcon className="h-5 w-5" />
            )}
          </button>
          <ChevronDownIcon
            className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 animate-fade-in">
          <PlanDetails planData={diet.PlanData} />
        </div>
      )}
    </div>
  );
};

function SavedDiets() {
  const [diets, setDiets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await apiservice.get("/api/plans/saved_diets");
        setDiets(response.data);
      } catch (err) {
        setError(
          "Failed to load your saved diet plans. Please try again later."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiets();
  }, []);

  const handleDeleteSuccess = (deletedId) => {
    setDiets((prevDiets) => prevDiets.filter((diet) => diet._id !== deletedId));
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-400">{error}</p>;
    if (diets.length === 0) return <EmptyState />;
    return (
      <div className="space-y-6">
        {diets.map((diet, index) => (
          <DietCard
            key={diet._id}
            diet={diet}
            planNumber={index + 1}
            onDelete={handleDeleteSuccess}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="bg-[#0D1117] min-h-screen text-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-400 pb-2">
              Your Saved Diet Plans
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              Here are all the personalized diet plans you've saved.
            </p>
          </div>
          {renderContent()}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default SavedDiets;
