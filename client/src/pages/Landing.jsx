import { useState } from "react";
import {
  SparklesIcon,
  CheckIcon,
  BookOpenIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const GithubIcon = (props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

function Landing() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How does the AI create my plans?",
      answer:
        "Our AI analyzes your profile information—including your goals, experience level, available equipment, and dietary preferences—to generate a completely personalized workout and nutrition plan. It uses proven fitness principles and machine learning to tailor every detail to you.",
    },
    {
      question: "Is Strive suitable for beginners?",
      answer:
        "Absolutely! Strive is designed for all fitness levels. When you sign up, you'll provide your experience level, and the AI will create a plan that matches your current abilities, helping you build a solid foundation and progress safely and effectively.",
    },
    {
      question: "Can I customize my diet plan for allergies or preferences?",
      answer:
        "Yes. During the plan generation process, you can specify any dietary restrictions, allergies, or foods you dislike. The AI will then create a delicious and effective meal plan that adheres to all of your requirements.",
    },
    {
      question: "How often should I generate a new plan?",
      answer:
        "We recommend completing your current plan first (typically 4-6 weeks). Once you're done, you can generate a new one. The AI will consider your progress and adapt the new plan to ensure you continue making gains and avoid plateaus.",
    },
  ];

  return (
    <>
      <div className="bg-gray-900 top-0 z-50">
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
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <h1 className="text-[25vw] lg:text-[20vw] font-black text-white opacity-5 whitespace-nowrap pointer-events-none">
            STRIVE
          </h1>
        </div>
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
              <CheckIcon className="text-cyan-400 h-6 w-6" />
              <p className="text-gray-300 text-lg hover:text-cyan-400 transition-colors duration-200">
                AI Diet Plans
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="text-cyan-400 h-6 w-6" />
              <p className="text-gray-300 text-lg hover:text-cyan-400 transition-colors duration-200">
                AI Workout Plans
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="text-cyan-400 h-6 w-6" />
              <p className="text-gray-300 text-lg hover:text-cyan-400 transition-colors duration-200">
                Browse Exercises
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div
        id="features"
        className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Future Of Fitness Is <span className="text-cyan-400">You</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We design your fitness journey uniquely from the ground up,
              adapting to your every move
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-cyan-400 hover:bg-gray-700 transition-colors duration-300">
              <BoltIcon className="text-cyan-400 h-12 w-12 mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Intelligent Plan Generation
              </h2>
              <p className="text-gray-400">
                Our AI analyzes your goals, body type, and preferences to craft
                the perfect workout and meal plan. It's not a template; it's
                your fitness DNA.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-cyan-400 hover:bg-gray-700 transition-colors duration-300">
              <ArrowTrendingUpIcon className="text-cyan-400 h-12 w-12 mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Adaptive Progression
              </h2>
              <p className="text-gray-400">
                Create new plans after completing the first and keep your
                journey progressing with AI-driven adjustments.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-cyan-400 hover:bg-gray-700 transition-colors duration-300">
              <BookOpenIcon className="text-cyan-400 h-12 w-12 mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Master Your Movement
              </h2>
              <p className="text-gray-400">
                Dive into our exercise library with step-by-step instructions to
                train with confidence and perfect form.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* AI Plans Section */}
      <div
        id="AIplans"
        className="bg-gradient-to-b from-gray-800 to-cyan-900 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Build Your Perfect <span className="text-cyan-400">AI Plans</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Generate personalized workout and diet plans powered by
              cutting-edge AI technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-cyan-400 hover:bg-gray-700 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                Workout Plans
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <CheckIcon className="h-5 w-5 text-cyan-400 mr-2" />
                  Custom exercise selection based on your goals
                </li>
                <li className="flex items-center text-gray-400">
                  <CheckIcon className="h-5 w-5 text-cyan-400 mr-2" />
                  Progressive overload calculations
                </li>
                <li className="flex items-center text-gray-400">
                  <CheckIcon className="h-5 w-5 text-cyan-400 mr-2" />
                  Adjustable difficulty levels
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-cyan-400 hover:bg-gray-700 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Diet Plans</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <CheckIcon className="h-5 w-5 text-cyan-400 mr-2" />
                  Macro-optimized meal suggestions
                </li>
                <li className="flex items-center text-gray-400">
                  <CheckIcon className="h-5 w-5 text-cyan-400 mr-2" />
                  Dietary preference consideration
                </li>
                <li className="flex items-center text-gray-400">
                  <CheckIcon className="h-5 w-5 text-cyan-400 mr-2" />
                  Daily caloric calculations
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-3xl text-cyan-100 font-semibold mb-4">
              Create up to 10 personalized plans daily
            </p>
            <Link to="/register">
              <button className="text-cyan-500 text-xl font-bold bg-gray-900 cursor-pointer hover:bg-gray-800 px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                Start Planning
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div
        id="FAQs"
        className="bg-gradient-to-b from-cyan-900 to-gray-900 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="text-cyan-400">Questions</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have questions? We've got answers. If you don't find what you're
              looking for, feel free to contact us.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mt-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b-2 border-gray-700 py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full cursor-pointer flex justify-between items-center text-left"
                >
                  <span className="text-xl font-medium text-white">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`h-6 w-6 text-cyan-400 transform transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFaq === index ? "max-h-96 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <div className="flex items-center">
              <SparklesIcon className="text-cyan-400 h-10 w-10" />
              <div className="text-white font-bold text-3xl ml-2">Strive</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Stop Guessing. Start Evolving.
            </p>
            <nav className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
              <a
                href="#features"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#AIplans"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                AI Plans
              </a>
              <a
                href="#FAQs"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                FAQs
              </a>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Strive. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <a
                href="https://github.com/aryan55254/Strive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan-400 transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <GithubIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Landing;
