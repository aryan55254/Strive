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
