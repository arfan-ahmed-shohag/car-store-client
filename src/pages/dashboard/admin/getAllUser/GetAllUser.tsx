import DashboardPagination from "../../components/DashboardPagination";
import { useGetAllUserQuery } from "../../../../redux/fetchers/users/userAPi";
import Loader from "../../../shared/Loader";
import GetAllUserBody from "./GetAllUserBody";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { FaSortAmountDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";

export type TUser = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: 'male' | 'female' | 'others';
  dob: Date;
  district: string;
  upazila: string;
  postOffice: string;
  postalCode: string;
  about: string;
  profileImg: string | null;
  role: 'user' | 'admin';
  userStatus: 'active' | 'blocked';
  verified: boolean;
};

const GetAllUser = () => {
  const [sort, setSort] = useState("");
  const [toggle, setToggle] = useState(false);
  const [searchItem, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const limit = 10;

  const searchFields = {
    sort,
    filter: {
      userStatus: selectedFilters.userStatus || [],
      verified: selectedFilters.verified || [],
    },
    searchItem,
    page,
    limit,
  };

  const { data, isLoading } = useGetAllUserQuery(searchFields);

  if (isLoading) return <Loader />;

  const users: TUser[] = data?.data?.result || [];
  const metaData = data?.data?.meta;

  const handleSort = (e: FieldValues) => setSort(e.target.value);
  const handleToggle = () => setToggle(!toggle);
  const handleSearch = (e: FieldValues) => setSearchTerm(e.target.value);

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

  return (
    <div className="relative overflow-x-auto max-h-[80vh] shadow-md sm:rounded-lg p-6 rounded-lg">
      <div className="mb-4 items-center justify-between space-y-4 mt-4 sm:flex sm:space-y-0 md:mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Users</h2>

        <div className="flex items-center space-x-4">
          <input
            type="search"
            onChange={handleSearch}
            placeholder="Search by email"
            className="border px-4 py-2 dark:bg-gray-700 dark:text-white rounded-lg"
          />

          <button
            onClick={handleToggle}
            className="border px-4 py-2 rounded-lg dark:border-gray-500 flex items-center gap-2 dark:text-white"
          >
            <CiFilter /> Filter
          </button>

          {toggle && (
            <div className="absolute top-20 z-20 bg-white dark:bg-gray-800 p-4 rounded shadow w-64">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">User Status</h4>
                {["active", "blocked"].map((status) => (
                  <div key={status} className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      value={status}
                      checked={selectedFilters.userStatus?.includes(status) || false}
                      onChange={(e) => handleFilterChange(e, "userStatus")}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700 dark:text-white capitalize">{status}</label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Verified</h4>
                {["true", "false"].map((val) => (
                  <div key={val} className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      value={val}
                      checked={selectedFilters.verified?.includes(val) || false}
                      onChange={(e) => handleFilterChange(e, "verified")}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700 dark:text-white capitalize">
                      {val == "true" ? "Verified" : "Not Verified"}
                    </label>

                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 border rounded-lg dark:border-gray-500 px-2 py-2 dark:bg-gray-800 dark:text-white">
            <FaSortAmountDown size={16} />
            <select onChange={handleSort} className="bg-transparent outline-none">
              <option value="">SortBy</option>
              <option value="asc">CreatedAt: Oldest</option>
              <option value="desc">CreatedAt: Newest</option>
            </select>
          </div>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone Number</th>
            <th className="px-6 py-3">Gender</th>
            <th className="px-6 py-3">Date of Birth</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <GetAllUserBody key={user._id} user={user} index={index} />
          ))}
        </tbody>
      </table>

      <div className="my-6">
        <DashboardPagination
          pageSize={metaData?.limit ?? limit}
          current={page}
          onChange={setPage}
          total={metaData?.total}
        />
      </div>
    </div>
  );
};

export default GetAllUser;
