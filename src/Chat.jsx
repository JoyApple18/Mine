import { useState } from "react"
import { askAI } from "./api/openai"
import { supabase } from "./supabaseClient"

export default function Chat({ session }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const sendMessage = async () => {
    const userMsg = input
    setMessages([...messages, { sender: "user", text: userMsg }])
    setInput("")

    const aiReply = await askAI(userMsg)
    setMessages([
      ...messages,
      { sender: "user", text: userMsg },
      { sender: "ai", text: aiReply }
    ])
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded shadow h-[400px] overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          className="flex-1 border rounded-l p-2"
          placeholder="Tulis pesanmu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r"
          onClick={sendMessage}
        >
          Kirim
        </button>
      </div>
    </div>
  )
}
