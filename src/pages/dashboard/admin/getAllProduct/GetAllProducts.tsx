import { useEffect, useState } from "react";
import { useGetAllCarsQuery } from "../../../../redux/fetchers/cars/carApi";
import { Cars } from "../../../products/Products";
import Loader from "../../../shared/Loader";
import GetAllProductBody from "./GetAllProductBody";
import { FaSortAmountDown } from "react-icons/fa";
import { FieldValues } from "react-hook-form";
import { CiFilter } from "react-icons/ci";
import DashboardPagination from "../../components/DashboardPagination";

const GetAllProducts = () => {
  const [sort, setSort] = useState("");
  const [searchItem, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [allFilterValues, setAllFilterValues] = useState<{
    brand: string[];
    color: string[];
    transmission: string[];
    fuelType: string[];
    engineSize: string[];
    warranty: string[];
  }>({ brand: [], color: [], transmission: [], fuelType: [], engineSize: [], warranty: [] });

  const limit = 12;

  const searchFields = {
    sort,
    filter: selectedFilters,
    searchItem,
    page,
    limit,
  };

  const { data, isLoading } = useGetAllCarsQuery(searchFields);

  const products: Cars[] = data?.data?.result ?? [];

  const metaData = data?.data?.meta;

  const handleToggle = () => {
    setToggle(!toggle);
  };


  // Populate allBrands only once when products arrive
  const getUniqueValues = (field: keyof Cars): string[] => {
    return [...new Set(products.map((product) => String(product[field])))];
  };

  // ✅ New: Load all options from products initially
  useEffect(() => {
    if (products.length > 0 && allFilterValues.brand.length == 0) {
      setAllFilterValues({
        brand: getUniqueValues("brand"),
        color: getUniqueValues("color"),
        transmission: getUniqueValues("transmission"),
        fuelType: getUniqueValues("fuelType"),
        engineSize: getUniqueValues("engineSize"),
        warranty: getUniqueValues("warranty")
      });
    }
  }, [products]);

  // Handlers
  const handleSort = (e: FieldValues) => setSort(e.target.value);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedFilters((prev) => {
      const currentValues = prev[field] || [];
      const updatedValues = isChecked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      return {
        ...prev,
        [field]: updatedValues,
      };
    });
  };

  const handleSearch = (e: FieldValues) => setSearchTerm(e.target.value);

  // Early returns after hooks
  if (isLoading) return <Loader />;


  const renderFilterSection = (title: string, field: keyof Cars, values: string[]) => (
    <div className="collapse collapse-plus bg-base-200 dark:bg-gray-900">
      <input type="radio" name="accordion" defaultChecked />
      <div className="collapse-title text-lg font-medium">{title}</div>
      <div className="collapse-content ml-4">
        <ul className="space-y-2 text-sm">
          {values.map((val, index) => (
            <li key={index} className="flex items-center">
              <input
                id={`${field}-${val}`}
                type="checkbox"
                value={val}
                checked={selectedFilters[field]?.includes(val) || false}
                onChange={(e) => handleFilterChange(e, field)}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
              />
              <label htmlFor={`${field}-${val}`} className="ml-2">
                {val}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>)

  return (
    <div className="relative overflow-x-auto max-h-[80vh] min-h-[80vh] shadow-md sm:rounded-lg">
      <div className="mb-4 items-center justify-between space-y-4 mt-4 sm:flex sm:space-y-0 md:mb-8">
        <div>
          <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Products
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="mx-auto max-w-md">
            <form className="relative mx-auto w-max">
              <input
                type="search"
                onChange={handleSearch} placeholder="Search by brand and mode"
                className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4 dark:text-white"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:strokeLime-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>
          </div>

          <div>
            <button
              id="dropdownDefault"
              onClick={handleToggle}
              data-dropdown-toggle="dropdown"
              className="text-black gap-2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center  dark:focus:ring-primary-800 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 group focus:ring-gray-100"
              type="button"
            >
              <CiFilter size={20} />
              Filter by Brand
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            {toggle && (
              <div className="absolute z-10 w-[300px] max-h-[60vh] overflow-y-auto p-4 rounded bg-white dark:bg-gray-800 border dark:border-gray-600 shadow">
                {renderFilterSection("Brand", "brand", allFilterValues.brand)}
                {renderFilterSection("Transmission", "transmission", allFilterValues.transmission)}
                {renderFilterSection("Fuel Type", "fuelType", allFilterValues.fuelType)}
                {renderFilterSection("Engine Size", "engineSize", allFilterValues.engineSize)}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4 rounded-lg border border-gray-200 px-2 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 group focus:ring-gray-100">
            <FaSortAmountDown size={16} />
            <select
              name="sort"
              id="sort"
              onChange={handleSort}
              className="flex w-full items-center justify-center px-3 rounded text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
            >
              <option value="" defaultChecked>
                SortBy
              </option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Model
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Body Type
            </th>
            <th scope="col" className="px-6 py-3">
              Fuel Type
            </th>
            <th scope="col" className="px-6 py-3">
              Engine Size
            </th>
            <th scope="col" className="px-6 py-3">
              warranty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Cars, index: number) => (
            <GetAllProductBody key={product._id} product={product} index={index} />
          ))}
        </tbody>
      </table>
      <div className="my-6">
        <DashboardPagination pageSize={metaData?.limit ?? limit} current={page} onChange={setPage} total={metaData?.total} />
      </div>
    </div>
  );
};

export default GetAllProducts;
