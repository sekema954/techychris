import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    code: "",
  });

  const [success, setSuccess] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isError, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      // Validate password live for border color
      if (!passwordRegex.test(value)) {
        setPasswordError(
          "Password must be at least 8 characters, include uppercase and lowercase letters, and at least one number."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters, include uppercase and lowercase letters, and at least one number."
      );
      return;
    }

    try {
      const res = await fetch('https://techychris-e3f874ff6641.herokuapp.com/api/admin/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Admin Registered:", data);
        setSuccess(true);
        setFormData({ fullname: "", email: "", password: "", code: "" });
        setPasswordError("");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error:any) {
      console.error("Error registering admin:", error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Registration</h2>

        {success && (
          <div className="bg-green-600 text-white p-3 rounded mb-4 text-center">
            Registration successful!
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            autoComplete="off"
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            autoComplete="off"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password input with toggle eye and validation border */}
          <div className="relative">
            <input
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className={`px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 ${
                passwordError
                  ? "focus:ring-red-500 border-2 border-red-500"
                  : formData.password.length > 0
                  ? "focus:ring-green-500 border-2 border-green-500"
                  : "focus:ring-blue-500"
              } pr-10`}
            />
            {/* Toggle eye icon */}
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div className="relative">
            <input
              autoComplete="off"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Admin Secret Code"
              required
              className="px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-red-500 pr-10"
            />
            {/* Question mark icon */}
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 cursor-pointer select-none"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label="What is this?"
              role="tooltip-trigger"
            >
              ?
            </span>

            {/* Tooltip popup */}
            {showTooltip && (
              <div className="absolute right-10 top-full mt-1 w-64 bg-gray-700 text-white text-sm rounded px-3 py-2 shadow-lg z-10">
                Enter the secret code provided by the system administrator to register as an admin.
              </div>
            )}
          </div>

          {/* Show isError message below code input */}
          {isError && (
            <p className="text-red-500 text-sm mt-1">{isError}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded text-white font-semibold"
          >
            Register
          </button>
        </form>


        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/admin/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminRegister;
