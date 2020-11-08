import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import driw from "../driw";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    driw
      .get("/products")
      .then((res) => res.data)
      .then((data) => {
        if (!data.errorCode) {
          setProducts(data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div className="mt-12">
      <div className="rounded-lg shadow overflow-hidden max-w-2xl mx-auto">
        <div className="border-b">
          <table className="w-full bg-white">
            <thead className="text-left uppercase text-xs bg-gray-200 text-gray-600 tracking-wider">
              <tr>
                <th className="px-6 py-2">Name</th>
                <th className="px-6 py-2 text-right">Carton Price</th>
                <th className="px-6 py-2 text-right">Carton Size</th>
                <th className="px-6 py-2"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="px-6 py-2 text-gray-800 text-sm font-medium">
                    {p.name}
                  </td>
                  <td className="px-6 py-2 text-gray-600 text-sm text-right">
                    {(p.cartonPrice / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-2 text-gray-600 text-sm text-right">
                    {p.cartonSize}
                  </td>
                  <td className="pl-6 pr-2 py-2">
                    <Link
                      className="text-sm text-blue-700 px-2 py-1 font-medium hover:text-blue-900"
                      to={`/product-prices/${p.id}`}
                    >
                      Show prices
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
