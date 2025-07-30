import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    const BASE_URL = import.meta.env.PROD 
    ? `http://localhost:3000/api/admin/login`
    : 'http://localhost:3000/api/admin/login';
    e.preventDefault();
  
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem("authToken", data.token); // store JWT token
        setSuccess(true);
        setError("");
        navigate("/admin/dashboard"); // proper React redirect
      } else {
        setError(data.message || "Login failed");
        setSuccess(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
      setSuccess(false);
    }
  };
  

  return (
    <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {success && (
          <div className="bg-green-600 text-white p-3 rounded mb-4 text-center">
            Login successful!
          </div>
        )}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded text-white font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/admin/register" className="text-blue-400 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
