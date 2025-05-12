import { useRef } from "react";

const Privacy_Policy = () => {
  const policyRef = useRef<HTMLDivElement>(null);

  const handleDownloadText = () => {
    const element = policyRef.current;
    if (!element) return;

    // Extract the text content from the policyRef element
    const content = element.innerText;

    // Create a Blob from the text content
    const blob = new Blob([content], { type: "text/plain" });

    // Create a link to download the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "PrivacyPolicy.txt"; // The filename

    // Programmatically trigger the download
    link.click();
  };

  return (
    <section className="min-h-screen bg-gray-950 text-gray-200 py-35 px-6 md:px-20">
      <div ref={policyRef} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
        <p className="mb-6">
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you visit or interact with our website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">We may collect personal information such as your name, email address, and other details when you:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Subscribe to our newsletter</li>
          <li>Make a purchase</li>
          <li>Contact us</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Send product updates, newsletters, and promotions</li>
          <li>Improve our services and website</li>
          <li>Respond to your inquiries and support requests</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Protection</h2>
        <p className="mb-6">
          We implement security measures to protect your personal data. However, please note that no method of transmission over the internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h2>
        <p className="mb-6">We use cookies to enhance your experience on our site. You can choose to disable cookies through your browser settings.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Third-Party Services</h2>
        <p className="mb-6">
          We may use third-party tools (e.g., analytics or payment processors). These services have their own privacy policies which you should review.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
        <p className="mb-6">
          You have the right to access, correct, or delete your personal information at any time. Contact us if you'd like to make a request.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Updates to This Policy</h2>
        <p className="mb-6">
          We may update this policy occasionally. The updated version will be posted on this page with the revised date.
        </p>

        <p className="mt-10 text-sm text-gray-500">{`Last Updated: ${new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`}</p>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleDownloadText}
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Download as Text File
        </button>
      </div>
    </section>
  );
};

export default Privacy_Policy;
