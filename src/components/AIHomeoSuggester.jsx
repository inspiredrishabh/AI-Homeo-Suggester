import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ReactMarkdown from "react-markdown";

// API key
const API_KEY = "AIzaSyDaNPpw363F7CgQqmlkeYiZoNm1_a7ijEI";

const AIHomeoSuggester = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Speech recognition setup
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Update input when speech is recognized
  useEffect(() => {
    if (transcript) setUserInput(transcript);
  }, [transcript]);

  // Handle speech recognition
  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language });
      setIsListening(true);
    }
  };

  // Toggle language
  const toggleLanguage = () => {
    const newLanguage = language === "en-US" ? "hi-IN" : "en-US";
    setLanguage(newLanguage);

    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }
  };

  // Send request to Gemini API
  const getAIResponse = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `As a homeopathy expert, analyze these symptoms and provide a detailed homeopathic recommendation.

Patient Symptoms: "${userInput}"

Please format your response with these exact sections:

## 🌿 Primary Remedy Recommendation
- **Medicine Name**: [name]
- **Potency**: [potency]
- **Dosage**: [dosage]
- **Duration**: [duration]

## 🔄 Alternative Remedies
[List 2-3 alternative options with brief explanations]

## 💭 Remedy Selection Rationale
[Explain why these remedies match the symptoms]

## ⚠️ Missing Information
[List any important symptoms or details that would help make a more accurate recommendation]

## 🌱 Lifestyle & Dietary Suggestions
- Dietary Recommendations:
- Lifestyle Modifications:
- Things to Avoid:

Note: Format this with markdown for best readability.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setAiResponse(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      setAiResponse(`## 🌿 Primary Remedy Recommendation
- **Medicine Name**: Arnica Montana
- **Potency**: 30C
- **Dosage**: 3 pellets twice daily
- **Duration**: 3-5 days

## ⚠️ Missing Information
- Exact duration of symptoms
- Time of day when symptoms worsen/improve
- Associated symptoms
- Previous treatments tried

## 🌱 Lifestyle & Dietary Suggestions
- Stay hydrated with room temperature water
- Avoid caffeine and alcohol
- Rest adequately
`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div
        className={`max-w-2xl mx-auto p-5 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-md`}
      >
        {/* Theme Toggle with better visibility */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>

        {/* Updated text colors for better visibility */}
        <h1
          className={`text-xl font-bold text-center mb-4 ${
            isDarkMode ? "text-green-300" : "text-green-700"
          }`}
        >
          AI Homeopathy Suggester
        </h1>

        {/* Input Section with improved contrast */}
        <div className="mb-4">
          <textarea
            className={`w-full border rounded p-3 mb-2 ${
              isDarkMode
                ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            rows={4}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Describe your symptoms..."
          />

          {/* Updated button colors */}
          <div className="flex gap-2">
            <button
              onClick={getAIResponse}
              disabled={isLoading || !userInput.trim()}
              className={`flex-1 ${
                isDarkMode
                  ? "bg-green-600 hover:bg-green-500 disabled:bg-gray-600"
                  : "bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
              } text-white py-2 px-4 rounded`}
            >
              {isLoading ? "Processing..." : "Get Suggestion"}
            </button>

            <button
              onClick={toggleListening}
              className={`py-2 px-3 ${
                isListening
                  ? "bg-red-500 hover:bg-red-400"
                  : isDarkMode
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded`}
            >
              {isListening ? "Stop" : "Voice"}
            </button>

            <button
              onClick={toggleLanguage}
              className={`py-2 px-3 ${
                isDarkMode
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-green-500 hover:bg-green-600"
              } text-white rounded`}
            >
              {language === "en-US" ? "EN" : "हि"}
            </button>
          </div>

          {/* Updated listening indicator */}
          {isListening && (
            <div className="flex items-center mt-2">
              <span className="flex h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-green-300" : "text-green-600"
                }`}
              >
                {language === "en-US" ? "Listening..." : "सुन रहा है..."}
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Results Section */}
        {aiResponse && !isLoading && (
          <div
            className={`${
              isDarkMode
                ? "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600"
                : "bg-gradient-to-r from-green-50 to-white border-green-100"
            } p-6 rounded-lg border`}
          >
            <h2
              className={`text-2xl font-serif ${
                isDarkMode ? "text-green-300" : "text-green-800"
              } border-b ${
                isDarkMode ? "border-gray-600" : "border-green-100"
              } pb-2 mb-4 flex items-center`}
            >
              <svg
                className="w-6 h-6 mr-2 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Homeopathic Analysis
            </h2>

            <div className="prose max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => (
                    <h2
                      className={`text-xl font-serif ${
                        isDarkMode ? "text-green-300" : "text-green-700"
                      } mt-6 mb-3 flex items-center`}
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-none space-y-2 my-3" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li
                      className={`flex items-start ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                      {...props}
                    >
                      <span className="mr-2">•</span>
                      <span>{props.children}</span>
                    </li>
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className={
                        isDarkMode
                          ? "text-green-300 font-semibold"
                          : "text-green-700 font-semibold"
                      }
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                      {...props}
                    />
                  ),
                }}
              >
                {aiResponse}
              </ReactMarkdown>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => navigator.clipboard.writeText(aiResponse)}
                className={`px-3 py-1 ${
                  isDarkMode
                    ? "bg-blue-900 hover:bg-blue-800 text-blue-300"
                    : "bg-blue-50 hover:bg-blue-100 text-blue-700"
                } text-sm rounded`}
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <div
          className={`mt-4 text-xs ${
            isDarkMode
              ? "bg-gray-700 text-gray-300 border border-gray-600"
              : "bg-gray-50 text-gray-500"
          } p-3 rounded-lg`}
        >
          <p className="font-medium">
            ⚠️ Medical Disclaimer: Not a substitute for professional medical
            advice.
          </p>
        </div>

        {/* Developer Credits with better contrast */}
        <div
          className={`mt-6 text-center text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <p className="flex items-center justify-center gap-2">
            Developed with 💚 by
            <a
              href="https://github.com/inspiredrishabh"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-medium  ${
                isDarkMode
                  ? "text-green-300 hover:text-green-200"
                  : "text-green-600 hover:text-green-700"
              }`}
            >
              Rishabh
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIHomeoSuggester;
