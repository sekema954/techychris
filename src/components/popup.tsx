import { useEffect, useState } from "react";
import { X, Sparkles, ShoppingBag, BookOpen, Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

const siteKey = import.meta.env.VITE_SITE_KEY;

const PopupNotice = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 40000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      setTimeout(() => setError(""), 3500);
      return;
    }
    if (!token) {
      setError("Please verify you're not a robot.");
      setTimeout(() => setError(""), 3500);
      return;
    }

    try {
      const res = await fetch("https://www.techychris.com/api/post/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubscribed(true);
        setEmail("");
        setToken("");
        setTimeout(() => setShow(false), 3500);
      } else {
        setError(data.message || "Subscription failed.");
        setTimeout(() => setError(""), 3500);
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setTimeout(() => setError(""), 3500);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShow(false)}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl z-10"
            style={{ background: "#060F1E", border: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            {/* Top glow bar */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, #3B82F6 50%, transparent)" }}
            />

            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 opacity-20 blur-3xl"
              style={{ background: "radial-gradient(ellipse, #3B82F6, transparent 70%)" }}
            />

            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 flex items-center justify-center text-white/40 hover:text-white/80 transition-all duration-200 z-20"
              aria-label="Close"
            >
              <X size={13} />
            </button>

            <div className="relative p-6">
              {/* Label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  <Sparkles size={10} />
                  Coming Soon
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-xl font-bold text-white leading-tight tracking-tight mb-2">
                Big things are{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #818CF8)" }}
                >
                  launching
                </span>
              </h2>

              {/* Feature pills */}
              <div className="flex gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full">
                  <ShoppingBag size={11} /> eShop
                </span>
                <span className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs px-2.5 py-1 rounded-full">
                  <BookOpen size={11} /> Online Courses
                </span>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Get early access and be the first to know when we go live. Drop your email below.
              </p>

              {/* Feedback messages */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4"
                  >
                    <AlertCircle size={12} className="flex-shrink-0" /> {error}
                  </motion.div>
                )}
                {subscribed && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 mb-4"
                  >
                    <CheckCircle size={12} className="flex-shrink-0" /> You're on the list — we'll be in touch!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              {!subscribed && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all duration-200"
                  />

                  <div className="scale-[0.88] origin-top-left -mb-2">
                    <ReCAPTCHA
                      sitekey={siteKey}
                      onChange={(value) => setToken(value || "")}
                      theme="dark"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!token}
                    className="group flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/25 disabled:text-white/25 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30"
                  >
                    <Send size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    Notify Me
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupNotice;