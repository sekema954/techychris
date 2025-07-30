import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const siteKey = import.meta.env.VITE_SITE_KEY;

const PopupNotice = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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
      const res = await fetch("http://localhost:3000/api/post/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubscribed("🎉 Subscribed successfully!");
        setEmail("");
        setToken("");
        setTimeout(() => {
          setSubscribed("");
          setShow(false);
        }, 3000);
      } else {
        setError(data.message || "Subscription failed.");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to subscribe.");
      setTimeout(() => setError(""), 3000);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl max-w-sm w-full shadow-lg">
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-2">🚀 Coming Soon!</h2>
        <p className="text-sm mb-4">
          We’re launching an{" "}
          <span className="text-blue-600 font-semibold">eShop</span> and offering{" "}
          <span className="text-green-600 font-semibold">online courses</span> soon. Stay tuned!
        </p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {subscribed && <p className="text-green-500 text-sm mb-2">{subscribed}</p>}

        {/* Subscribe Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          <ReCAPTCHA
            sitekey={siteKey}
            onChange={(value) => setToken(value || "")}
          />

          <button
            type="submit"
            disabled={!token}
            className={`py-2 rounded-md text-sm font-medium transition ${
              token
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white opacity-50 cursor-not-allowed"
            }`}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupNotice;
