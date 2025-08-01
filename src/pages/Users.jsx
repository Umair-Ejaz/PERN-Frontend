import AdminLayout from "../components/Layout/AdminLayout";
import UserTable from "../components/Table/UserTable";
import StatsCard from "../components/Cards/StatsCard";

const Users = () => (
  <AdminLayout>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatsCard title="Total Users" value="1,234" change="+12%" trend="up" />
      <StatsCard title="Active Today" value="456" change="+5%" trend="up" />
      <StatsCard title="New This Week" value="78" change="-2%" trend="down" />
      <StatsCard title="Banned Users" value="23" change="+0.5%" trend="neutral" />
    </div>
    
    <div className="bento-box bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add New User
        </button>
      </div>
      <UserTable />
    </div>
  </AdminLayout>
);

export default Users;