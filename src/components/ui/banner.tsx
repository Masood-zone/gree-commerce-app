import { useNavigate } from "react-router-dom";
import { bannerImage } from "../../assets/images";

function Banner() {
  const navigate = useNavigate();
  return (
    <div className=" container mx-auto px-4 py-12 md:py-0 h-auto lg:h-[90vh] flex flex-col lg:flex-row items-center">
      <div className="md:w-full mb-8 md:mb-0">
        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6 text-primary-900">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p className="text-gray-600 mb-8">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="btn bg-black text-white rounded-full px-12 hover:bg-gray-900"
        >
          Shop Now
        </button>
        <div className="flex justify-between mt-12">
          <div>
            <div className="text-4xl font-bold">200+</div>
            <div className="text-gray-600">International Brands</div>
          </div>
          <div>
            <div className="text-4xl font-bold">2,000+</div>
            <div className="text-gray-600">High-Quality Products</div>
          </div>
          <div>
            <div className="text-4xl font-bold">30,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
        </div>
      </div>
      <div className="md:w-full h-full relative">
        <img src={bannerImage} alt="Stylish couple" className="w-full h-full" />
        <div className="absolute top-0 right-0 w-12 h-12 bg-white transform rotate-45"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-white transform rotate-45"></div>
      </div>
    </div>
  );
}

export default Banner;
