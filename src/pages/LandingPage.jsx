import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";

const CATEGORY_URL = "http://localhost:3000/api/categories";
const PRODUCT_URL = "http://localhost:3000/api/products";

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(CATEGORY_URL)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    axios.get(PRODUCT_URL)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = filterCategory
    ? products.filter(p => p.categoryId === filterCategory)
    : products;

  return (
    <div className="p-6">
      {/* Categories */}
      <div className="flex gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded ${filterCategory === "" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          onClick={() => setFilterCategory("")}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded ${filterCategory === cat.id ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilterCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
            <img src={product.image || "/placeholder.jpg"} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-indigo-600 font-bold">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-bold mb-3">Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items in cart</p>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LandingPage;