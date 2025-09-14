import { SparklesIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      {/* navbar Desktop */}
      <div className="bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <SparklesIcon className="text-cyan-400 h-10 w-10" />
              <div className="text-white font-bold text-3xl ml-2">Strive</div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-white text-xl hover:text-cyan-400 transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="#AIplans"
                  className="text-white text-xl hover:text-cyan-400 transition-colors duration-200"
                >
                  AI Plans
                </a>
                <a
                  href="#FAQs"
                  className="text-white text-xl hover:text-cyan-400 transition-colors duration-200"
                >
                  FAQs
                </a>
                <a
                  href="#testimoanials"
                  className="text-white text-xl hover:text-cyan-400 transition-colors duration-200"
                >
                  Testimonials
                </a>
              </div>
            </div>

            <Link to="/login">
              <button className="text-white text-xl cursor-pointer bg-cyan-400 hover:bg-cyan-500 px-5 py-3 font-bold rounded-md transition-colors duration-200">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* hero section */}
      <div
        className="relative bg-gray-900 text-white flex flex-col items-center justify-center text-center px-4"
        // This calculates the height to be the full viewport minus the navbar height (h-20 is 5rem)
        style={{ height: "calc(100vh - 5rem)" }}
      >
        {/* Faded Background Text */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <h1 className="text-[25vw] lg:text-[20vw] font-black text-white opacity-5 whitespace-nowrap pointer-events-none">
            STRIVE
          </h1>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase">
            <span className="block">Stop Guessing.</span>
            <span className="block text-cyan-400 mt-2">Start Evolving.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your personal AI fitness and nutrition coach is here. Strive AI
            generates hyper-personalized workout and diet plans that adapt as
            you progress, ensuring you never hit a plateau again.
          </p>

          <div className="mt-10">
            <Link to="/register">
              <button className="text-white text-xl cursor-pointer bg-cyan-500 hover:bg-cyan-600 px-10 py-4 font-bold rounded-lg transition-transform transform hover:scale-105 duration-300">
                Join Now
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mt-12">
            <div className="flex items-center space-x-2">
              <CheckIcon className="text-gray-400 h-6 w-6" />
              <p className="text-gray-400 text-lg">AI Diet Plans</p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="text-gray-400 h-6 w-6" />
              <p className="text-gray-400 text-lg">AI Workout Plans</p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="text-gray-400 h-6 w-6" />
              <p className="text-gray-400 text-lg">Browse Exercises</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
