import { Star } from "lucide-react";
import { storeApi } from "../../redux/api";
import { Link } from "react-router-dom";

function YouMightAlsoLike() {
  const {
    data: products,
    isLoading,
    error,
  } = storeApi.useGetTopProductsQuery({});

  if (isLoading)
    return <div className="text-center py-10">Loading Related Products</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading related products
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">YOU MIGHT ALSO LIKE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products
          ?.slice(0, 4)
          .map(
            (product: {
              id: number;
              image: string;
              title: string;
              rating: { rate: number };
              price: number;
            }) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2 truncate">
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                  </h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating.rate)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating.rate}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.price > 100 && (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          ${(product.price * 1.2).toFixed(2)}
                        </span>
                        <span className="text-sm text-red-500">-20%</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default YouMightAlsoLike;
