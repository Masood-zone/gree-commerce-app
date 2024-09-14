import { Link } from "react-router-dom";
import { truncateDescription } from "../../utils/utils";

const SearchResults: React.FC<{
  results: ProductItem[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}> = ({ results, setSearchQuery }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      <ul>
        {results?.map((item, index) => (
          <li
            key={index}
            className={`mb-2 border-b-2 py-4 flex items-center gap-4 max-[399px]:flex-col`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 rounded"
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">
                <Link
                  to={`/products/${item.id}`}
                  onClick={() => setSearchQuery("")}
                >
                  {item.title}
                </Link>
              </h3>
              <div className="flex items-center justify-between">
                <p>${item.price.toFixed(2)}</p>
                <p className="badge sm:hidden">{item.category}</p>
              </div>
              <p className="max-[399px]:text-sm">
                {truncateDescription(item.description, 100)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
