import { Link } from "react-router-dom";
import { truncateDescription } from "../../utils/utils";

const SearchResults: React.FC<{ results: ProductItem[] }> = ({ results }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      <ul>
        {results?.map((item, index) => (
          <li
            key={index}
            className={`mb-2 border-b-2 py-4 flex items-center gap-4`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 rounded"
            />
            <div>
              <h3 className="font-semibold">
                <Link to={`/products/${item.title}`}>{item.title}</Link>
              </h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p className="">{truncateDescription(item.description)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
