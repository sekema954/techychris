// Frontend (React)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchBlogs from "../api/fetchblogs";

type CommentType = {
  id: string;
  postId: string;
  user: string;
  comment: string;
  date: string;
  content:string;
  timestamp:string;
};

const BlogDetail = () => {
  const { blogs, isLoading, error } = useFetchBlogs();
  const { id } = useParams();
  const post = blogs.find((item) => item.id === id);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/get/comments/?postId=${id}`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to load comments", error);
      }
    };
    if (id) fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !id) return;
  
    const newComment = {
      postId: id,
      author: "Anonymous", // Replace with the logged-in user if available
      content: commentText,
    };
  
    try {
      const res = await fetch("http://localhost:3000/api/post/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
  
      if (res.ok) {
        const savedComment = await res.json();
        setComments((prev) => [...prev, savedComment]);
        setCommentText("");
      } else {
        const error = await res.json();
        console.error(error);
      }
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };
  
  if (isLoading) return <p className="text-white p-5">Loading...</p>;
  if (error) return <p className="text-white p-5">Failed to load blog data</p>;
  if (!post) return <p className="text-white p-5">Blog post not found</p>;

  return (
    <section className="bg-[#3E3A59] text-white py-40 px-4 md:px-10">
      <header className="flex flex-wrap gap-4 text-sm md:text-base mb-6">
        <span className="font-semibold">{post.creator}</span>
        <span>{post.published_date}</span>
        <span>{comments.length} comments</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-auto rounded-lg mb-4"
          />
          <h2 className="text-xl md:text-2xl font-medium mb-6">{post.description}</h2>

          <div className="space-y-6 text-base leading-relaxed">
            <p>{post.intro}</p>
            <p>{post.middle_context}</p>
            <p>{post.conclusion}</p>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Comments ({comments.length})</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddComment();
              }}
              className="flex flex-col gap-4 mb-6"
            >
              <label htmlFor="commentText" className="sr-only">Your Comment</label>
              <textarea
                id="commentText"
                rows={4}
                placeholder="Add a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="bg-[#171723]/70 text-white px-4 py-3 rounded-md resize-none"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`self-start ${!commentText.trim() ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#171723] hover:bg-[#847FAD]'} transition-all duration-300 px-6 py-3 rounded-xl font-semibold`}
              >
                ADD A COMMENT
              </button>
            </form>

            <div className="space-y-5">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-[#000000]/30 p-4 rounded-lg shadow-md flex gap-4"
                >
                  <div className="w-[50px] h-[50px] rounded-full bg-[#847FAD] flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{comment.user}</p>
                    <p className="text-sm text-gray-300">
                      {new Date(comment.timestamp).toISOString().split('T')[0]}
                    </p>
                    <p className="mt-2">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <div className="py-7 mt-5 bg-[#171723] px-3">
            <h1 className="text-[20px]">Categories</h1>
            <div className="flex flex-col gap-6 mt-6">
              {post.categories.map((category, index) => (
                <div key={index}>
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="py-7 mt-5 bg-[#171723] px-3 rounded-lg">
            <h1 className="text-[20px] font-semibold">Recent Posts</h1>
            <div className="flex flex-col gap-5 mt-4">
              {blogs
                .filter((item) => item.id !== id)
                .slice(0, 4)
                .map((item) => (
                  <a
                    key={item.id}
                    href={`/blogDetails/${item.id}`}
                    className="flex gap-3 items-center hover:bg-[#2a293d] p-2 rounded transition"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-white line-clamp-2">{item.title}</p>
                      <p className="text-gray-400 text-xs">{item.published_date}</p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BlogDetail;
