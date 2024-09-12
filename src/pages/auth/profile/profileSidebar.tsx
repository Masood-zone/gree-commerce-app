import { LogOut, Trash2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "../../../redux/store";
import { userActions } from "../../../redux/user.slice";

export function Sidebar() {
  const dispatch = useDispatch();
  const logout = userActions;

  return (
    <div className="w-64 bg-gray-100 h-screen p-6">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-800 font-semibold"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile/delete-account"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <Trash2 size={20} />
              <span>Delete Account</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch(logout.logout());
                window.location.reload();
                window.location.href = "/";
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
