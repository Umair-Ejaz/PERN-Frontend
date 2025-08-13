import React, { useState, useEffect } from "react";
import axios from "axios";

// Status mapping helpers
const mapStatusToFrontend = (status) => {
  switch (status) {
    case "active": return "In Stock";
    case "out of stock": return "Out of Stock";
    case "draft": return "Draft";
    case "inactive": return "Inactive";
    default: return "Draft";
  }
};

const mapStatusToBackend = (status) => {
  switch (status) {
    case "In Stock": return "active";
    case "Out of Stock": return "out of stock";
    case "Draft": return "draft";
    case "Inactive": return "inactive";
    default: return "draft";
  }
};

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    sku: "",
    category: "",
    stock: "",
    price: "",
    status: "In Stock",
    image: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/products");
      const mappedProducts = res.data.map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.SKU,
        category: p.categoryId, // Can replace with category name if available
        stock: p.stock,
        price: p.price,
        status: mapStatusToFrontend(p.status),
        image: p.image || "https://via.placeholder.com/50"
      }));
      setProducts(mappedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const payload = {
        name: formData.name,
        SKU: formData.sku,
        categoryId: formData.category,
        stock: parseInt(formData.stock, 10),
        price: parseFloat(formData.price),
        status: mapStatusToBackend(formData.status),
        image: formData.image
      };

      if (formData.id) {
        await axios.put(`http://localhost:3001/api/products/${formData.id}`, payload);
      } else {
        await axios.post("http://localhost:3001/api/products", payload);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <button
          onClick={() => {
            setFormData({
              id: null,
              name: "",
              sku: "",
              category: "",
              stock: "",
              price: "",
              status: "In Stock",
              image: ""
            });
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">SKU</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover" />
                </td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.sku}</td>
                <td className="border p-2">{p.category}</td>
                <td className="border p-2">{p.stock}</td>
                <td className="border p-2">${p.price}</td>
                <td className="border p-2">{p.status}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="8" className="border p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {formData.id ? "Edit Product" : "Add Product"}
            </h3>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border w-full p-2 mb-2"
            />
            <input
              type="text"
              placeholder="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="border w-full p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Category ID"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border w-full p-2 mb-2"
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="border w-full p-2 mb-2"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border w-full p-2 mb-2"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="border w-full p-2 mb-2"
            >
              <option>In Stock</option>
              <option>Out of Stock</option>
              <option>Draft</option>
              <option>Inactive</option>
            </select>
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="border w-full p-2 mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
