import { useState } from "react";
import useFetchBlogs from "../../api/fetchblogs";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      categories: formData.categories.split(",").map((c) => c.trim()),
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    try {
      let response;
      if (isEditing && editId) {
        response = await fetch(`http://localhost:3000/api/blogs/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch("http://localhost:3000/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      setFormData(initialFormData);
      setIsEditing(false);
      setEditId(null);
      refetch();
    } catch (err) {
      console.error("Failed to submit blog:", err);
      alert("An error occurred while submitting the blog. Please try again.");
    }
  };

  const handleEdit = (blog: any) => {
    // Handle data population for form fields, ensuring array properties (tags, categories) are correctly converted to a string
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      intro: blog.intro || "",
      middle_context: blog.middle_context || "",
      conclusion: blog.conclusion || "",
      content: blog.content || "",
      thumbnail: blog.thumbnail || "",
      hero_image: blog.hero_image || "",
      categories: blog.categories?.join(", ") || "", // Ensure categories are a comma-separated string
      tags: blog.tags?.join(", ") || "", // Ensure tags are a comma-separated string
      creator: blog.creator || "",
    });
  
    // Set the editing state to true and the blog ID to edit
    setEditId(blog.id);
    setIsEditing(true);
  };
  

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }
      refetch();
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("An error occurred while deleting the blog. Please try again.");
    }
  };

  return (
    <section className="p-6 max-w-6xl mx-auto text-white bg-gray-900">
      <h2 className="text-3xl font-bold mb-6">Admin Blog Manager</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg mb-10">
        {[
          { label: "Title", name: "title" },
          { label: "Slug", name: "slug" },
          { label: "Thumbnail URL", name: "thumbnail" },
          { label: "Hero Image URL", name: "hero_image" },
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
          />
        ))}

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
          />
        ))}

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
        >
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
                  onClick={() => handleEdit(blog)}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                >
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
