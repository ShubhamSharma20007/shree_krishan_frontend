import { Link } from 'react-router-dom';
const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <h1 className="text-8xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg mb-6 text-gray-300 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition duration-300 shadow-lg"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
