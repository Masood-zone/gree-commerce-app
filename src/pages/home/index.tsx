import Banner from "../../components/ui/banner";
import {
  BrowseByCategory,
  NewArrivals,
  TopProducts,
} from "../../components/ui/products";

export default function Home() {
  return (
    <section className="bg-white mb-8">
      {/* Banner */}
      <div className="bg-[#f2f0f1]">
        <Banner />
      </div>
      {/* New Arrivals */}
      <NewArrivals />
      {/* Top Products */}
      <TopProducts />
      {/* Browse by Category */}
      <BrowseByCategory />
    </section>
  );
}
