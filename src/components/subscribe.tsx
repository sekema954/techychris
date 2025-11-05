import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import placeholder from '../assets/images/placeholder.jpeg'

const siteKey = import.meta.env.VITE_SITE_KEY;

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!token) {
      setError("Please verify that you're not a robot.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const url = import.meta.env.PROD
      ? import.meta.env.VITE_PROD_URL
      : import.meta.env.VITE_DEV_URL
      const res = await fetch(
        url,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSubscribed("🎉 Subscribed successfully!");
        setTimeout(() => setSubscribed(""), 3000);
        setEmail("");
        setToken("");
      } else {
        setError(data.message || "Subscription failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to subscribe.");
    }

    setTimeout(() => setError(""), 3000);
  };

  return (
    <section className="bg-[#0A2540] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Column: Image Placeholder */}
        <div className="w-full h-80 md:h-full bg-[#2D2942] rounded-xl flex items-center justify-center">
          <img src={placeholder} alt="Chris Quashie Subscription Form Placeholder" aria-label="Chris Quashie Subscription Form Placeholder" />
        </div>

        {/* Right Column: Form */}
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-[#CD9EFD] mb-3">
            Subscribe for Tech Updates
          </h2>
          <p className="text-sm text-neutral-300 mb-5">
            Stay updated with the latest tech trends, news, and tutorials.
          </p>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {subscribed && (
            <p className="text-green-400 text-sm mb-2">{subscribed}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-5 py-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CD9EFD]"
            />

            <ReCAPTCHA
              sitekey={siteKey}
              onChange={(value) => setToken(value || "")}
            />

            <button
              type="submit"
              disabled={!token}
              className={`w-full mt-2 px-8 py-3 rounded-lg font-medium transition duration-300 ${
                !token
                  ? "bg-blue-600 opacity-50 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
