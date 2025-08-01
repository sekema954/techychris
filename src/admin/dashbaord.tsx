import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Mail,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import AdminBlogs from "./sections/manage_blogs";
import Manage_Subscribers from "./sections/manage_subscriber";
import ManageShop from "./sections/manage_shop";
import DashboardOverview from "../admin/dashboardOverview";
import useFetchBlogs from "../api/fetchblogs";
import { useFetchSubscribers } from "../api/useFetchSubscribers";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { blogs } = useFetchBlogs();
  const { subscribers } = useFetchSubscribers();

  const tabs = [
    { name: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
    { name: "Blogs", icon: FileText, key: "blogs" },
    { name: "Shop", icon: ShoppingCart, key: "shop" },
    { name: "Subscribers", icon: Mail, key: "subscribers" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/admin/login";
  };

  const handleAddBlog = () => setActiveTab("blogs");
  const handleAddProduct = () => setActiveTab("shop");
  const handleViewSubscribers = () => setActiveTab("subscribers");

  return (
    <section className="min-h-screen bg-gray-950 text-white flex flex-col lg:flex-row relative">
      {/* Mobile Menu Toggle */}
      <button
        className="absolute top-4 left-4 z-50 lg:hidden text-white"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-gray-900 w-64 p-6 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex-shrink-0`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
        <nav className="space-y-4">
          {tabs.map(({ name, icon: Icon, key }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setIsSidebarOpen(false); // auto-close on mobile
              }}
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 mt-8 w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-auto mt-16 lg:mt-0">
        {activeTab === "dashboard" && (
          <DashboardOverview
            blogs={blogs}
            subscribersCount={subscribers.length}
            onAddBlog={handleAddBlog}
            onAddProduct={handleAddProduct}
            onViewSubscribers={handleViewSubscribers}
          />
        )}
        {activeTab === "blogs" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
            <p className="text-gray-400 mb-4">View, edit, or create blog posts.</p>
            <AdminBlogs />
          </div>
        )}
        {activeTab === "shop" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Shop</h1>
            <p className="text-gray-400 mb-4">Add or remove products, view inventory.</p>
            <ManageShop />
          </div>
        )}
        {activeTab === "subscribers" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Subscriber Emails</h1>
            <p className="text-gray-400 mb-4">View and export subscribed emails.</p>
            <Manage_Subscribers />
          </div>
        )}
      </main>
    </section>
  );
};

export default AdminDashboard;
