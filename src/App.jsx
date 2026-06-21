import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

function App() {
  const [Screen, setScreen] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  async function getResponse() {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setScreen(2);

    const userPrompt = prompt;

    setData((prev) => [
      ...prev,
      {
        role: "user",
        content: userPrompt,
      },
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
      });

      setData((prev) => [
        ...prev,
        {
          role: "ai",
          content: response.text || "No response received.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setData((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-stone-50">
      <Navbar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {Screen === 1 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-900">
              <span className="text-xl font-semibold text-amber-500">E</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
              Echo <span className="text-amber-600">GPT</span>
            </h1>
            <p className="mt-2 text-stone-500">
              Ask anything and start chatting.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-12">
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    item.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      item.role === "user"
                        ? "rounded-2xl rounded-br-sm bg-stone-900 text-white"
                        : "rounded-2xl rounded-bl-sm border border-stone-200 bg-white text-stone-800"
                    }`}
                  >
                    <p
                      className={`mb-1 text-[11px] font-medium uppercase tracking-wide ${
                        item.role === "user"
                          ? "text-stone-300"
                          : "text-amber-600"
                      }`}
                    >
                      {item.role === "user" ? "You" : "Echo"}
                    </p>
                    <ReactMarkdown>{item.content}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-stone-200 bg-white px-4 py-3 shadow-sm">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input Box */}
        <div className="border-t border-stone-200 bg-stone-50 px-6 py-4 md:px-12">
          <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 shadow-sm focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500">
            <input
              type="text"
              placeholder="Type your message..."
              value={prompt}
              disabled={loading}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  getResponse();
                }
              }}
              className="flex-1 py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400 disabled:opacity-50"
            />

            <button
              onClick={getResponse}
              disabled={loading}
              className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600 disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;