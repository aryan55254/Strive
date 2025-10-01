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
  HeartIcon,
} from "@heroicons/react/24/outline";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-700 border-t-sky-500 rounded-full animate-spin"></div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-20 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
    <InboxIcon className="h-16 w-16 mx-auto mb-4 text-gray-500" />
    <h3 className="text-2xl font-semibold text-white">
      No Saved Workout Plans
    </h3>
    <p className="mt-2 text-gray-400">
      You haven't saved any AI-generated workout plans yet.
    </p>
    <Link
      to="/generateworkout"
      className="mt-6 inline-block bg-sky-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-sky-500 transition-colors"
    >
      Create a New Workout Plan
    </Link>
  </div>
);

const PlanDetails = ({ planData }) => (
  <div className="pt-6 mt-6 border-t border-gray-700">
    <h2 className="text-2xl font-bold text-center mb-4">
      {planData.planTitle}
    </h2>
    <div className="text-center text-gray-400 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-900/50 p-4 rounded-xl">
      <div>
        <strong>Goal:</strong> {planData.summary.goal}
      </div>
      <div>
        <strong>Split:</strong> {planData.summary.split}
      </div>
      <div>
        <strong>Frequency:</strong> {planData.summary.frequency}
      </div>
    </div>

    <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
      <h3 className="text-xl font-bold text-sky-400 mb-2">General Guidance</h3>
      <p className="text-sm text-gray-300">
        <strong>Warm-up:</strong> {planData.guidance.warmup}
      </p>
      <p className="text-sm text-gray-300 mt-1">
        <strong>Cool-down:</strong> {planData.guidance.cooldown}
      </p>
      <p className="text-sm text-gray-300 mt-1">
        <strong>Progressive Overload:</strong>{" "}
        {planData.guidance.progressiveOverload}
      </p>
    </div>

    <div className="space-y-6">
      {planData.weeklySchedule.map((day) => (
        <div key={day.day} className="bg-gray-900/50 rounded-lg p-4">
          <h3 className="text-xl font-bold text-white">
            {day.dayOfWeek} - <span className="text-sky-400">{day.focus}</span>
          </h3>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-600">
                <tr>
                  <th className="p-2">Exercise</th>
                  <th className="p-2 text-center">Sets</th>
                  <th className="p-2 text-center">Reps</th>
                  <th className="p-2 text-center">Rest</th>
                </tr>
              </thead>
              <tbody>
                {day.exercises.map((ex) => (
                  <tr
                    key={ex.name}
                    className="border-b border-gray-700 last:border-b-0"
                  >
                    <td className="p-2 align-top">
                      <p className="font-semibold text-white">{ex.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{ex.tip}</p>
                    </td>
                    <td className="p-2 align-top text-center">{ex.sets}</td>
                    <td className="p-2 align-top text-center">{ex.reps}</td>
                    <td className="p-2 align-top text-center">
                      {ex.restMinutes} min
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WorkoutCard = ({ workout, planNumber, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await apiservice.delete(`/api/plans/delete_workout/${workout._id}`);
      onDelete(workout._id);
    } catch (error) {
      console.error("Failed to delete workout plan:", error);
      setIsDeleting(false);
    }
  };

  const creationDate = new Date(workout.createdAt).toLocaleDateString("en-US", {
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
            Workout Plan #{planNumber}
          </h3>
          <p className="text-sm text-gray-400">Saved on: {creationDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 rounded-full transition-colors hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50"
            aria-label="Delete workout plan"
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
          <PlanDetails planData={workout.PlanData} />
        </div>
      )}
    </div>
  );
};

function SavedWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await apiservice.get("/api/plans/saved_workouts");
        setWorkouts(response.data);
      } catch (err) {
        setError(
          "Failed to load your saved workout plans. Please try again later."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  const handleDeleteSuccess = (deletedId) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.filter((workout) => workout._id !== deletedId)
    );
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-400">{error}</p>;
    if (workouts.length === 0) return <EmptyState />;
    return (
      <div className="space-y-6">
        {workouts.map((workout, index) => (
          <WorkoutCard
            key={workout._id}
            workout={workout}
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
              Your Saved Workout Plans
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              Here are all the personalized workout plans you've saved.
            </p>
          </div>
          {renderContent()}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default SavedWorkouts;
