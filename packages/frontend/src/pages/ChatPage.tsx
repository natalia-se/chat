import React from "react";
// import axios from "axios";
// import { LoginInput } from "./LoginInput";
// import { Message } from "@chat-app/shared";

// axios.defaults.baseURL =
//   process.env.REACT_APP_TODO_API || "http://localhost:3001";
// axios.interceptors.request.use((config) => {
//   if (!config?.headers) {
//     config.headers = {};
//   }
//   const jwt = localStorage.getItem("jwt");
//   if (jwt) {
//     config.headers["authorization"] = `Bearer ${jwt}`;
//   }
//   return config;
// });

// const fetchMessages = async (): Promise<Message[]> => {
//   const response = await axios.get<Message[]>("/chat");
//   return response.data;
// };

// const MessageList = ({ messages, error }: { messages: Message[]; error?: string }) => {
//   if (error) {
//     return <div>{error}</div>;
//   } else if (messages) {
//     return (
//       <div>
//         {messages.map((item) => {
//           return <p key={item._id}>{item.text}</p>;
//         })}
//       </div>
//     );
//   } else {
//     return <div>'Waiting for todos'</div>;
//   }
// };

const ChatPage = () => {
  //   const [messages, setMessages] = useState<Message[]>([]);
  //   const [error, setError] = useState<string | undefined>();

  //   useEffect(() => {
  //     fetchMessages()
  //       .then(setMessages)
  //       .catch((error) => {
  //         setMessages([]);
  //         setError("Something went wrong when fetching my todos...");
  //       });
  //   }, []);

  //   console.log("messages", messages);
  return (
    <div className="App">
      <header className="App-header">Chat App</header>
      {/* <section className="App-content">
        {messages &&
          messages.map((message) => (
            <div key={message._id}>{message.text}</div>
          ))}
      </section> */}
      <footer className="App-footer"></footer>
    </div>
  );
};

export default ChatPage;
