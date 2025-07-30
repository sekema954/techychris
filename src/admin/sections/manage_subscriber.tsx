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

  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const BASE_URL = import.meta.env.PROD
        ? `${import.meta.env.VITE_HEROKU_URL}/api/get/emails`
        :" http://localhost:3000/api/get/emails"
        const response = await fetch(BASE_URL);
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
      const BASE_URL = import.meta.env.PROD
      ? `${import.meta.env.VITE_HEROKU_URL}/api/delete/email/${id}`
      : `http://localhost:3000/api/delete/email/${id}`;
      const response = await fetch(BASE_URL, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete subscriber");

      setSubscribers((prev) => prev.filter((sub) => sub.email !== email));
      setSelectedEmails((prev) => prev.filter((e) => e !== email));
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  const toggleEmailSelection = (email: string) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(subscribers.map((sub) => sub.email));
    }
    setSelectAll(!selectAll);
  };

  const openMessageModal = (email: string) => {
    setMessageEmail(email);
    setShowModal(true);
  };

  const sendEmailMessage = async (bulk = false) => {
    const recipients = bulk ? selectedEmails : [messageEmail];
    try {
      const BASE_URL = import.meta.env.PROD
      ? `${import.meta.env.VITE_HEROKU_URL}/api/send/email`
      : "http://localhost:3000/api/send/email";
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: recipients, message: messageText }),
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

      {selectedEmails.length > 0 && (
        <button
          className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Send Bulk Message ({selectedEmails.length})
        </button>
      )}

      {loading ? (
        <p>Loading subscribers...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-sm font-medium text-white">Email</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Subscription Date</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={index} className="border-b bg-gray-700">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(subscriber.email)}
                      onChange={() => toggleEmailSelection(subscriber.email)}
                    />
                  </td>
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
                  <td colSpan={4} className="text-center py-4 text-gray-400">
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
            <h3 className="text-xl font-bold mb-2">
              Send Message {selectedEmails.length > 0 ? `to ${selectedEmails.length} Subscribers` : `to ${messageEmail}`}
            </h3>
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
                onClick={() => {
                  setShowModal(false);
                  setMessageText("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => sendEmailMessage(selectedEmails.length > 0)}
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
