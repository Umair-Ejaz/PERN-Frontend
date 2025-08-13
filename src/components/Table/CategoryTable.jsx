  import React, { useEffect, useState } from "react";
  import axios from "axios";

  const API_URL = "http://localhost:3001/api/categories"; // adjust your API endpoint

  const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Selected category for edit/delete
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Form data for create/edit
    const [formData, setFormData] = useState({
      name: "",
      products: 0,
      status: "Active",
    });

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    // Handle form input change
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "products" ? Number(value) : value,
      }));
    };

    // Create category
    const handleCreate = async () => {
      try {
        await axios.post(API_URL, formData);
        fetchCategories();
        setShowCreateModal(false);
        setFormData({ name: "", products: 0, status: "Active" });
      } catch (err) {
        console.error("Error creating category:", err);
      }
    };

    // Update category
    const handleUpdate = async () => {
      try {
        await axios.put(`${API_URL}/${selectedCategory.id}`, formData);
        fetchCategories();
        setShowEditModal(false);
        setSelectedCategory(null);
        setFormData({ name: "", products: 0, status: "Active" });
      } catch (err) {
        console.error("Error updating category:", err);
      }
    };

    // Delete category
    const handleDelete = async () => {
      try {
        await axios.delete(`${API_URL}/${selectedCategory.id}`);
        fetchCategories();
        setShowDeleteModal(false);
        setSelectedCategory(null);
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    };

    if (loading) return <p className="p-4">Loading categories...</p>;

    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      {category.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-500">ID: {category.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{category.products}</div>
                  <div className="text-xs text-gray-500">products</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      category.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.lastUpdated || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setFormData({
                        name: category.name,
                        products: category.products,
                        status: category.status,
                      });
                      setShowEditModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination UI (kept static as in your code) */}
        <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              disabled
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{categories.length}</span> of{" "}
                <span className="font-medium">{categories.length}</span> categories
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  disabled
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  &larr;
                </button>
                <button
                  aria-current="page"
                  className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </button>
                <button
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </button>
                <button
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </button>
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  &rarr;
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <Modal
            title="Create Category"
            formData={formData}
            onChange={handleInputChange}
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreate}
          />
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <Modal
            title="Edit Category"
            formData={formData}
            onChange={handleInputChange}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleUpdate}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <ConfirmModal
            title="Delete Category"
            message={`Are you sure you want to delete category "${selectedCategory?.name}"?`}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}

        {/* Add Category Button */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => {
              setFormData({ name: "", products: 0, status: "Active" });
              setShowCreateModal(true);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Add Category
          </button>
        </div>
      </div>
    );
  };

  // Modal Component (for Create & Edit)
  const Modal = ({ title, formData, onChange, onClose, onSubmit }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{title}</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="border p-2 mb-4 rounded w-full"
          placeholder="Category Name"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Number of Products</label>
        <input
          type="number"
          name="products"
          value={formData.products}
          onChange={onChange}
          className="border p-2 mb-4 rounded w-full"
          min={0}
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={onChange}
          className="border p-2 mb-4 rounded w-full"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const ConfirmModal = ({ title, message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  export default CategoryTable;
