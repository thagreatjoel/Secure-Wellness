import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <Link to="/dashboard">Dashboard</Link>
      <div>
        <Link to="/sessions" className="mr-4">My Sessions</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
