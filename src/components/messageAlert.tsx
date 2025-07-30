// components/MessageAlert.tsx
interface MessageAlertProps {
    type: "success" | "error";
    text: string;
  }
  
  const MessageAlert = ({ type, text }: MessageAlertProps) => {
    return (
      <div
        className={`mb-6 p-4 rounded ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
        role="alert"
      >
        {text}
      </div>
    );
  };
  
  export default MessageAlert;
  