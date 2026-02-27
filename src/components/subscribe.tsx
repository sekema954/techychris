import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import SubscribeModelViewer from "./SubscribeGlb";
import pattern from "../assets/images/Frame.png";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

const siteKey = import.meta.env.VITE_SITE_KEY;

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      setTimeout(() => setError(""), 3500);
      return;
    }
    if (!token) {
      setError("Please verify that you're not a robot.");
      setTimeout(() => setError(""), 3500);
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
        setSubscribed(true);
        setEmail("");
        setToken("");
        setTimeout(() => setSubscribed(false), 5000);
      } else {
        setError(data.message || "Subscription failed. Try again.");
        setTimeout(() => setError(""), 3500);
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setTimeout(() => setError(""), 3500);
    }
  };

  return (
    <section className="relative bg-[#060F1E] py-24 px-6 text-white overflow-hidden">
      {/* Background pattern */}
      <img
        src={pattern}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-[0.06] z-0 mix-blend-luminosity"
      />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #6366F1, transparent 70%)" }} />

      {/* Thin top border accent */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #3B82F6 40%, #6366F1 60%, transparent)" }} />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">

        {/* Left: 3D Model */}
        <motion.div
          className="w-full h-80 md:h-[420px] rounded-2xl flex items-center justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SubscribeModelViewer />
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-6"
        >
          {/* Label tag */}
          <span className="inline-flex w-fit items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
            Newsletter
          </span>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3">
              Stay Ahead in{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #818CF8)" }}
              >
                Tech
              </span>
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed">
              Get the latest networking tips, cybersecurity insights, and IT tutorials
              delivered straight to your inbox. No spam, ever.
            </p>
          </div>

          {/* Feature list */}
          <ul className="flex flex-col gap-2">
            {["Weekly IT & networking tutorials", "Certification study tips", "Industry news & trends"].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-white/60">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3.5 6L6.5 2" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Form card */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 mb-4"
                >
                  <AlertCircle size={14} className="flex-shrink-0" />
                  {error}
                </motion.div>
              )}
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5 mb-4"
                >
                  <CheckCircle size={14} className="flex-shrink-0" />
                  You're in! Welcome to the community 🎉
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all duration-200"
                />
              </div>

              <ReCAPTCHA
                sitekey={siteKey}
                onChange={(value) => setToken(value || "")}
                theme="dark"
              />

              <motion.button
                type="submit"
                disabled={!token}
                whileHover={token ? { scale: 1.02 } : {}}
                whileTap={token ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  !token
                    ? "bg-white/5 text-white/30 border border-white/10 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 hover:shadow-blue-600/30"
                }`}
              >
                <Send size={14} className={`transition-transform duration-300 ${token ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : ""}`} />
                Subscribe Now
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscribe;