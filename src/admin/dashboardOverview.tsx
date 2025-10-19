import useFetchBlogs from "../api/fetchblogs";
import { useFetchSubscribers } from "../api/useFetchSubscribers";
import { useState } from "react";
import PatchNotesPopup from "../components/patchPopup";
interface Blog {
  _id: string;
  title: string;
  intro: string;
}

interface DashboardOverviewProps {
  blogs: Blog[];
  subscribersCount: number;
  onAddBlog: () => void;
  onAddProduct: () => void;
  onViewSubscribers: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onAddBlog,
  onAddProduct,
  onViewSubscribers,
}) => {
  const { blogs } = useFetchBlogs();
  const { subscribers, isLoading } = useFetchSubscribers();

  // Patch notes to show
  const patches = [
    "Updated discord link.",
    "Adding courses section",
  ];

  // State to control popup visibility
  const [showPatchNotes, setShowPatchNotes] = useState(true);

  return (
    <>
      <PatchNotesPopup
        isOpen={showPatchNotes}
        onClose={() => setShowPatchNotes(false)}
        patches={patches}
      />

      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Total Blogs */}
          <div className="bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-semibold">Total Blogs</h3>
            {blogs.length === 0 ? (
              <div className="h-8 w-16 bg-gray-700 animate-pulse rounded mt-2" />
            ) : (
              <p className="text-3xl mt-2">{blogs.length}</p>
            )}
          </div>

          {/* Subscribers */}
          <div className="bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-semibold">Subscribers</h3>
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-700 animate-pulse rounded mt-2" />
            ) : (
              <p className="text-3xl mt-2">{subscribers.length}</p>
            )}
          </div>

          {/* Products */}
          <div className="bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-semibold">Courses</h3>
            {/* Always show skeleton loader since no products yet */}
            <div className="h-8 w-16 bg-gray-600 animate-pulse rounded mt-2" />
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Blogs</h2>
          {blogs.length === 0 ? (
            <p className="text-gray-400">No blogs available.</p>
          ) : (
            <ul className="space-y-3 max-h-48 overflow-y-auto">
              {blogs.slice(0, 5).map((blog) => (
                <li key={blog._id} className="bg-gray-800 p-4 rounded">
                  <h3 className="font-semibold">{blog.title}</h3>
                  <p className="text-gray-400 text-sm truncate">{blog.intro}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={onAddBlog}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add New Blog
            </button>
            <button
              onClick={onAddProduct}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Add New Product
            </button>
            <button
              onClick={onViewSubscribers}
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              View Subscribers
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
