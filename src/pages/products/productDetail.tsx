import { useParams } from "react-router-dom";
import { storeApi } from "../../redux/api";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import YouMightAlsoLike from "./suggestions";
import Breadcrumbs from "../../components/breadcrumbs";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = storeApi.useGetProductDetailQuery(id);
  const [addToCartItem, { isLoading: isAddingToCart }] =
    storeApi.useAddToCartMutation();
  const userData = localStorage.getItem("persist:gree-commerce-portal");
  const user = userData ? JSON.parse(JSON.parse(userData).user || "{}") : null;
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);

  const colors = ["#5F4E37", "#2F4F4F", "#000080"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];

  if (isLoading)
    return (
      <div className="container mx-auto">
        {/* Product Skeleton */}
        <div className="animate-pulse flex flex-col md:flex-row gap-8 p-5 mx-auto">
          <div className="md:w-1/2 h-96 bg-gray-200 rounded-lg" />
          <div className="md:w-1/2">
            <div className="w-[80%] h-6 bg-gray-200 rounded-full mb-4" />
            <div className="w-1/4 h-6 bg-gray-200 rounded-full mb-4" />
            <div className="w-1/2 h-6 bg-gray-200 rounded-full mb-4" />
            <div className="w-1/4 h-6 bg-gray-200 rounded-full mb-4" />
            <div className="w-1/5 h-6 bg-gray-200 rounded-full mb-4" />
            <div className="w-1/2 h-6 bg-gray-200 rounded-full mb-4" />
            <div className="w-1/2 h-6 bg-gray-200 rounded-full mb-4" />
            <div className="w-1/2 h-6 bg-gray-200 rounded-full mb-4" />
            <div className="w-1/2 h-6 bg-gray-200 rounded-full mb-4" />
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading product details
      </div>
    );
  if (!product)
    return <div className="text-center py-10">Product not found</div>;

  const discountedPrice = product.price * 0.6; // 40% off
  const addToCart = async ({
    id,
    userId,
    quantity,
  }: {
    id: number;
    userId: number;
    quantity: number;
  }) => {
    const payload = {
      userId: userId, // Set your dynamic userId here
      date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
      products: [
        {
          productId: id,
          quantity: quantity,
        },
      ],
    };

    if (!user.isAuthenticating) {
      toast.error("Please login to add product to cart.");
      return;
    }
    try {
      const response = await addToCartItem(payload).unwrap();
      toast.success("Product added to cart!");
      return response;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumbs category={product.category} title={product.title} />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 h-auto overflow-hidden ">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating.rate)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">{product.rating.rate}/5</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            <span className="ml-2 text-xl text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="ml-2 text-red-500">-40%</span>
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Select Colors</h3>
            <div className="flex space-x-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full ${
                    selectedColor === index
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(index)}
                />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Choose Size</h3>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-full ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center mb-6">
            <button
              className="p-2 border rounded-l-md"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={20} />
            </button>
            <span className="px-4 py-2 border-t border-b">{quantity}</span>
            <button
              className="p-2 border rounded-r-md"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={20} />
            </button>
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  userId: 1,
                  quantity: quantity,
                })
              }
              disabled={isAddingToCart}
              className="ml-4 px-12 py-2 bg-black text-white rounded-full flex items-center"
            >
              {isAddingToCart ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  Adding to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <YouMightAlsoLike />
    </div>
  );
}

export default ProductDetail;
