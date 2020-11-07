import { Link, useLocation, Route } from "react-router-dom";
import { Products } from "../components";

export default function Home() {
  const { pathname } = useLocation();

  return (
    <div className="h-screen bg-gray-100">
      <header className="flex justify-center p-6 bg-white shadow">
        <nav>
          <Link
            className={`p-3 m-2 rounded-lg text-gray-600 font-medium hover:text-gray-800 ${
              pathname === "/" ? "bg-gray-200" : ""
            }`}
            to="/"
            replace
          >
            products
          </Link>
          <Link
            className={`p-3 m-2 rounded-lg text-gray-600 font-medium hover:text-gray-800 ${
              pathname === "/calculator" ? "bg-gray-200" : ""
            }`}
            to="/calculator"
            replace
          >
            calculator
          </Link>
        </nav>
      </header>
      <main>
        <Route exact path="/">
          <Products />
        </Route>
      </main>
    </div>
  );
}
