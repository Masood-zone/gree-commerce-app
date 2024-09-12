import { useEffect, useState } from "react";
import ProductsList from "../../components/products/productsList";
import { storeApi } from "../../redux/api";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [filteredProducts, setFilteredProducts] = useState<
    {
      id: number;
      name: string;
      title: string;
      price: number;
      image: string;
      category: string;
      rating: {
        rate: number;
        count: number;
      };
    }[]
  >([]);

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = storeApi.useGetCategoriesQuery({});

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = storeApi.useGetProductsQuery({});

  useEffect(() => {
    if (products) {
      let filtered = [...products];
      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }
      switch (sortBy) {
        case "price-low-high":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high-low":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
      }
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-0">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              {categoriesLoading ? (
                <div>Loading categories...</div>
              ) : categoriesError ? (
                <div>Error loading categories</div>
              ) : (
                <ul>
                  <li
                    className={`cursor-pointer py-2 ${
                      selectedCategory === null ? "font-bold" : ""
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </li>
                  {categories?.map((category: string) => (
                    <li
                      key={category}
                      className={`capitalize cursor-pointer py-2 ${
                        selectedCategory === category ? "font-bold" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h2 className="text-xl font-semibold mb-4">Sort By</h2>
              <select
                className="w-full select select-bordered"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="w-full md:w-3/4">
          <ProductsList
            isLoading={productsLoading}
            error={productsError as { data: string } | undefined}
            products={filteredProducts.map((product) => ({
              id: product.id,
              image: product.image,
              title: product.title,
              rating: { rate: product.rating.rate },
              price: product.price,
            }))}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
