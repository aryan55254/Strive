import { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiservice from "../services/api.service";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  MagnifyingGlassIcon,
  CubeTransparentIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
const bodyPartFilters = [
  "All",
  "Leg",
  "Chest",
  "Back",
  "Biceps",
  "Triceps",
  "Core",
  "Shoulder",
];
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-700 border-t-sky-500 rounded-full animate-spin"></div>
  </div>
);
const ExerciseCard = ({ exercise }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl group relative overflow-hidden transition-all duration-300 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-900/50">
    <div className="aspect-square bg-gray-900/30 p-4 flex items-center justify-center">
      <LazyLoadImage
        alt={exercise.name}
        src={exercise.imageUrl}
        effect="blur"
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        placeholderSrc="https://placehold.co/400x400/0D1117/38BDF8?text=Strive"
      />
    </div>
    <div className="p-4">
      <span className="inline-block bg-sky-500/10 text-sky-400 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
        {exercise.bodyPart}
      </span>
      <h3 className="text-lg font-bold text-white truncate">{exercise.name}</h3>
      <p className="text-gray-400 text-sm mt-1 h-16 overflow-hidden">
        {exercise.description}
      </p>
    </div>
  </div>
);

function Home() {
  const [allExercises, setAllExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const response = await apiservice.get("/api/exercise");
        setAllExercises(response.data);
      } catch (err) {
        setError("Failed to fetch exercises. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllExercises();
  }, []);

  const filteredExercises = useMemo(() => {
    return allExercises
      .filter((exercise) => {
        if (activeFilter === "All") return true;
        return exercise.bodyPart === activeFilter;
      })
      .filter((exercise) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          exercise.name.toLowerCase().includes(searchLower) ||
          exercise.description.toLowerCase().includes(searchLower)
        );
      });
  }, [allExercises, searchTerm, activeFilter]);

  return (
    <>
      <Header />
      <div className="bg-[#0D1117] min-h-screen text-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-400 pb-2">
                Create a Plan with AI
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                Let our AI generate personalized diet and workout plans tailored
                just for you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/generatediet"
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 group flex items-center gap-4 transition-all duration-300 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-900/50"
              >
                <ClipboardDocumentListIcon className="h-10 w-10 text-sky-400 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    AI Diet Planner
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Create a personalized diet plan in seconds.
                  </p>
                </div>
              </Link>
              <Link
                to="/generateworkout"
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 group flex items-center gap-4 transition-all duration-300 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-900/50"
              >
                <HeartIcon className="h-10 w-10 text-sky-400 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    AI Workout Planner
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Generate a custom workout tailored to you.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="relative text-center mb-12">
            <hr className="border-t border-gray-800" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D1117] px-4 text-sm font-medium text-gray-500">
              OR
            </span>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-400 pb-2">
              Explore Exercises
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Find the perfect workout to achieve your fitness goals. Search by
              name or filter by body part.
            </p>
          </div>

          <div className="sticky top-[80px] bg-[#0D1117]/80 backdrop-blur-lg z-30 py-4 mb-8 rounded-b-xl">
            <div className="relative mb-6 max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for any exercise..."
                className="block w-full bg-gray-800 border border-gray-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex justify-center flex-wrap gap-2">
              {bodyPartFilters.map((part) => (
                <button
                  key={part}
                  onClick={() => setActiveFilter(part)}
                  className={`px-4 py-2 text-sm font-semibold cursor-pointer rounded-full transition-all duration-200 ${
                    activeFilter === part
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {part}
                </button>
              ))}
            </div>
          </div>

          <div>
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <p className="text-center text-red-400">{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredExercises.length > 0 ? (
                  filteredExercises.map((exercise) => (
                    <ExerciseCard key={exercise._id} exercise={exercise} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16 text-gray-500">
                    <CubeTransparentIcon className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold">
                      No Exercises Found
                    </h3>
                    <p className="mt-2">
                      Try adjusting your search or clearing the filter.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;
