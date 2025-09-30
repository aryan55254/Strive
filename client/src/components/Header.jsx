import {
  SparklesIcon,
  UserIcon,
  XMarkIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  BookmarkIcon,
  FolderIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  {
    to: "/generatediet",
    text: "Create AI Diet Plan",
    Icon: ClipboardDocumentListIcon,
  },
  { to: "/generateworkout", text: "Create AI Workout Plan", Icon: HeartIcon },
  { to: "/saveddiets", text: "Saved Diets", Icon: BookmarkIcon },
  { to: "/savedworkouts", text: "Saved Workouts", Icon: FolderIcon },
];

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  //we use this to close an opened menu while going to diff page it will automatically close itself

  return (
    <header className="sticky top-0 z-40 bg-[#0D1117] backdrop-blur-lg border-b border-gray-900">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/home" className="flex flex-shrink-0 items-center">
          <SparklesIcon className="h-9 w-9 text-sky-400" />
          <span className="ml-2 text-2xl font-bold text-white">Strive</span>
        </Link>
        <nav className="hidden md:flex md:items-center md:justify-center md:space-x-4 lg:space-x-6">
          {navLinks.map(({ to, text, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2 font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-gray-900 text-sky-400"
                    : "text-gray-300 hover:bg-gray-700 hover:text-cyan-400"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="ml-2">{text}</span>
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center">
          <div className="hidden md:block" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="rounded-full p-2 cursor-pointer text-gray-400 transition hover:bg-gray-800 hover:text-cyan-400"
              aria-label="Toggle profile menu"
            >
              {isProfileOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <UserIcon className="h-8 w-8" />
              )}
            </button>
            {isProfileOpen && (
              <div className="absolute right-4 mt-2 w-64 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <p className="truncate text-sm font-medium text-gray-200">
                    {user?.Username}
                  </p>
                  <p className="truncate text-sm text-gray-400">
                    {user?.Email}
                  </p>
                  <button
                    onClick={logout}
                    className="group mt-4 flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-cyan-400 cursor-pointer"
                  >
                    <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-sky-400" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex md:hidden" ref={mobileMenuRef}>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-cyan-400 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0D1117] border-t border-gray-800">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navLinks.map(({ to, text, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center rounded-md px-3 py-2 text-base font-medium ${
                    isActive
                      ? "bg-gray-900 text-sky-400"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <Icon className="h-6 w-6 mr-3" />
                <span>{text}</span>
              </NavLink>
            ))}
          </div>
          {user && (
            <div className="border-t border-gray-700 px-2 pt-4 pb-3 sm:px-3">
              <div className="px-3">
                <p className="truncate text-base font-medium text-gray-200">
                  {user.Username}
                </p>
                <p className="truncate text-sm text-gray-400">{user.Email}</p>
              </div>
              <button
                onClick={logout}
                className="group mt-3 flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-cyan-400 cursor-pointer"
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6 text-sky-400" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
