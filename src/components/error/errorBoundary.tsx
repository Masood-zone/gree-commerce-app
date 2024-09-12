import { AlertCircle, RefreshCw } from "lucide-react";
import { useRouteError } from "react-router-dom";

interface ErrorType {
  message?: string;
}

function ErrorBoundary() {
  const error: ErrorType = useRouteError() as ErrorType;

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-red-500 mb-6">
            Error: {error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-12 py-2 border border-transparent text-base font-medium shadow-sm text-white bg-black rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
