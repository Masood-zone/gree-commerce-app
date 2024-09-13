import { Twitter, Facebook, Instagram, Github, Mail } from "lucide-react";
import {
  applepayIcon,
  googlepayIcon,
  mastercardIcon,
  paypalIcon,
  visaIcon,
} from "../../assets/svgs";

export default function Footer() {
  return (
    <footer className="">
      {/* Newsletter Section */}
      <div className="bg-black text-white py-8 px-4 rounded-lg mx-4 mb-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-4xl md:text-4xl font-extrabold mb-4 md:mb-0 md:w-1/2">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="relative flex-grow">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="input input-bordered rounded-full w-full pl-10 bg-white text-black"
              />
            </div>
            <button className="btn bg-white rounded-full text-black ">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Gree Mall</h2>
            <p className="text-gray-600 mb-4">
              We have clothes that suits your style and which you're proud to
              wear. From men to women.
            </p>
            <div className="flex space-x-4">
              <Twitter className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <Facebook className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <Instagram className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <Github className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
          </div>

          {/* Footer Links */}
          {["COMPANY", "HELP", "FAQ", "RESOURCES"].map((category, index) => (
            <div key={index}>
              <h3 className="font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {["About", "Features", "Works", "Career"].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and Payment Methods */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            Gree Mall © 2023-2024, All Rights Reserved
          </p>
          <div className="flex space-x-1">
            {["visa", "mastercard", "paypal", "applepay", "googlepay"].map(
              (payment, index) => {
                if (payment === "visa") {
                  return (
                    <img
                      src={visaIcon}
                      alt="Visa"
                      key={index}
                      className="cursor-pointer"
                    />
                  );
                } else if (payment === "mastercard") {
                  return (
                    <img
                      src={mastercardIcon}
                      alt="Mastercard"
                      key={index}
                      className="cursor-pointer"
                    />
                  );
                } else if (payment === "paypal") {
                  return (
                    <img
                      src={paypalIcon}
                      alt="Paypal"
                      key={index}
                      className="cursor-pointer"
                    />
                  );
                } else if (payment === "applepay") {
                  return (
                    <img
                      src={applepayIcon}
                      alt="Apple Pay"
                      key={index}
                      className="cursor-pointer"
                    />
                  );
                } else {
                  return (
                    <img
                      src={googlepayIcon}
                      alt="Google Pay"
                      key={index}
                      className="cursor-pointer"
                    />
                  );
                }
              }
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
