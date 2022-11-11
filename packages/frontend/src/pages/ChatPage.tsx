import React, { useEffect, useState } from "react";
import axios from "axios";
import { MessageView } from "@chat-app/shared";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_TODO_API || "http://localhost:3001";

axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

const fetchMessages = async (): Promise<MessageView[]> => {
  const response = await axios.get<MessageView[]>("/chat");
  return response.data;
};

const ChatPage = () => {
  const [messages, setMessages] = useState<MessageView[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  const navigate = useNavigate();

  const saveMessage = async (): Promise<void> => {
    if (message) {
      const payload = {
        text: message,
      };
      try {
        const response = await axios.post("/chat", payload);
        setMessages(response.data);
        setMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    fetchMessages()
      .then(setMessages)
      .catch((error) => {
        setMessages([]);
        setError("Something went wrong when fetching messages...");
        console.log("Error: ", error.message);
        navigate("/login");
      });
    // }, 2000);
    window.scrollTo(0, document.body.scrollHeight);

    // return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  if (error) alert(error);
  window.scrollTo(0, document.body.scrollHeight);

  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              <div className="col-start-1 col-end-8 p-3 rounded-lg">
                {messages.length > 0 &&
                  messages.map((message, index) => (
                    <div key={index} className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        {message.author.username.slice(0, 4)}
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>{message.text}</div>
                      </div>
                    </div>
                  ))}
              </div>
              {/* TODO: style for owm messages */}
              {/* <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>I'm ok what about you?</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 sticky bottom-0">
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <input
                type="text"
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {/* TODO: Add emoji */}
              {/* <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button> */}
            </div>
          </div>
          <div className="ml-4">
            <button
              className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              onClick={saveMessage}
            >
              <span>Send</span>
              <span className="ml-2">
                <svg
                  className="w-4 h-4 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
