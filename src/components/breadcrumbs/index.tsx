import { Link } from "react-router-dom";

function Breadcrumbs({
  title,
  category,
}: {
  title: string;
  category?: string;
}) {
  return (
    <div className="breadcrumbs text-sm mb-4">
      <ul>
        <li>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-gray-500 hover:text-gray-800"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-gray-500 hover:text-gray-800"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to={`/products/category/${category}`}
            className="text-gray-500 capitalize hover:text-gray-800"
          >
            {category}
          </Link>
        </li>
        <li>
          <span>{title}</span>
        </li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;
