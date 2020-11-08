import qs from "qs";
import { useEffect, useState } from "react";
import driw from "../driw";
import { useDispatch } from "react-redux";
import { setError } from "../actions";

export default function Calculator() {
  const cartonsMax = 50;

  const dispatch = useDispatch();

  const [products, setProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [cartons, setCartons] = useState("");
  const [units, setUnits] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    driw
      .get("/products")
      .then((res) => {
        if (res.status !== 200) {
          dispatch(setError(res.data.errorName));
        }
        return res.data;
      })
      .then((data) => {
        const dataObj = {};
        data.forEach((d) => {
          dataObj[d.id] = d;
        });
        setProducts(dataObj);
      })
      .catch((err) => {
        if (!err.response) {
          dispatch(setError("Network error"));
        } else {
          dispatch(setError(err.response.data.errorName));
        }
      });
  }, []);

  const getPrice = () => {
    const c = cartons ? cartons : 0;
    const u = units ? units : 0;
    driw
      .get(
        `/products/${selectedProduct.id}/prices?${qs.stringify({
          quantity: c * selectedProduct.cartonSize + u,
        })}`
      )
      .then((res) => {
        if (res.status !== 200) {
          dispatch(setError(res.data.errorName));
        }
        return res.data;
      })
      .then((data) => {
        setPrice(data.amount);
      })
      .catch((err) => {
        if (!err.response) {
          dispatch(setError("Network error"));
        } else {
          dispatch(setError(err.response.data.errorName));
        }
      });
  };

  const handleProductSelectChange = (e) => {
    setCartons("");
    setUnits("");
    setPrice(0);
    setSelectedProduct(products[e.target.value]);
  };

  const hasProductSelected = () => {
    return selectedProduct && selectedProduct.id ? true : false;
  };

  const handleCartonsChange = (e) => {
    const cartonSize = selectedProduct.cartonSize;
    const currentCartonsMax = cartonsMax - (units ? Math.ceil(units / cartonSize)  : 0);
    const c = Math.max(Math.min(e.target.value, currentCartonsMax), 0);
    setCartons(c === 0 ? "" : c);
  };

  const handleUnitsChange = (e) => {
    const cartonSize = selectedProduct.cartonSize;
    const currentCartonsMax = cartonsMax - (cartons ? cartons : 0);
    const u = Math.max(
      Math.min(e.target.value, currentCartonsMax * cartonSize),
      0
    );
    setUnits(u === 0 ? "" : u);
  };

  return (
    <div className="flex justify-center mt-12">
      <form className="w-full max-w-xl bg-white px-8 py-8 rounded shadow">
        <div className="w-full px-3">
          <label
            className="block uppercase font-semibold text-xs text-gray-700 tracking-wide"
            htmlFor="product"
          >
            Product
          </label>
          <div className="relative mt-2">
            <select
              className="block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:shadow-outline"
              id="product"
              onChange={handleProductSelectChange}
            >
              <option value="">Select...</option>
              {Object.values(products).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex mt-8">
          <div className="w-full px-3">
            <label
              className={`block uppercase font-semibold text-xs text-gray-700 tracking-wide focus:outline-none focus:shadow-outline ${
                !hasProductSelected() ? "opacity-50" : ""
              }`}
              htmlFor="cartons"
            >
              Cartons
            </label>
            <input
              className="block border rounded mt-2 px-4 py-3 w-full bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline"
              type="number"
              id="cartons"
              disabled={!hasProductSelected()}
              value={cartons}
              onChange={handleCartonsChange}
              onBlur={() => {
                if (cartons === "") {
                  setCartons(0);
                }
              }}
            />
          </div>
          <div className="w-full px-3">
            <label
              className={`block uppercase font-semibold text-xs text-gray-700 tracking-wide focus:outline-none focus:shadow-outline ${
                !hasProductSelected() ? "opacity-50" : ""
              }`}
              htmlFor="units"
            >
              Units
            </label>
            <input
              className="block border rounded mt-2 px-4 py-3 w-full bg-gray-200 text-gray-700"
              type="number"
              id="units"
              disabled={!hasProductSelected()}
              value={units}
              onChange={handleUnitsChange}
              onBlur={() => {
                if (units === "") {
                  setUnits(0);
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-between mt-8 px-3">
          <div className="w-full">
            <button
              className={`w-full py-3 px-4 bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold rounded 
                ${!hasProductSelected() ? "opacity-50" : "hover:bg-blue-400"}`}
              type="button"
              disabled={!hasProductSelected()}
              onClick={getPrice}
            >
              Calculate
            </button>
          </div>
        </div>
        <div className="mt-8 px-3">
          <div className="block border rounded px-4 py-3 w-full bg-gray-200 text-gray-600 font-bold text-xl text-center">
            {(price / 100.0).toFixed(2)}
          </div>
        </div>
      </form>
    </div>
  );
}
