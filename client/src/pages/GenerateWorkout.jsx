import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiservice from "../services/api.service";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  ArrowPathIcon,
  BookmarkIcon,
  CheckCircleIcon,
  ArrowUturnLeftIcon,
  ExclamationTriangleIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

const goalOptions = [
  { id: "Build Muscle", label: "Build Muscle" },
  { id: "Lose Fat", label: "Lose Fat" },
  { id: "Improve Strength", label: "Improve Strength" },
  { id: "General Fitness", label: "General Fitness" },
];
const levelOptions = [
  { id: "Beginner", label: "Beginner" },
  { id: "Intermediate", label: "Intermediate" },
  { id: "Advanced", label: "Advanced" },
];
const equipmentOptions = [
  "Bodyweight",
  "Dumbbells",
  "Barbell",
  "Kettlebells",
  "Resistance Bands",
  "Pull-up Bar",
  "Bench",
  "Cable Machine",
  "Leg Press",
  "Treadmill",
];
const focusAreaOptions = [
  { value: "Full Body", label: "Full Body" },
  { value: "Upper Body", label: "Upper Body" },
  { value: "Lower Body", label: "Lower Body" },
  { value: "Push/Pull/Legs", label: "Push / Pull / Legs" },
];
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
      Our AI is building your custom workout...
    </p>
    <p className="text-sm text-gray-500">This can take up to a minute.</p>
  </div>
);

const WorkoutInputForm = ({ handleSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    primaryGoal: "Build Muscle",
    fitnessLevel: "Intermediate",
    daysPerWeek: "3",
    sessionDuration: "60",
    availableEquipment: ["Bodyweight", "Dumbbells"],
    focusArea: "Full Body",
    injuriesOrLimitations: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (value) => {
    setFormData((prev) => {
      const current = prev.availableEquipment;
      return {
        ...prev,
        availableEquipment: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleGoalChange = (goal) => {
    setFormData((prev) => ({ ...prev, primaryGoal: goal }));
  };

  const handleLevelChange = (level) => {
    setFormData((prev) => ({ ...prev, fitnessLevel: level }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-400 pb-2">
          AI Workout Planner
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Fill out the form below to generate your personalized plan.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 space-y-8"
      >
        {/* Goal */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Primary Goal</h2>
          <div className="grid grid-cols-2 gap-4">
            {goalOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleGoalChange(option.id)}
                className={`py-4 px-4 rounded-xl cursor-pointer border-2 transition-all duration-200 text-left font-medium ${
                  formData.primaryGoal === option.id
                    ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-lg"
                    : "bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {/* Fitness Level */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Fitness Level</h2>
          <div className="grid grid-cols-3 gap-4">
            {levelOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleLevelChange(option.id)}
                className={`py-4 px-4 cursor-pointer rounded-xl border-2 transition-all duration-200 font-medium ${
                  formData.fitnessLevel === option.id
                    ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-lg"
                    : "bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {/* Schedule & Duration */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Training Days Per Week
            </label>
            <input
              type="number"
              name="daysPerWeek"
              value={formData.daysPerWeek}
              onChange={handleChange}
              min="1"
              max="7"
              className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Session Duration (minutes)
            </label>
            <input
              type="number"
              name="sessionDuration"
              value={formData.sessionDuration}
              onChange={handleChange}
              min="15"
              max="120"
              step="5"
              className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </section>

        <CustomSelect
          label="Training Focus"
          name="focusArea"
          value={formData.focusArea}
          onChange={handleChange}
          options={focusAreaOptions}
        />

        {/* Equipment */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">
            Available Equipment
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {equipmentOptions.map((eq) => (
              <button
                key={eq}
                type="button"
                onClick={() => handleMultiSelectChange(eq)}
                className={`py-3 px-3 rounded-xl border-2 cursor-pointer text-sm font-medium transition-all duration-200 ${
                  formData.availableEquipment.includes(eq)
                    ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-md"
                    : "bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
              >
                {eq}
              </button>
            ))}
          </div>
        </section>

        {/* Injuries */}
        <section>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Injuries or Limitations (Optional)
          </label>
          <textarea
            name="injuriesOrLimitations"
            value={formData.injuriesOrLimitations}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Bad lower back, weak knees, shoulder pain"
            className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </section>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed shadow-lg cursor-pointer"
          >
            {isLoading ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            {isLoading ? "Generating..." : "Generate My AI Workout Plan"}
          </button>
        </div>
      </form>
    </div>
  );
};

const GeneratedPlanView = ({ planData, handleGoBack }) => {
  const [planName, setPlanName] = useState(
    planData.planTitle || "My AI Workout"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      await apiservice.post("/api/plans/save_workout", { planName, planData });
      setSaveSuccess(true);
    } catch (err) {
      setSaveError("Failed to save plan. Please try again.");
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">
        {planData.planTitle}
      </h1>
      <div className="text-center text-gray-400 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8 space-y-4">
        <h2 className="text-xl font-bold text-sky-400">General Guidance</h2>
        <p>
          <strong>Warm-up:</strong> {planData.guidance.warmup}
        </p>
        <p>
          <strong>Cool-down:</strong> {planData.guidance.cooldown}
        </p>
        <p>
          <strong>Progressive Overload:</strong>{" "}
          {planData.guidance.progressiveOverload}
        </p>
      </div>

      <div className="space-y-6">
        {planData.weeklySchedule.map((day) => (
          <div
            key={day.day}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              {day.dayOfWeek} -{" "}
              <span className="text-sky-400">{day.focus}</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-600">
                  <tr>
                    <th className="p-2">Exercise</th>
                    <th className="p-2">Sets</th>
                    <th className="p-2">Reps</th>
                    <th className="p-2">Rest (mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {day.exercises.map((ex, index) => (
                    <tr
                      key={`${ex.name}-${index}`}
                      className="border-b border-gray-700 last:border-b-0"
                    >
                      <td className="p-2 align-top">
                        <p className="font-semibold">{ex.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{ex.tip}</p>
                      </td>
                      <td className="p-2 align-top">{ex.sets}</td>
                      <td className="p-2 align-top">{ex.reps}</td>
                      <td className="p-2 align-top">{ex.restMinutes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Save This Plan</h2>
        {!saveSuccess ? (
          <>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Enter a name for your plan"
              className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white mb-4"
            />
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {isSaving ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <BookmarkIcon className="h-5 w-5" />
              )}
              Save Workout
            </button>
            {saveError && <p className="text-red-400 mt-2">{saveError}</p>}
          </>
        ) : (
          <div className="text-center text-green-400">
            <CheckCircleIcon className="h-12 w-12 mx-auto mb-2" />
            <p className="text-lg font-semibold">Plan Saved Successfully!</p>
            <Link
              to="/savedworkouts"
              className="text-sky-400 cursor-pointer hover:underline mt-2 inline-block"
            >
              View your saved workouts
            </Link>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleGoBack}
          className="flex cursor-pointer items-center cursor-pointerjustify-center mx-auto gap-2 bg-gray-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors"
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
          Create a Different Plan
        </button>
      </div>
    </div>
  );
};

function GenerateWorkout() {
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateWorkout = async (formData) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        daysPerWeek: parseInt(formData.daysPerWeek, 10),
        sessionDuration: parseInt(formData.sessionDuration, 10),
      };
      const response = await apiservice.post("/api/generate/workout", payload);
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      <WorkoutInputForm
        handleSubmit={handleGenerateWorkout}
        isLoading={isLoading}
      />
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

export default GenerateWorkout;
