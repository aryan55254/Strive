import {
  SparklesIcon,
  UserIcon,
  XMarkIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  BookmarkIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import Profile from "./Profile";

const navLinks = [
  {
    to: "/generatediet",
    text: "Create Diet Plan",
    Icon: ClipboardDocumentListIcon,
  },
  { to: "/generateworkout", text: "Create Exercise Plan", Icon: HeartIcon },
  { to: "/saveddiets", text: "Saved Diets", Icon: BookmarkIcon },
  { to: "/savedworkouts", text: "Saved Workouts", Icon: FolderIcon },
];

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-700">
      <div className="bg-gray-900">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/home" className="flex items-center">
            <SparklesIcon className="h-10 w-10 text-cyan-400" />
            <span className="ml-2 text-3xl font-bold text-white">Strive</span>
          </Link>

          <div className="hidden text-sm italic text-gray-500 md:block">
            "Strive for progress, not perfection"
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="rounded-full p-2 text-cyan-400 transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Toggle profile menu"
            >
              {isProfileOpen ? (
                <XMarkIcon className="h-10 w-10 cursor-pointer" />
              ) : (
                <UserIcon className="h-10 w-10 cursor-pointer" />
              )}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <Profile />
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="bg-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-center space-x-4 px-4 py-2 sm:px-6 lg:space-x-6">
          {navLinks.map(({ to, text, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2 font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-gray-900 text-cyan-400"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              title={text}
            >
              <Icon className="h-6 w-6" />
              <span className="hidden md:ml-2 md:inline">{text}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
