import { useRef } from "react";

const Terms_Conditions = () => {
  const termsRef = useRef<HTMLDivElement>(null);

  const handleDownloadText = () => {
    const element = termsRef.current;
    if (!element) return;

    // Extract the text content from the termsRef element
    const content = element.innerText;

    // Create a Blob from the text content
    const blob = new Blob([content], { type: "text/plain" });

    // Create a link to download the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "TermsAndConditions.txt"; // The filename

    // Programmatically trigger the download
    link.click();
  };

  return (
    <section className="min-h-screen bg-gray-950 text-gray-200 py-35 px-6 md:px-20">
      <div ref={termsRef} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Terms and Conditions</h1>
        <p className="mb-6">
          These Terms and Conditions govern your use of our website and services. By accessing or using our site, you agree to comply with the following terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using our site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Changes to Terms</h2>
        <p className="mb-6">
          We may update these terms from time to time. You are advised to review this page regularly to stay informed of any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Obligations</h2>
        <p className="mb-6">
          You agree not to misuse our website by engaging in prohibited activities such as hacking, spreading malicious software, or engaging in any illegal actions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
        <p className="mb-6">
          All content on our site, including text, images, graphics, logos, and software, is the property of our company and is protected by copyright law.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Privacy Policy</h2>
        <p className="mb-6">
          We value your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Liability Limitations</h2>
        <p className="mb-6">
          We are not responsible for any direct, indirect, incidental, or consequential damages resulting from the use of our website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
        <p className="mb-6">
          These Terms and Conditions will be governed by and construed in accordance with the laws of the state in which our company is based.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
        <p className="mb-6">
          If you have any questions about these terms, please contact us at [your contact info].
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

export default Terms_Conditions;
