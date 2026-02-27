import { useState } from "react";
import useFetchBlogs from "../../api/fetchblogs";
import MessageAlert from "../../components/messageAlert";
import placeholder from "../../assets/images/placeholder_image.jpg";
import {
  PlusCircle,
  Pencil,
  Trash2,
  ImagePlus,
  Loader2,
  CheckCircle2,
  FileText,
} from "lucide-react";

const initialFormData = {
  title: "",
  slug: "",
  intro: "",
  middle_context: "",
  conclusion: "",
  thumbnail: "",
  hero_image: "",
  categories: "",
  tags: "",
  creator: "",
};

const getApiUrl = () =>
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_PROD_URL
    : import.meta.env.VITE_DEV_URL;

const AdminBlogs = () => {
  const { blogs, isLoading, refetch } = useFetchBlogs();
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<"thumbnail" | "hero_image" | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      const response = await fetch(`${getApiUrl()}/api/upload`, {
        method: "POST",
        body: formDataUpload,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setFormData((prev) => ({ ...prev, [field]: data.url }));
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Failed to upload ${field} image.`);
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
      thumbnail: formData.thumbnail || placeholder,
      hero_image: formData.hero_image || placeholder,
    };
    try {
      const url = getApiUrl();
      const endpoint = isEditing && editId
        ? `${url}/api/update/blogs/${editId}`
        : `${url}/api/post/blogs`;
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      setFormData(initialFormData);
      setIsEditing(false);
      setEditId(null);
      await refetch();
      setMessage({ type: "success", text: isEditing ? "Blog updated successfully." : "Blog added successfully." });
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while submitting. Please try again." });
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
      thumbnail: blog.thumbnail || "",
      hero_image: blog.hero_image || "",
      categories: blog.categories?.join(", ") || "",
      tags: blog.tags?.join(", ") || "",
      creator: blog.creator || "",
    });
    setEditId(blog._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (_id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setDeletingId(_id);
    try {
      const response = await fetch(`${getApiUrl()}/api/delete/blogs/${_id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      await refetch();
      setMessage({ type: "success", text: "Blog deleted successfully." });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete the blog. Please try again." });
    } finally {
      setDeletingId(null);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all duration-200 disabled:opacity-40";

  return (
    <section className="p-6 max-w-5xl mx-auto text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
          <FileText size={18} className="text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Manager</h2>
          <p className="text-white/40 text-sm">Create, edit and manage your posts</p>
        </div>
      </div>

      {message && <MessageAlert type={message.type} text={message.text} />}

      {/* Form Card */}
      <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-5 rounded-full bg-blue-500" />
          <h3 className="font-semibold text-base">
            {isEditing ? "Edit Blog Post" : "New Blog Post"}
          </h3>
          {isEditing && (
            <button
              onClick={() => { setIsEditing(false); setEditId(null); setFormData(initialFormData); }}
              className="ml-auto text-xs text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors"
            >
              Cancel edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Title + Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className={inputClass} disabled={submitLoading} />
            <input type="text" name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} className={inputClass} disabled={submitLoading} />
          </div>

          {/* Row 2: Categories + Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="categories" placeholder="Categories (comma separated)" value={formData.categories} onChange={handleChange} className={inputClass} disabled={submitLoading} />
            <input type="text" name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} className={inputClass} disabled={submitLoading} />
          </div>

          {/* Creator */}
          <input type="text" name="creator" placeholder="Creator" value={formData.creator} onChange={handleChange} className={inputClass} disabled={submitLoading} />

          {/* Image uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(["thumbnail", "hero_image"] as const).map((field) => (
              <div key={field} className="bg-white/[0.02] border border-white/8 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                  {field === "thumbnail" ? "Thumbnail" : "Hero Image"}
                </p>
                <label className="flex items-center gap-2 cursor-pointer group w-fit">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 rounded-lg text-sm text-white/60 hover:text-blue-400 transition-all duration-200">
                    <ImagePlus size={14} />
                    {uploadingField === field ? "Uploading…" : "Choose image"}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingField === field || submitLoading}
                    onChange={(e) => handleImageUpload(e, field)}
                  />
                </label>
                {uploadingField === field && (
                  <div className="flex items-center gap-2 text-yellow-400 text-xs mt-2">
                    <Loader2 size={12} className="animate-spin" /> Uploading…
                  </div>
                )}
                {formData[field] && uploadingField !== field && (
                  <div className="mt-3 relative group/img w-fit">
                    <img src={formData[field]} alt={field} className="h-20 rounded-lg object-cover border border-white/10" />
                    <div className="absolute inset-0 rounded-lg bg-emerald-500/10 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Textareas */}
          {[
            { label: "Introduction", name: "intro" },
            { label: "Middle Context", name: "middle_context" },
            { label: "Conclusion", name: "conclusion" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">{field.label}</label>
              <textarea
                name={field.name}
                placeholder={`Write ${field.label.toLowerCase()}…`}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                rows={4}
                className={inputClass}
                disabled={submitLoading}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={uploadingField !== null || submitLoading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/30 disabled:text-white/30 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30"
          >
            {submitLoading ? <Loader2 size={15} className="animate-spin" /> : <PlusCircle size={15} />}
            {submitLoading ? "Saving…" : isEditing ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>

      {/* Blog List */}
      <div>
        <div className="flex items-center gap-4 mb-5">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">All Posts</h3>
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs text-white/30">{blogs.length} total</span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-white/30">
            <Loader2 size={20} className="animate-spin" /> Loading blogs…
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <FileText size={36} className="mx-auto mb-3 opacity-30" />
            <p>No blogs yet. Create your first post above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog: any) => (
              <div
                key={blog._id}
                className="group flex items-start gap-4 bg-white/[0.03] hover:bg-white/[0.055] border border-white/8 hover:border-white/15 rounded-xl p-4 transition-all duration-200"
              >
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-white/10"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-white/90 truncate">{blog.title}</h3>
                  <p className="text-white/40 text-xs mt-1 line-clamp-1">{blog.intro}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={() => handleEdit(blog)}
                    disabled={submitLoading || deletingId === blog._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-blue-500/15 border border-white/10 hover:border-blue-500/30 text-white/60 hover:text-blue-400 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-40"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(blog._id)}
                    disabled={submitLoading || deletingId === blog._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-40"
                  >
                    {deletingId === blog._id
                      ? <Loader2 size={12} className="animate-spin" />
                      : <Trash2 size={12} />}
                    {deletingId === blog._id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminBlogs;