import { useEffect, useState } from "react";
import { createUser, getUsers, updateUser, deleteUser } from "../../service/userAPI";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", status: "active", password: "" });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const handleAddUser = async () => {
    try {
      await createUser(formData);
      setShowAddModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Edit user
  const handleEditUser = async () => {
    try {
      // Only send password if it’s filled
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      await updateUser(selectedUser.id, payload);
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser.id);
      setShowDeleteModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => {
            setFormData({ name: "", email: "", status: "active", password: "" });
            setShowAddModal(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add User
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    {user.name?.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">ID: {user.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${user.status?.toLowerCase() === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                  onClick={() => {
                    setSelectedUser(user);
                    setFormData({ name: user.name, email: user.email, status: user.status, password: "" });
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      {showAddModal && (
        <Modal title="Add User" onClose={() => setShowAddModal(false)} onSave={handleAddUser}>
          <UserForm formData={formData} setFormData={setFormData} />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal title="Edit User" onClose={() => setShowEditModal(false)} onSave={handleEditUser}>
          <UserForm formData={formData} setFormData={setFormData} isEdit />
        </Modal>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete <strong>{selectedUser?.name}</strong>?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
              <button onClick={handleDeleteUser} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable form component
const UserForm = ({ formData, setFormData, isEdit }) => (
  <>
    <input
      type="text"
      placeholder="Name"
      className="border w-full p-2 mb-3"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
    <input
      type="email"
      placeholder="Email"
      className="border w-full p-2 mb-3"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
    {!isEdit && (
      <input
        type="password"
        placeholder="Password"
        className="border w-full p-2 mb-3"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
    )}
    <select
      className="border w-full p-2 mb-4"
      value={formData.status}
      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </>
);

// Reusable modal wrapper
const Modal = ({ title, children, onClose, onSave }) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {children}
      <div className="flex justify-end">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
        <button onClick={onSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
      </div>
    </div>
  </div>
);

export default UserTable;
