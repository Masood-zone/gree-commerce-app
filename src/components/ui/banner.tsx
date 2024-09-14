import { useNavigate } from "react-router-dom";
import { bannerImage } from "../../assets/images";
import { useEffect, useState } from "react";

function Banner() {
  const navigate = useNavigate();

  return (
    <div className=" container mx-auto px-4 py-12 md:py-0 h-auto lg:h-[90vh] flex flex-col lg:flex-row items-center">
      <div className="md:w-full mb-8 md:mb-0">
        <h1 className="text-4xl lg:text-7xl md:text-5xl font-extrabold leading-tight mb-6 text-primary-900">
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
        <div className="flex justify-between mt-12 max-sm:flex-col max-sm:items- max-sm:justify-center max-sm:text-center max-sm:gap-5">
          <OutReachStats count={200} label="International Brands" />
          <OutReachStats count={2000} label="High-Quality Products" />
          <OutReachStats count={30000} label="Happy Customers" />
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

function OutReachStats({ count, label }: { count: number; label: string }) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    const duration = 6500;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counter);
        setNumber(end);
      } else {
        setNumber(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [count]);

  return (
    <div>
      <div className="text-4xl font-bold">{number.toLocaleString()}+</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

export default Banner;
