import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import { storeApi } from "../../redux/api";
import { useEffect } from "react";

function ProductIndex() {
  const { category } = useParams();
  const {
    data: categoryData,
    isLoading,
    error,
    isUninitialized,
    refetch,
  } = storeApi.useGetProductsByCategoryQuery(category, {
    skip: false,
  });

  useEffect(() => {
    if (isUninitialized) refetch();
  }, [refetch, isUninitialized]);

  if (isLoading)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        Error: {error.toString()}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {category} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryData?.map(
          (product: {
            id: number;
            title: string;
            image: string;
            rating: { rate: number; count: number };
            price: number;
          }) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2 truncate">
                    {product.title}
                  </h2>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating.rate)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      ({product.rating.count})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProductIndex;
