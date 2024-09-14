import {
  ChevronDown,
  ChevronUp,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "../../redux/store";
import Auth from "../../pages/auth/auth";
import { userActions } from "../../redux/user.slice";
import { Link } from "react-router-dom";
import { storeApi } from "../../redux/api";

function Navbar() {
  const dispatch = useDispatch();
  const userData = localStorage.getItem("persist:gree-commerce-portal");
  const user = userData ? JSON.parse(JSON.parse(userData).user || "{}") : null;
  const logout = userActions;

  const [state, setState] = useState({
    sideMenu: false,
    searchOpen: false,
    authModal: false,
    type: "login",
    dropdown: false,
    menu: false,
    searchQuery: "",
    filteredProducts: [],
    showNoResults: false,
  });

  const {
    data: categories,
    isLoading,
    error,
  } = storeApi.useGetCategoriesQuery({});
  const {
    data: products,
    isLoading: searchLoading,
    error: searchError,
  } = storeApi.useGetProductsQuery({});

  const handleSearch = useCallback(() => {
    const filtered = products?.filter((product: ProductItem) =>
      product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
    setState((prev) => ({
      ...prev,
      filteredProducts: filtered?.length > 0 ? filtered : [],
      showNoResults: !filtered.length,
    }));
  }, [state.searchQuery, products]);

  useEffect(() => {
    const timer = setTimeout(handleSearch, 300);
    return () => clearTimeout(timer);
  }, [state.searchQuery, handleSearch]);

  const toggle = useCallback(
    (key: keyof typeof state) => () =>
      setState((prev) => ({ ...prev, [key]: !prev[key] })),
    []
  );

  const switchAuthType = useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        type: prev.type === "login" ? "signup" : "login",
      })),
    []
  );

  return (
    <div className="bg-white relative">
      <nav className="container mx-auto py-4 flex items-center">
        <div className="md:w-1/2 w-full space-x-2 flex items-center">
          <button
            className="md:hidden lg:hidden"
            onClick={state.sideMenu ? toggle("sideMenu") : undefined}
          >
            {state.sideMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          {!state.sideMenu && (
            <span className="text-3xl font-bold max-sm:text-2xl">
              <Link to="/" className="cursor-pointer">
                Gree Mall
              </Link>
            </span>
          )}
        </div>
        <div className="hidden lg:flex space-x-6 w-full">
          <div tabIndex={0} className="dropdown dropdown-start">
            <label
              onClick={state.menu ? toggle("menu") : undefined}
              className="cursor-pointer flex items-center"
            >
              Shop
              {state.menu ? (
                <ChevronUp size={16} className="ml-1" />
              ) : (
                <ChevronDown size={16} className="ml-1" />
              )}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-none z-[1] w-52 p-2 shadow mt-7"
            >
              {isLoading ? (
                <div className="flex items-center gap-4 mx-auto justify-center">
                  <span className="loading loading-spinner loading-lg"></span>{" "}
                  Loading...
                </div>
              ) : error ? (
                <div className="text-red-500">Failed to fetch</div>
              ) : (
                categories.map((category: string) => (
                  <li key={category} className="px-2 py-2 capitalize">
                    <Link to={`/products/category/${category}`}>
                      {category}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <a href="#" className="hover:text-gray-600">
            On Sale
          </a>
          <a href="#" className="hover:text-gray-600">
            New Arrivals
          </a>
          <a href="#" className="hover:text-gray-600">
            Brands
          </a>
        </div>
        <div className="flex items-center space-x-4 w-full justify-center">
          <label className="input input-bordered flex items-center rounded-full gap-2 w-full relative max-md:hidden">
            <input
              type="text"
              value={state.searchQuery}
              onChange={(e) =>
                setState((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              className="grow"
              placeholder="Search"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Search size={24} />
          </label>
          <button
            onClick={state.searchOpen ? toggle("searchOpen") : undefined}
            className="md:hidden lg:hidden"
          >
            <Search size={24} className="cursor-pointer" />
          </button>
          {state.searchQuery !== "" && (
            <div className="absolute top-20 w-[95%] md:max-w-7xl h-96 mx-auto shadow-2xl z-20 p-4 flex items-center left-0 right-0 border justify-center bg-white overflow-y-scroll max-sm:mt-14 max-[499px]:mt-14">
              {searchLoading ? (
                <div className="flex items-center gap-4 mx-auto justify-center">
                  <span className="loading loading-spinner loading-lg"></span>{" "}
                  Loading...
                </div>
              ) : searchError ? (
                <div className="text-center text-red-500 font-semibold">
                  Something went wrong. Please try again later.
                </div>
              ) : state.filteredProducts.length > 0 ? (
                <SearchResults results={state.filteredProducts} />
              ) : state.showNoResults ? (
                <p className="text-xl font-semibold text-red-500">
                  Query not found, Please try again!
                </p>
              ) : null}
            </div>
          )}
          {user?.isAuthenticating ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                Hello,{" "}
                <span className="badge badge-md badge-info">
                  {user.user.username}
                </span>
              </span>
              <button onClick={toggle("dropdown")}>
                <User size={24} className="cursor-pointer" />
              </button>
              <Link
                to="/cart"
                className="flex items-center gap-2 cursor-pointer"
              >
                <ShoppingCart size={24} className="cursor-pointer" />
              </Link>
              {state.dropdown && (
                <ul className="absolute w-32 top-14 right-3 bg-white shadow-lg flex flex-col z-10">
                  <li className="hover:text-gray-600 hover:bg-gray-200 px-2 py-2">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="hover:text-gray-600 hover:bg-gray-200 px-2 py-2">
                    <button
                      onClick={() => {
                        dispatch(logout.logout());
                        window.location.reload();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    authModal: true,
                    type: "login",
                  }))
                }
              >
                Login
              </button>
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    authModal: true,
                    type: "signup",
                  }))
                }
              >
                Signup
              </button>
            </div>
          )}
        </div>
        <div
          className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 z-40 ${
            state.sideMenu ? "block" : "hidden"
          }`}
          onClick={toggle("sideMenu")}
        ></div>
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
            state.sideMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="py-4 px-8 flex justify-between items-center">
            <span className="text-xl font-bold">Gree Mall</span>
            <button onClick={toggle("sideMenu")}>
              <X size={24} />
            </button>
          </div>
          <div className="py-4 px-8">
            <div className="">
              <label
                onClick={toggle("menu")}
                className="cursor-pointer flex items-center"
              >
                Shop
                {state.menu ? (
                  <ChevronUp size={16} className="ml-1" />
                ) : (
                  <ChevronDown size={16} className="ml-1" />
                )}
              </label>
              {state.menu && (
                <ul className="menu bg-gray-100 pl-0">
                  {categories.map((category: string) => (
                    <li key={category} className="capitalize">
                      <Link to={`/products/category/${category}`}>
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <a href="#" className="block py-2">
              On Sale
            </a>
            <a href="#" className="block py-2">
              New Arrivals
            </a>
            <a href="#" className="block py-2">
              Brands
            </a>
          </div>
        </div>
      </nav>

      {/* Auth modal */}
      {state.authModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Auth
            onModal={toggle("authModal")}
            type={state.type}
            setType={switchAuthType}
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
