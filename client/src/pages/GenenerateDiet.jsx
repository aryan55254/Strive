import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiservice from "../services/api.service";
import { Link } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  BookmarkIcon,
  CheckCircleIcon,
  ArrowUturnLeftIcon,
  ExclamationTriangleIcon,
  ChevronUpDownIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { GiMuscleUp, GiWheat, GiFat } from "react-icons/gi";

const goalOptions = [
  { id: "Lose Weight", label: "Lose Weight" },
  { id: "Gain Muscle", label: "Gain Muscle" },
  { id: "Maintain Weight", label: "Maintain Weight" },
];
const activityLevels = [
  { id: "Sedentary", label: "Sedentary", description: "Little to no exercise" },
  {
    id: "Lightly Active",
    label: "Lightly Active",
    description: "Exercise 1-3 days/week",
  },
  {
    id: "Moderately Active",
    label: "Moderately Active",
    description: "Exercise 3-5 days/week",
  },
  {
    id: "Very Active",
    label: "Very Active",
    description: "Exercise 6-7 days/week",
  },
];
const dietPreferences = [
  "None",
  "Vegetarian",
  "Vegan",
  "Keto",
  "Paleo",
  "Pescatarian",
  "Eggetarian",
];
const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

// Custom Select Component (same as workout page)
const CustomSelect = ({ label, name, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange({
      target: {
        name: name,
        value: optionValue,
      },
    });
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Select an option";

  return (
    <section ref={selectRef} className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent flex items-center justify-between"
      >
        <span>{selectedLabel}</span>
        <ChevronUpDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-600 rounded-xl shadow-lg">
          <ul className="py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 cursor-pointer text-white hover:bg-sky-600 ${
                  value === option.value ? "bg-sky-700" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

const GeneratingSpinner = () => (
  <div className="text-center py-20">
    <div className="mx-auto w-16 h-16 border-4 border-t-4 border-gray-700 border-t-sky-500 rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-gray-400">
      Our AI is crafting your personalized diet...
    </p>
    <p className="text-sm text-gray-500">This can take up to a minute.</p>
  </div>
);

const DietInputForm = ({ handleSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    age: "25",
    gender: "Male",
    height: "180",
    weight: "75",
    primaryGoal: "Gain Muscle",
    activityLevel: "Moderately Active",
    dietaryPreference: "None",
    allergies: "",
    medicalHistory: "",
    foodsToAvoid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalSelect = (goalId) => {
    setFormData((prev) => ({ ...prev, primaryGoal: goalId }));
  };

  const handleActivitySelect = (activityId) => {
    setFormData((prev) => ({ ...prev, activityLevel: activityId }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-400 pb-2">
          AI Diet Planner
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Provide your details for a science-based diet plan tailored to you.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 space-y-8"
      >
        {/* Personal Details Section */}
        <div className="space-y-8 mb-10 pb-8 border-b border-gray-700">
          <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
            <span className="bg-sky-500/20 w-8 h-8 rounded-full flex items-center justify-center text-sm">
              1
            </span>
            Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
                className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <CustomSelect
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={genderOptions}
              />
            </div>
            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                id="height"
                value={formData.height}
                onChange={handleChange}
                min="50"
                max="300"
                className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                min="20"
                max="300"
                className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Goals & Activity Section */}
        <div className="space-y-8 mb-10 pb-8 border-b border-gray-700">
          <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
            <span className="bg-sky-500/20 w-8 h-8 rounded-full flex items-center justify-center text-sm">
              2
            </span>
            Goals & Activity
          </h2>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              What's your primary goal?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {goalOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => handleGoalSelect(option.id)}
                  className={`py-4 px-4 rounded-xl cursor-pointer border-2 transition-all duration-200 text-center font-medium ${
                    formData.primaryGoal === option.id
                      ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-lg"
                      : "bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <span className="font-bold">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Describe your activity level
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activityLevels.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => handleActivitySelect(option.id)}
                  className={`py-4 px-4 rounded-xl cursor-pointer border-2 transition-all duration-200 text-left font-medium ${
                    formData.activityLevel === option.id
                      ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-lg"
                      : "bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <span className="font-bold block">{option.label}</span>
                  <span className="text-xs text-gray-400">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
            <span className="bg-sky-500/20 w-8 h-8 rounded-full flex items-center justify-center text-sm">
              3
            </span>
            Preferences & Restrictions
          </h2>

          <CustomSelect
            label="Dietary Preferences"
            name="dietaryPreference"
            value={formData.dietaryPreference}
            onChange={handleChange}
            options={dietPreferences.map((pref) => ({
              value: pref,
              label: pref,
            }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="allergies"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Allergies (Optional)
              </label>
              <input
                type="text"
                name="allergies"
                id="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="e.g., Peanuts, Shellfish"
                className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="foodsToAvoid"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Foods to Avoid (Optional)
              </label>
              <input
                type="text"
                name="foodsToAvoid"
                id="foodsToAvoid"
                value={formData.foodsToAvoid}
                onChange={handleChange}
                placeholder="e.g., Spicy food, Dairy"
                className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="medicalHistory"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Relevant Medical History (Optional)
            </label>
            <input
              type="text"
              name="medicalHistory"
              id="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              placeholder="e.g., High blood pressure"
              className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed shadow-lg cursor-pointer"
          >
            {isLoading ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              <ClipboardDocumentListIcon className="h-5 w-5" />
            )}
            {isLoading ? "Generating..." : "Generate My AI Diet Plan"}
          </button>
        </div>
      </form>
    </div>
  );
};

const GeneratedPlanView = ({ planData, handleGoBack }) => {
  const [planName, setPlanName] = useState(planData.planTitle || "My AI Diet");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      await apiservice.post("/api/plans/save_diet", { planName, planData });
      setSaveSuccess(true);
    } catch (err) {
      setSaveError("Failed to save plan. Please try again.");
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const macroData = [
    {
      label: "Calories",
      value: `${planData.dailyAverage.calories} kcal`,
      Icon: FireIcon,
      color: "text-orange-400",
    },
    {
      label: "Protein",
      value: `${planData.dailyAverage.proteinGrams}g`,
      Icon: GiMuscleUp,
      color: "text-red-400",
    },
    {
      label: "Carbs",
      value: `${planData.dailyAverage.carbsGrams}g`,
      Icon: GiWheat,
      color: "text-yellow-400",
    },
    {
      label: "Fat",
      value: `${planData.dailyAverage.fatGrams}g`,
      Icon: GiFat,
      color: "text-green-400",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          {planData.planTitle}
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Your personalized 7-day nutrition plan.
        </p>
      </div>

      {/* Daily Averages */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-sky-400 mb-4 text-center">
          Daily Averages
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {macroData.map(({ label, value, Icon, color }) => (
            <div
              key={label}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center flex flex-col items-center justify-center"
            >
              <Icon className={`h-8 w-8 mb-2 ${color}`} />
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-lg font-bold text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-8">
        {planData.weeklySchedule.map((day) => (
          <div
            key={day.day}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden"
          >
            <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white">{day.day}</h3>
              <p className="text-sm text-gray-400">
                Total Calories: {day.dailyTotalCalories} kcal
              </p>
            </div>

            <div className="divide-y divide-gray-700">
              {day.meals.map((meal) => (
                <div key={meal.mealType} className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-sky-300">
                      {meal.mealType}
                      <span className="text-sm font-normal text-gray-400 ml-2">
                        ({meal.time})
                      </span>
                    </h4>
                    <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded-full">
                      {meal.totalMealCalories} kcal
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {meal.items.map((item) => (
                      <li
                        key={item.food}
                        className="flex justify-between items-start text-gray-300"
                      >
                        <div>
                          <p className="font-medium text-white">{item.food}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-mono text-gray-400 whitespace-nowrap pl-4">
                          {item.calories} kcal
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Plan */}
      <div className="mt-10 bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Save This Plan</h2>
        {!saveSuccess ? (
          <>
            <p className="text-sm text-gray-400 mb-4">
              Give your plan a name so you can find it later.
            </p>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="e.g., My Muscle Gain Diet"
              className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white mb-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-emerald-500/20"
            >
              {isSaving ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <BookmarkIcon className="h-5 w-5" />
              )}
              {isSaving ? "Saving..." : "Save Diet Plan"}
            </button>
            {saveError && (
              <p className="text-red-400 text-center mt-3">{saveError}</p>
            )}
          </>
        ) : (
          <div className="text-center text-green-400 py-4">
            <CheckCircleIcon className="h-12 w-12 mx-auto mb-2" />
            <p className="text-lg font-semibold">Plan Saved Successfully!</p>
            <Link
              to="/saveddiets"
              className="text-sky-400 cursor-pointer hover:underline mt-2 inline-block"
            >
              View your saved diets
            </Link>
          </div>
        )}
      </div>

      {/* Go Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleGoBack}
          className="flex cursor-pointer items-center justify-center mx-auto gap-2 bg-gray-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors"
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
          Create a Different Plan
        </button>
      </div>
    </div>
  );
};

function GenerateDiet() {
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateDiet = async (formData) => {
    setIsLoading(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age, 10),
        height: parseInt(formData.height, 10),
        weight: parseFloat(formData.weight),
      };
      const response = await apiservice.post("/api/generate/diet", payload);
      setGeneratedPlan(response.data);
    } catch (err) {
      if (err.response && err.response.status === 429) {
        setError({
          message:
            "You have reached your daily generation limit. Please try again after 24 hours.",
          type: "limit",
        });
      } else {
        setError({
          message:
            "An unexpected error occurred while generating your diet. Please try again.",
          type: "general",
        });
      }
      console.error("Generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setGeneratedPlan(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    if (isLoading) return <GeneratingSpinner />;
    if (error)
      return (
        <div className="text-center py-20 text-red-400 max-w-md mx-auto">
          <ExclamationTriangleIcon className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Generation Failed</h2>
          <p className="mt-2">{error.message}</p>
          <button
            onClick={handleGoBack}
            className="mt-6 bg-sky-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-sky-500"
          >
            Try Again
          </button>
        </div>
      );
    if (generatedPlan) {
      return (
        <GeneratedPlanView
          planData={generatedPlan}
          handleGoBack={handleGoBack}
        />
      );
    }
    return (
      <DietInputForm handleSubmit={handleGenerateDiet} isLoading={isLoading} />
    );
  };

  return (
    <>
      <Header />
      <div className="bg-[#0D1117] min-h-screen text-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default GenerateDiet;
