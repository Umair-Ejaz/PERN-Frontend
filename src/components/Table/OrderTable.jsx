import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/api/orders";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    total_amount: "",
    payment: "cash",
    status: "pending",
    items: [],
  });

  // Helper: Format order items for table
  const formatOrderItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) return "No items";
    return items
      .map((item) => {
        const name = item.Product?.name || "Unknown";
        return `${name} (x${item.quantity})`;
      })
      .join(", ");
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  // Create
  const handleCreate = async () => {
    try {
      await axios.post(API_URL, formData);
      fetchOrders();
      setShowCreateModal(false);
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  // Update
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${selectedOrder.id}`, formData);
      fetchOrders();
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  // Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedOrder.id}`);
      fetchOrders();
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      {/* Create Button */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          onClick={() => {
            setFormData({
              userId: "",
              total_amount: "",
              payment: "cash",
              status: "pending",
              items: [],
            });
            setShowCreateModal(true);
          }}
        >
          + Create Order
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Order</th>
              <th className="px-6 py-3 text-left font-semibold">Customer</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
              <th className="px-6 py-3 text-left font-semibold">Items</th>
              <th className="px-6 py-3 text-left font-semibold">Payment</th>
              <th className="px-6 py-3 text-left font-semibold">Total</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">#{order.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium">{order.User?.name}</div>
                  <div className="text-gray-500">{order.User?.email}</div>
                </td>
                <td className="px-6 py-4">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{formatOrderItems(order.OrderItems)}</td>
                <td className="px-6 py-4">{order.payment}</td>
                <td className="px-6 py-4 font-medium">
                  ${parseFloat(order.total_amount).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-blue-600 hover:underline mr-3"
                    onClick={() => {
                      setSelectedOrder(order);
                      setFormData({
                        userId: order.userId,
                        total_amount: order.total_amount,
                        payment: order.payment,
                        status: order.status,
                        items:
                          order.OrderItems?.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price,
                          })) || [],
                      });
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      setSelectedOrder(order);
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
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <Modal
          title="Create Order"
          formData={formData}
          setFormData={setFormData}
          users={users}
          onSubmit={handleCreate}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          title="Edit Order"
          formData={formData}
          setFormData={setFormData}
          users={users}
          onSubmit={handleUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <ConfirmModal
          title="Delete Order"
          message={`Are you sure you want to delete order #${selectedOrder?.id}?`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

// Create/Edit Modal
const Modal = ({ title, formData, setFormData, onSubmit, onClose, users }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {/* User Dropdown */}
      <select
        value={formData.userId}
        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
        className="border p-2 mb-3 w-full rounded"
      >
        <option value="">Select Customer</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      {/* Total */}
      <input
        type="number"
        placeholder="Total Amount"
        value={formData.total_amount}
        onChange={(e) =>
          setFormData({ ...formData, total_amount: e.target.value })
        }
        className="border p-2 mb-3 w-full rounded"
      />

      {/* Payment */}
      <select
        value={formData.payment}
        onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
        className="border p-2 mb-3 w-full rounded"
      >
        <option value="cash">Cash</option>
        <option value="bank transfer">Bank Transfer</option>
        <option value="paypal">PayPal</option>
        <option value="creditcard">Credit Card</option>
      </select>

      {/* Status */}
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        className="border p-2 mb-3 w-full rounded"
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="delivered">Delivered</option>
      </select>

      {/* Items */}
      <div className="mb-3">
        <h4 className="font-semibold mb-2">Items</h4>
        {formData.items.map((item, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Product ID"
              value={item.productId}
              onChange={(e) => {
                const newItems = [...formData.items];
                newItems[idx].productId = parseInt(e.target.value) || "";
                setFormData({ ...formData, items: newItems });
              }}
              className="border p-2 rounded w-1/3"
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...formData.items];
                newItems[idx].quantity = parseInt(e.target.value) || "";
                setFormData({ ...formData, items: newItems });
              }}
              className="border p-2 rounded w-1/3"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => {
                const newItems = [...formData.items];
                newItems[idx].price = parseFloat(e.target.value) || "";
                setFormData({ ...formData, items: newItems });
              }}
              className="border p-2 rounded w-1/3"
            />
          </div>
        ))}
        <button
          type="button"
          className="text-blue-600 text-sm hover:underline"
          onClick={() =>
            setFormData({
              ...formData,
              items: [
                ...formData.items,
                { productId: "", quantity: "", price: "" },
              ],
            })
          }
        >
          + Add Item
        </button>
      </div>

      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

// Delete Confirmation
const ConfirmModal = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default OrderTable;
