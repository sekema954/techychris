import { useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import SubscribeModelViewer from "./SubscribeGlb";
import pattern from "../assets/images/Frame.png";

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
        : import.meta.env.VITE_DEV_URL;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

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
    <section className="relative bg-[#0A2540] py-20 px-6 text-white overflow-hidden">
      {/* Background Pattern */}
      <img
        src={pattern}
        alt="background pattern"
        className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
      />

      {/* Subtle tech overlay */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[url('/assets/images/tech-lines.svg')] bg-cover bg-center opacity-10"></div>
      </div>

      {/* Animated content */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: 3D Model with fade-in scroll animation */}
        <motion.div
          className="w-full h-80 md:h-full rounded-2xl overflow-hidden flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SubscribeModelViewer />
        </motion.div>

        {/* Right: Form with staggered scroll animation */}
        <motion.div
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#CD9EFD] mb-3">
            Subscribe for Tech Updates
          </h2>
          <p className="text-sm text-gray-300 mb-6">
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
              className="w-full px-5 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CD9EFD] focus:ring-offset-1 transition duration-300"
            />

            <ReCAPTCHA
              sitekey={siteKey}
              onChange={(value) => setToken(value || "")}
            />

            <motion.button
              type="submit"
              disabled={!token}
              whileHover={{ scale: token ? 1.05 : 1 }}
              whileTap={{ scale: token ? 0.95 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-full mt-2 px-8 py-3 rounded-lg font-medium transition duration-300 ${
                !token
                  ? "bg-blue-600 opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg"
              }`}
            >
              Subscribe Now
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscribe;
