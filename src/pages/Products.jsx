import AdminLayout from "../components/Layout/AdminLayout";
import ProductTable from "../components/Table/ProductTable";
import StatsCard from "../components/Cards/StatsCard";
import ProductPerformanceChart from "../components/Charts/OrderStatusChart";

const Products = () => (
  <AdminLayout>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatsCard 
        title="Total Products" 
        value="1,245" 
        change="+8%" 
        trend="up" 
        icon="🛍️"
      />
      <StatsCard 
        title="Active Products" 
        value="1,120" 
        change="+12" 
        trend="up" 
        icon="✅"
      />
      <StatsCard 
        title="Out of Stock" 
        value="25" 
        change="-3" 
        trend="down" 
        icon="⚠️"
      />
      <StatsCard 
        title="Avg. Price" 
        value="$89.99" 
        change="+5.2%" 
        trend="up" 
        icon="💰"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Product Performance</h2>
          <select className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
        </div>
        <ProductPerformanceChart />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
            <span>Add New Product</span>
            <span>+</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <span>Import Products</span>
            <span>📤</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <span>Manage Inventory</span>
            <span>📊</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
            <span>Bulk Edit</span>
            <span>✏️</span>
          </button>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Product Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your product inventory and listings</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <select className="border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home & Garden</option>
            <option>Toys</option>
          </select>
          <select className="border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Out of Stock</option>
            <option>Draft</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Product
          </button>
        </div>
      </div>
      <ProductTable />
    </div>
  </AdminLayout>
);

export default Products;