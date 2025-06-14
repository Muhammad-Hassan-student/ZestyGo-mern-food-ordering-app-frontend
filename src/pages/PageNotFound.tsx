import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-50 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
        alt="Burger Icon"
        className="w-32 h-32 mb-6 animate-bounce"
      />

      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
