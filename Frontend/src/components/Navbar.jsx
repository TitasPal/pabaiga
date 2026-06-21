import { useNavigate, Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Navbar({ query, setQuery }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="navbar bg-white shadow-sm">
      <div>
        <Link to="/"><Logo /></Link>
      </div>
      <div className="flex flex-1 justify-center ml-10 relative">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered bg-gray-100 w-full mr-10 text-black text-center rounded-xl pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </span>
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="text-sm text-gray-500">Hi, <span className="font-bold text-cyan-600">{user.username}</span></span>
            <button onClick={logout} className="rounded-sm bg-white font-bold border-cyan-600 border-2 w-20 text-center h-10 text-cyan-600">Logout</button>
          </>
        ) : (
          <Link to="/login" className="rounded-sm font-bold bg-white hover:text-cyan-700 border-cyan-600 border-2 w-40 text-center h-10 pt-1 text-cyan-600">Sign-Up | Login</Link>
        )}
        <button
          onClick={() => user ? navigate("/post") : navigate("/login")}
          className="rounded-sm font-bold bg-cyan-600 text-white border-cyan-600 border-2 w-25 text-center h-10 content-center hover:bg-cyan-700"
        >
          Sell now!
        </button>
      </div>
    </div>
  )
}