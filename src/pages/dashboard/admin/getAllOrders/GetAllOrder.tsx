import  { useState } from "react";
import { useGetAllOrdersQuery } from "../../../../redux/fetchers/orders/orderApi";
import { Cars } from "../../../products/Products";
import { TUser } from "../getAllUser/GetAllUser";
import Loader from "../../../shared/Loader";
import OrderBody from "./OrderBody";
import DashboardPagination from "../../components/DashboardPagination";

export type Order = {
  _id: string;
  car: Cars;
  user: TUser;
  quantity: number;
  paymentStatus: string;
  status: string;
  totalPrice: number;
};

const GetAllOrder = () => {
  // Filter / search / sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const limit = 10

  // Fetch orders with filters applied
  const { data, isLoading } = useGetAllOrdersQuery({
    searchTerm,
    status,
    paymentStatus,
    sortBy: "createdAt",
    sortOrder,
    page,
  limit,
  });

  const orders = data?.data?.result || [];
  const meta = data?.data?.meta;

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl flex-1">
            Orders
          </h2>
        <input
          type="text"
          placeholder="Search by customer email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md flex-grow max-w-lg min-w-[100px]"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="delivered">Delivered</option>
        </select>

        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Payment Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="p-2 border rounded-md"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Loading */}
      {isLoading ? (
        <Loader />
      ) : orders.length == 0 ? (
        <div className="flex items-center min-h-[calc(80vh)] justify-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-5xl">
            No orders found
          </h2>
        </div>
      ) : (
        <div className="relative overflow-x-auto max-h-[80vh] shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
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
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order, index: number) => (
            <OrderBody key={order._id} order={order} index={index} />
          ))}
            </tbody>
          </table>
        </div>
      )}
<div className="my-6">
        <DashboardPagination pageSize={meta?.limit ?? limit} current={page} onChange={setPage} total={meta?.total} />
      </div>
    </div>
  );
};

export default GetAllOrder;
