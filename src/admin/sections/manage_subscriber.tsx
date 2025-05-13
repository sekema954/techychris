import { useState, useEffect } from "react";

interface SubscriberProp {
  email: string;
  createdAt: string;
  _id: string;
}

const Manage_Subscribers = () => {
  const [subscribers, setSubscribers] = useState<SubscriberProp[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get/emails");
        const data = await response.json();
        setSubscribers(data.subscribers);
      } catch (error) {
        console.error("Failed to fetch subscribers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleRemove = async (email: string, id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/delete/email/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete subscriber");
      }

      setSubscribers((prev) => prev.filter((sub) => sub.email !== email));
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  const openMessageModal = (email: string) => {
    setMessageEmail(email);
    setShowModal(true);
  };

  const sendEmailMessage = async () => {
    try {
      const res = await fetch("https://techychris-d43416ccb998.herokuapp.com/api/send/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: messageEmail, message: messageText }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      alert("Message sent!");
      setShowModal(false);
      setMessageText("");
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <section className="p-6 max-w-6xl mx-auto text-white bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Subscribers</h2>

      {loading ? (
        <p>Loading subscribers...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-white">Email</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Subscription Date</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={index} className="border-b bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-300">{subscriber.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(subscriber.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                      onClick={() => handleRemove(subscriber.email, subscriber._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      onClick={() => openMessageModal(subscriber.email)}
                    >
                      Send
                    </button>
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-400">
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-md w-full shadow-lg">
            <h3 className="text-xl font-bold mb-2">Send Message to {messageEmail}</h3>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows={5}
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={sendEmailMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Manage_Subscribers;
