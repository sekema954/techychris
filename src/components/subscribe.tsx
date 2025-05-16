import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const siteKey = import.meta.env.VITE_SITE_KEY;

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(""); // Captcha token
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!token) {
      setError("Please verify that you're not a robot");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const res = await fetch("https://techychris-d43416ccb998.herokuapp.com/api/post/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubscribed("Subscribed successfully");
        setTimeout(() => setSubscribed(""), 2000);
        setEmail("");
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
    <div className="bg-[#2D2942] text-white py-12 px-4">
      <header className="text-center mb-6">
        <h1 className="text-[#CD9EFD] text-2xl md:text-4xl font-bold">
          SUBSCRIBE TO GET THE LATEST TECH UPDATES
        </h1>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <p className="text-green-600 text-lg">{subscribed}</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto w-full flex flex-col gap-4 items-center"
      >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#CD9EFD]"
        />

        {/* reCAPTCHA now below input */}
        <div className="w-full flex justify-center">
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={(value) => setToken(value || "")}
          />
        </div>

        <button
          type="submit"
          disabled={!token}
          className={`bg-[#171723] text-white px-6 py-3 rounded-xl transition duration-300 w-full sm:w-auto ${
            !token ? "opacity-50 cursor-not-allowed" : "hover:bg-[#847FAD]"
          }`}
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
