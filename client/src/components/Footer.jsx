import { SparklesIcon } from "@heroicons/react/24/outline";
const GithubIcon = (props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);
function Footer() {
  return (
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
  );
}

export default Footer;
