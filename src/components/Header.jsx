import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header(){
    const {logout} = useAuth();
    const naviate = useNavigate();
    const handleLogout = () => {
        logout();
        naviate("/login", {replace: true});
    }
    return (
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <h1 className="text-lg font-bold text-orange-500">Fastor7</h1>
            <button
            onClick={handleLogout}
            className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium hover:bg-gray-100"
            >
            Logout
            </button>
        </div>
    </header>
    )
}