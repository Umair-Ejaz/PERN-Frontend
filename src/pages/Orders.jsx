import AdminLayout from "../components/Layout/AdminLayout";
import OrderTable from "../components/Table/OrderTable";
import StatsCard from "../components/Cards/StatsCard";
import OrderStatusChart from "../components/Charts/OrderStatusChart";

const Orders = () => (
  <AdminLayout>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatsCard 
        title="Total Orders" 
        value="1,284" 
        change="+12%" 
        trend="up" 
        icon="📦"
      />
      <StatsCard 
        title="Revenue" 
        value="$28,450" 
        change="+8.5%" 
        trend="up" 
        icon="💰"
      />
      <StatsCard 
        title="Avg. Order Value" 
        value="$112.50" 
        change="+3.2%" 
        trend="up" 
        icon="📊"
      />
      <StatsCard 
        title="Pending Orders" 
        value="24" 
        change="-2" 
        trend="down" 
        icon="⏳"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Order Status Overview</h2>
          <select className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>All Time</option>
          </select>
        </div>
        <OrderStatusChart />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Filters</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <span>Pending Orders</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">24</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <span>Completed Orders</span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">1,152</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
            <span>Processing Orders</span>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">108</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
            <span>Cancelled Orders</span>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">16</span>
          </button>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage all customer orders</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <select className="border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          {/* <button className="flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Order
          </button> */}
        </div>
      </div>
      <OrderTable />
    </div>
  </AdminLayout>
);

export default Orders;