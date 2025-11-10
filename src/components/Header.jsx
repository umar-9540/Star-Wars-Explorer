import { LogIn, LogOut, User } from "lucide-react";

export const Header = ({ onLoginClick, success, onLogout }) => {
  return (
    <header className="bg-linear-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">SW</span>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Star Wars Explorer
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Discover the Galaxy
              </p>
            </div>
          </div>

          <div>
            {success ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-300 bg-slate-700/40 px-4 py-2 rounded-lg">
                  <User size={18} />
                  <span className="font-semibold">Profile</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-red-500 to-rose-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all font-medium"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-medium"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
