import { Link } from "react-router-dom";
import { storeApi } from "../../redux/api";

export const BrowseByCategory = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = storeApi.useGetCategoriesQuery({});

  return (
    <div
      id="category"
      className="container mx-auto px-4 py-8 bg-gray-100 rounded-3xl"
    >
      <h2 className="text-4xl font-extrabold text-center mb-8">
        Browse By Category
      </h2>

      {/* Category Skeleton */}
      {isLoading ? (
        <div className="flex items-center gap-4 mx-auto justify-center">
          <span className="loading loading-spinner loading-lg"></span>
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">
          Something went wrong. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 mx-auto">
          {categories?.map((category: string, index: number) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl hover:drop-shadow-xl
                  transistion-all duration-300 ease-in ${
                    index % 3 === 0 ? "col-span-2" : "col-span-1"
                  }`}
            >
              <div className="w-full h-52">
                <img
                  src={`https://images.unsplash.com/photo-1702423673709-420573e84666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhdGVnb3J5fGVufDB8fDB8fHww`}
                  alt={category}
                  className="w-full h-full object-cover skeleton"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold capitalize ">
                  <Link
                    to={`/products/category/${category}`}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {category}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
