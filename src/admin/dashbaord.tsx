import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Mail,
  LogOut,
} from "lucide-react";
import AdminBlogs from "./sections/manage_blogs";
import Manage_Subscribers from "./sections/manage_subscriber";
import ManageShop from "./sections/manage_shop";

const AdminDashboard:any = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();


  const tabs = [
    { name: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
    { name: "Blogs", icon: FileText, key: "blogs" },
    { name: "Shop", icon: ShoppingCart, key: "shop" },
    { name: "Subscribers", icon: Mail, key: "subscribers" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/admin/login');
  };




  return (
    <section className="min-h-screen bg-gray-950 text-white flex py-30">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
        <nav className="space-y-4">
          {tabs.map(({ name, icon: Icon, key }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === key
                  ? "bg-blue-700"
                  : "hover:bg-gray-800 hover:text-blue-400"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </button>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-3 mt-8 w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-gray-800">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
            <p className="text-gray-400">Welcome! Use the sidebar to manage your platform.</p>
          </div>
        )}
        {activeTab === "blogs" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
            <p className="text-gray-400">View, edit, or create blog posts.</p>
            <AdminBlogs />
          </div>
        )}
        {activeTab === "shop" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Shop</h1>
            <p className="text-gray-400">Add or remove products, view inventory.</p>
            {/* Add product management tools here */}
            <ManageShop />
          </div>
        )}
        {activeTab === "subscribers" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Subscriber Emails</h1>
            <p className="text-gray-400">View and export subscribed emails.</p>
            {/* Add email list UI here */}
            <Manage_Subscribers />
          </div>
        )}
      </main>
    </section>
  );
};

export default AdminDashboard;
