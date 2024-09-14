import { useEffect, useMemo } from "react";
import { Trash2, Tag, ArrowRight } from "lucide-react";
import Breadcrumbs from "../../components/breadcrumbs";
import { storeApi } from "../../redux/api";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const navigate = useNavigate();
  const { data: products, isLoading: productsLoading } =
    storeApi.useGetProductsQuery({});
  const {
    data: carts,
    isLoading: cartsLoading,
    error,
    refetch,
    isUninitialized,
  } = storeApi.useGetCartQuery(1);

  const [deleteCartItem] = storeApi.useDeleteCartItemMutation({});
  const [updateCartItem] = storeApi.useUpdateCartItemMutation({});

  useEffect(() => {
    if (isUninitialized) refetch();
  }, [refetch, isUninitialized]);

  const cartItems: CartItem[] = useMemo(() => {
    if (!carts || !products) return [];
    const latestCart = carts[0]; // Assuming the first cart is the latest
    return latestCart.products.map(
      (item: { productId: number; quantity: number }) => {
        const product = products.find(
          (p: { id: number; title: string; price: number; image: string }) =>
            p.id === item.productId
        );
        return {
          id: item.productId,
          title: product?.title || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
          image:
            product?.image ||
            "/placeholder.svg?height=100&width=100&text=Product",
        };
      }
    );
  }, [carts, products]);

  const updateQuantity = async (id: number, newQuantity: number) => {
    try {
      await updateCartItem({ userId: 1, productId: id, quantity: newQuantity });
      refetch();
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await deleteCartItem(id);
      refetch();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  if (cartsLoading || productsLoading) {
    return <div className="container mx-auto px-4 py-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-5">
        Error loading cart: {error.toString()}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-5">
      <Breadcrumbs title="Your Cart" />

      <h1 className="text-4xl font-bold mb-8">YOUR CART</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {cartItems?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow mb-4 max-[399px]:flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="font-bold mt-2">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center max-[399px]:mr-auto">
                <button
                  className="btn btn-square text-lg"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="mx-2 max-[399px]:mx-5 py-2 max-[399px]:px-4 rounded-md text-xl max-[399px]:text-xl max-[399px]:bg-black max-[399px]:text-white">
                  {item.quantity}
                </span>
                <button
                  className="btn btn-square text-lg"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={20} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-red-500">
              <span>Discount (-20%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex mb-4">
              <div className="relative flex-grow">
                <Tag
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <button className="btn bg-black text-white rounded-full hover:bg-gray-900 ml-2">
                Apply
              </button>
            </div>
            <button
              onClick={() => {
                navigate("/checkout");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn bg-black text-white rounded-full hover:bg-gray-900 w-full"
            >
              Go to Checkout
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
