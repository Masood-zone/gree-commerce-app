import { Link } from "react-router-dom";

function ProductsList({
  isLoading,
  error,
  products,
}: {
  isLoading: boolean;
  error: Error;
  products: {
    id: number;
    image: string;
    title: string;
    rating: {
      rate: number;
    };
    price: number;
  }[];
}) {
  return isLoading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-lg p-4 animate-pulse">
          <div className="bg-gray-100 h-48 mb-4 rounded-lg"></div>
          <div className="h-4 bg-gray-100 w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-100 w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-100 w-1/4"></div>
        </div>
      ))}
    </div>
  ) : error ? (
    <div className="text-center text-red-500 font-semibold">
      Something went wrong. Please try again later.
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.map(
        (product: {
          id: number;
          image: string;
          title: string;
          rating: {
            rate: number;
          };
          price: number;
        }) => (
          <div
            key={product.id}
            className="rounded-lg p-4 transition-all duration-300 ease-out hover:scale-110 hover:shadow-md"
          >
            <div className="h-48 mb-4 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-scale-down"
              />
            </div>
            <h3 className="font-semibold mb-2">
              <Link to={`/products/${product.id}`}>{product.title}</Link>
            </h3>
            <div className="flex items-center mb-2">
              {/* {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))} */}
              <span className="ml-1 text-sm text-gray-600">
                {product.rating.rate}/5
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-lg">${product.price}</span>
              <>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  $300
                </span>
                <span className="ml-2 text-sm text-red-500">-5%</span>
              </>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ProductsList;
