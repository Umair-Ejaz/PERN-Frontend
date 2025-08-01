import AdminLayout from "../components/Layout/AdminLayout";
import CategoryTable from "../components/Table/CategoryTable";
import StatsCard from "../components/Cards/StatsCard";
import CategoryChart from "../components/Charts/CategoryChart";

const Categories = () => (
  <AdminLayout>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatsCard 
        title="Total Categories" 
        value="24" 
        change="+3%" 
        trend="up" 
        icon="🗂️"
      />
      <StatsCard 
        title="Active Categories" 
        value="18" 
        change="+2" 
        trend="up" 
        icon="✅"
      />
      <StatsCard 
        title="Products Assigned" 
        value="1,245" 
        change="+15%" 
        trend="up" 
        icon="📦"
      />
      <StatsCard 
        title="Inactive Categories" 
        value="6" 
        change="-1" 
        trend="down" 
        icon="⏸️"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Category Distribution</h2>
          <select className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <CategoryChart />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
            <span>Add New Category</span>
            <span>+</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <span>Export Categories</span>
            <span>↓</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <span>Manage Hierarchy</span>
            <span>↕️</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
            <span>Bulk Edit</span>
            <span>✏️</span>
          </button>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Category Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all product categories and their hierarchy</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <span className="mr-2">🔄</span>
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <span className="mr-2">+</span>
            Add Category
          </button>
        </div>
      </div>
      <CategoryTable />
    </div>
  </AdminLayout>
);

export default Categories;