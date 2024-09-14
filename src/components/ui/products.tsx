import { useNavigate } from "react-router-dom";
import { storeApi } from "../../redux/api";
import ProductsList from "../products/productsList";

export const NewArrivals = () => {
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    error,
  } = storeApi.useGetNewProductsQuery({});

  return (
    <div className="container mx-auto px-4 py-10 border-b-2 ">
      <h2 className="text-4xl text-black font-extrabold text-center mb-8 uppercase">
        new arrivals
      </h2>
      {/* Products List */}
      <ProductsList
        products={products}
        isLoading={isLoading}
        error={error as { data: string } | undefined}
      />
      {/* Button */}
      {error ? (
        ""
      ) : (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="btn btn-outline rounded-full px-16"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export const TopProducts = () => {
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    error,
  } = storeApi.useGetTopProductsQuery({});

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl text-black font-extrabold text-center mb-8 uppercase">
        Top Selling
      </h2>
      {/* Products List */}
      <ProductsList
        products={products}
        isLoading={isLoading}
        error={error as { data: string } | undefined}
      />
      {/* Button */}
      {error ? (
        ""
      ) : (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="btn btn-outline rounded-full px-16"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};
