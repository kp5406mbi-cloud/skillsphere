import {
  useEffect,
  useState
} from "react";

import { useParams } from "react-router-dom";

import API from "../api/axios";

import { toast } from "react-toastify";

function Chat() {

  const storedUser =
  JSON.parse(
    localStorage.getItem("user")
  );

const currentUserId =

  storedUser?._id ||

  storedUser?.user?._id;

  const { id } = useParams();

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    fetchMessages();

  }, []);

  const fetchMessages = async () => {

    try {

      const res = await API.get(

        `/messages/${id}`,

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`

          }

        }

      );

      console.log(
        "MESSAGES:",
        res.data
      );

      setMessages(res.data);

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Failed to load messages"
      );

    }

  };

  const handleSend = async () => {

    if (!message.trim()) return;

    try {

      const res = await API.post(

        "/messages/send",

        {

          receiver: id,

          text: message

        },

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`

          }

        }

      );

      setMessages((prev) => [
        ...prev,
        res.data
      ]);

      setMessage("");

    }

    catch (error) {

      console.log(
        error.response?.data
      );

      toast.error(
        "Failed to send message"
      );

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">

        Chat

      </h1>

      <div
        className="
          bg-gray-900
          rounded-2xl
          p-6
          h-[500px]
          flex
          flex-col
        "
      >

        <div
          className="
            flex-1
            overflow-y-auto
            space-y-4
            pr-2
          "
        >

          {

            messages.map((msg) => {

              const senderId =

                typeof msg.sender === "object"

                  ? msg.sender._id

                  : msg.sender;

              const isOwnMessage =

  senderId?.toString() ===
  currentUserId?.toString();

  console.log("SENDER ID:", senderId);
console.log("CURRENT USER ID:", currentUserId);
console.log("IS OWN:", isOwnMessage);

              return (

                <div

                  key={msg._id}

                  className={`
                    flex
                    ${

                      isOwnMessage

                        ? "justify-end"

                        : "justify-start"
                    }
                  `}

                >

                  <div
                    className={`
                      max-w-[70%]
                      px-4
                      py-2
                      rounded-2xl
                      break-words

                      ${

                        isOwnMessage

                          ? "bg-blue-600 text-white"

                          : "bg-gray-700 text-white"
                      }
                    `}
                  >

                    {msg.text}

                  </div>

                </div>

              );

            })

          }

        </div>

        <div className="flex gap-3 mt-6">

          <input

            type="text"

            placeholder="Type message..."

            value={message}

            onChange={(e) =>
              setMessage(e.target.value)
            }

            className="
              flex-1
              p-3
              rounded-xl
              bg-gray-800
              outline-none
            "

          />

          <button

            onClick={handleSend}

            className="
              bg-purple-600
              px-6
              py-3
              rounded-xl
              hover:bg-purple-700
              transition
            "

          >

            Send

          </button>

        </div>

      </div>

    </div>

  );

}

export default Chat;