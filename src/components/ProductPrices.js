import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import qs from "qs";
import driw from "../driw";
import PaginationNav from "./PaginationNav";

export default function ProductPrices() {
  const tableMaxRowCount = 10;
  const pageCount = 50 / tableMaxRowCount;

  const { id } = useParams();

  const [page, setPage] = useState(0);
  const [productPrices, setProductPrices] = useState([]);

  const getProducts = (newpage) => {
    driw
      .get(
        `/products/${id}/prices/collection?${qs.stringify({
          size: tableMaxRowCount,
          page: newpage,
        })}`
      )
      .then((res) => res.data)
      .then((data) => {
        if (!data.errorCode) {
          setPage(newpage);
          setProductPrices(data);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getProducts(0);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-12">
      <div className="rounded-lg shadow overflow-hidden max-w-lg mx-auto">
        <div className="border-b">
          <table className="w-full bg-white">
            <thead className="text-left uppercase text-xs bg-gray-200 text-gray-600 tracking-wider">
              <tr>
                <th className="px-8 py-2">Quantity</th>
                <th className="px-8 py-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {productPrices.map((price, i) => (
                <tr key={i} className="border-b">
                  <td className="px-8 py-2 text-gray-800 font-medium">
                    {price.quantity}
                    <span className="ml-2 text-gray-500 font-normal text-sm">
                      {price.product.name}
                    </span>
                  </td>
                  <td className="px-8 py-2 text-gray-600 text-sm text-right">
                    {(price.amount / 100.0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="float-right shadow-sm m-2">
          <PaginationNav
            page={page}
            onPageChange={(newpage) => {
              getProducts(newpage);
            }}
            pageCount={pageCount}
          />
        </div>
      </div>
    </div>
  );
}
