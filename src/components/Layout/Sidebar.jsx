import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FiMenu, 
  FiX,
  FiUsers,
  FiGrid,
  FiShoppingBag,
  FiPackage,
  FiZap,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: "/users", name: "Users", icon: <FiUsers size={20} /> },
    { path: "/categories", name: "Categories", icon: <FiGrid size={20} /> },
    { path: "/products", name: "Products", icon: <FiShoppingBag size={20} /> },
    { path: "/orders", name: "Orders", icon: <FiPackage size={20} /> },
  ];

  const bottomNavItems = [
    { path: "/settings", name: "Settings", icon: <FiSettings size={20} /> },
    { path: "/logout", name: "Logout", icon: <FiLogOut size={20} /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed z-50 top-4 left-4 p-3 rounded-lg bg-indigo-600 text-white shadow-lg md:hidden hover:bg-indigo-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 w-72 h-full bg-gradient-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 ease-in-out ${
          isOpen ? "left-0" : "-left-full md:left-0"
        }`}
      >
        <div className="h-full p-4 flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 font-bold text-2xl mb-8 flex items-center gap-3">
            <FiZap className="text-indigo-300" size={24} />
            <span>Admin Panel</span>
          </div>
          
          {/* Main Navigation */}
          <ul className="space-y-1 flex-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => isMobile && setIsOpen(false)}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-indigo-700 shadow-md"
                      : "hover:bg-indigo-600/50"
                  }`}
                >
                  <span className="mr-3 text-indigo-200">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Bottom Navigation */}
          <ul className="space-y-1 mb-4">
            {bottomNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => isMobile && setIsOpen(false)}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-indigo-700 shadow-md"
                      : "hover:bg-indigo-600/50"
                  }`}
                >
                  <span className="mr-3 text-indigo-200">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Version Info */}
          <div className="p-3 text-indigo-300 text-xs flex items-center justify-between border-t border-indigo-700/50">
            <span>v1.0.0</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;