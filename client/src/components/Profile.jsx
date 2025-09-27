import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

function Profile() {
  const { logout, user } = useAuth();

  const handlelogout = async () => {
    await logout();
  };

  if (!user) {
    return null;
  }

  return (
    <div
      className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in-down"
      role="menu"
    >
      <div className="p-2">
        <div className="px-2 py-2">
          <p className="truncate text-sm font-medium text-gray-200">
            {user.Username}
          </p>
          <p className="truncate text-sm text-gray-400">{user.Email}</p>
        </div>

        <hr className="border-t border-gray-700" />

        <div className="mt-1 p-1">
          <button
            onClick={handlelogout}
            className="group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
            role="menuitem"
          >
            <LogOut className="mr-3 h-5 w-5 text-cyan-400" aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
