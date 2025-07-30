import { useState } from "react";
import useFetchBlogs from "../../api/fetchblogs";
import MessageAlert from "../../components/messageAlert";

const initialFormData = {
  title: "",
  slug: "",
  intro: "",
  middle_context: "",
  conclusion: "",
  content: "",
  thumbnail: "",
  hero_image: "",
  categories: "",
  tags: "",
  creator: "",
};

const AdminBlogs = () => {
  const { blogs, isLoading, refetch } = useFetchBlogs();
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [uploadingField, setUploadingField] = useState<"thumbnail" | "hero_image" | null>(null);

  // New loading states for buttons
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Message state for alerts
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "thumbnail" | "hero_image"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(field);

    try {
      const BASE_URL = import.meta.env.PROD
      ? `${import.meta.env.VITE_HEROKU_URL}/api/upload`
      :'http://localhost:3000/api/upload';
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await fetch(BASE_URL, {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        [field]: data.url,
      }));
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Failed to upload ${field} image. Please try again.`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    const payload = {
      ...formData,
      categories: formData.categories.split(",").map((c) => c.trim()),
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    try {
      const BASE_URL = import.meta.env.PROD
      ?`${import.meta.env.VITE_HEROKU_URL}/api/blogs/${editId}`
      :`http://localhost:3000/api/blogs/${editId}`;
      let response;
      if (isEditing && editId) {
        response = await fetch(BASE_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        const BASE_URL = import.meta.env.PROD
        ?`${import.meta.env.VITE_HEROKU_URL}/api/blogs`
        :'http://localhost:3000/api/blogs'
        response = await fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData}: ${response.status}`);
      }

      setFormData(initialFormData);
      setIsEditing(false);
      setEditId(null);

      // Optimistically update UI by refetching data after submit
      await refetch();

      setMessage({ type: "success", text: isEditing ? "Blog updated successfully." : "Blog added successfully." });
    } catch (err) {
      console.error("Failed to submit blog:", err);
      setMessage({ type: "error", text: "An error occurred while submitting the blog. Please try again." });
    } finally {
      setSubmitLoading(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const handleEdit = (blog: any) => {
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      intro: blog.intro || "",
      middle_context: blog.middle_context || "",
      conclusion: blog.conclusion || "",
      content: blog.content || "",
      thumbnail: blog.thumbnail || "",
      hero_image: blog.hero_image || "",
      categories: blog.categories?.join(", ") || "",
      tags: blog.tags?.join(", ") || "",
      creator: blog.creator || "",
    });

    setEditId(blog.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    setDeletingId(id);


    try {
      const BASE_URL = import.meta.env.PROD
      ? `${import.meta.env.VITE_HEROKU_URL}/api/blogs/${id}`
      :`http://localhost:3000/api/blogs/${id}`;
      const response = await fetch(BASE_URL, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }

      // Refetch updated blog list after delete
      await refetch();

      setMessage({ type: "success", text: "Blog deleted successfully." });
    } catch (err) {
      console.error("Failed to delete blog:", err);
      setMessage({ type: "error", text: "An error occurred while deleting the blog. Please try again." });
    } finally {
      setDeletingId(null);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <section className="p-6 max-w-6xl mx-auto text-white bg-gray-900">
      <h2 className="text-3xl font-bold mb-6">Admin Blog Manager</h2>

      {message && <MessageAlert type={message.type} text={message.text} />}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-800 p-6 rounded-lg mb-10"
      >
        {[
          { label: "Title", name: "title" },
          { label: "Slug", name: "slug" },
          { label: "Categories (comma separated)", name: "categories" },
          { label: "Tags (comma separated)", name: "tags" },
          { label: "Creator", name: "creator" },
        ].map((input) => (
          <input
            key={input.name}
            type="text"
            name={input.name}
            placeholder={input.label}
            value={(formData as any)[input.name]}
            onChange={handleChange}
            className="w-full p-3 rounded text-white bg-gray-700"
            disabled={submitLoading}
          />
        ))}

        {/* Upload Thumbnail */}
        <div>
          <label className="block text-sm mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            disabled={uploadingField === "thumbnail" || submitLoading}
            onChange={(e) => handleImageUpload(e, "thumbnail")}
            className="block w-full text-sm text-gray-400 file:bg-purple-700 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
          />
          {uploadingField === "thumbnail" ? (
            <p className="text-sm text-yellow-400 mt-1">Uploading thumbnail...</p>
          ) : formData.thumbnail ? (
            <img
              src={formData.thumbnail}
              alt="Thumbnail"
              className="mt-2 h-24 rounded"
            />
          ) : null}
        </div>

        {/* Upload Hero Image */}
        <div>
          <label className="block text-sm mb-1">Hero Image</label>
          <input
            type="file"
            accept="image/*"
            disabled={uploadingField === "hero_image" || submitLoading}
            onChange={(e) => handleImageUpload(e, "hero_image")}
            className="block w-full text-sm text-gray-400 file:bg-purple-700 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
          />
          {uploadingField === "hero_image" ? (
            <p className="text-sm text-yellow-400 mt-1">Uploading hero image...</p>
          ) : formData.hero_image ? (
            <img
              src={formData.hero_image}
              alt="Hero"
              className="mt-2 h-24 rounded"
            />
          ) : null}
        </div>

        {[
          { label: "Intro", name: "intro" },
          { label: "Middle Context", name: "middle_context" },
          { label: "Conclusion", name: "conclusion" },
          { label: "Content", name: "content" },
        ].map((field) => (
          <textarea
            key={field.name}
            name={field.name}
            placeholder={field.label}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded text-white bg-gray-700"
            disabled={submitLoading}
          />
        ))}

        <button
          type="submit"
          className={`bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white disabled:opacity-50 flex items-center justify-center gap-2`}
          disabled={uploadingField !== null || submitLoading}
        >
          {submitLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {isEditing ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-center">Loading blogs...</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog: any) => (
            <div key={blog.id} className="bg-gray-800 p-5 rounded shadow-md">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{blog.intro}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(blog)}
                  disabled={submitLoading || deletingId === blog.id}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-sm disabled:opacity-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(blog.id)}
                  disabled={submitLoading || deletingId === blog.id}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deletingId === blog.id && (
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  )}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminBlogs;
