import { Link } from "react-router-dom";
import { CheckCircle, Home } from "lucide-react";
import { storeApi } from "../../redux/api";

function CheckoutSuccess() {
  const { data: cart, isLoading, error } = storeApi.useGetCartQuery(1);
  const { data: products } = storeApi.useGetProductsQuery({});

  if (isLoading)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        Error: {error.toString()}
      </div>
    );

  const purchasedItems =
    cart && products
      ? cart[0].products.map(
          (item: { productId: number; quantity: number }) => {
            const product = products.find(
              (p: { id: number; title: string; price: number }) =>
                p.id === item.productId
            );
            return {
              ...product,
              quantity: item.quantity,
            };
          }
        )
      : [];

  const total = purchasedItems.reduce(
    (
      sum: number,
      item: {
        price: number;
        quantity: number;
      }
    ) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="text-green-500 w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6">
            Order Successful!
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {purchasedItems.map(
              (
                item: {
                  title: string;
                  quantity: number;
                  price: number;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 max-[399px]:text-sm py-1"
                >
                  <span>
                    {item.title} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              )
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Link
            to="/"
            className="btn bg-black text-white rounded-full hover:bg-gray-900 w-full flex items-center justify-center"
          >
            <Home className="mr-2" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
