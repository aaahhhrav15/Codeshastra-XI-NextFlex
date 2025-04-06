"use client";

import { useRef, useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Chatbot() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I assist you today?",
      sender: "AI",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const Menus = [
    { name: "Cases", href: "/case" },
    { name: "Connect", href: "/connect" },
    { name: "Evidence", href: "/evidence" },
    { name: "Crime Scene", href: "/crimeScene" },
    { name: "Reports", href: "/reports" },
    { name: "Settings", href: "/settings" },
  ];
  
  // async function gemResp(question) {
  //   const apiKey = "AIzaSyACpDwXspWMdrsqHdM19akpMsg5g0Wkl3A";
  //   const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
  //   // Allowed keywords for nutrition advice
  //   const allowedKeywords = [
  //     "nutrition", "diet", "protein", "carbs", "fats", "vitamins", "minerals", "calories", "meal", "plan", "healthy", "food"
  //   ];
  
  //   // Check if the question is related to nutrition topics
  //   const isRelated = allowedKeywords.some(keyword =>
  //     question.toLowerCase().includes(keyword)
  //   );
  
  //   if (!isRelated) {
  //     return "I can only provide nutrition advice. Please ask me something about nutrition.";
  //   }
  
  //   // Predefined nutrition assistant prompt
  //   const nutritionAssistantPrompt = `
  // You are a nutrition assistant, and you should only provide advice on nutrition topics such as:
  // 1. Basics of a balanced diet.
  // 2. Macronutrients (carbs, proteins, fats) and their benefits.
  // 3. Micronutrients (vitamins, minerals) and their importance.
  // 4. Healthy meal planning and food choices.
  // 5. Dietary recommendations for different fitness goals (weight loss, muscle gain, maintenance).
  // 6. Output should be less than 50 words.
  // If the user asks anything beyond these topics, do not help.
  // Question: ${question}
  //   `;
  
  //   // Format the request body for the Gemini API
  //   const requestBody = {
  //     contents: [
  //       {
  //         parts: [
  //           {
  //             text: nutritionAssistantPrompt,
  //           },
  //         ],
  //       },
  //     ],
  //   };
  
  //   try {
  //     const response = await fetch(endpoint, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  
  //     const data = await response.json();
  //     const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  
  //     // Helper to ensure the answer contains nutrition-related keywords
  //     const checkNutritionResponse = (responseText) => {
  //       const nutritionKeywords = [
  //         "nutrition", "diet", "protein", "carbs", "fats", "vitamins", "minerals", "calories", "meal plan", "healthy food"
  //       ];
  //       return nutritionKeywords.some(keyword => responseText.toLowerCase().includes(keyword));
  //     };
  
  //     if (!answer || !checkNutritionResponse(answer)) {
  //       return "I can only provide nutrition advice. Please ask me something about nutrition.";
  //     }
  
  //     return answer;
  //   } catch (error) {
  //     console.error("Error calling Gemini API:", error);
  //     return "An error occurred while fetching the response.";
  //   }
  // }

  async function gemResp(
    question,
    userPreferences = {
      diet: "vegetarian",
      goal: "weight loss",
      calories: 2000,
      allergies: ["peanuts", "dairy"],
      budget: 50,
    }
  ) {
    // Allowed keywords for nutrition advice
    const allowedKeywords = [
      "nutrition", "diet", "protein", "carbs", "fats", "vitamins", "minerals",
      "calories", "meal plan", "healthy food", "allergies", "exercise",
      "workout", "calorie burn", "portion", "budget", "weight", "BMI", "body fat",
      "health", "fitness", "progress", "meal replacement", "exercise plan",
      "workout plan", "location", "weather", "seasonal ingredients", "health analysis",
      "sample daily meal plan", "nutrition breakdown", "health & lifestyle tips",
      "progress tracking", "adjustments", "weekly check-ins", "monthly milestones",
      "supplements", "hydration goal", "sleep goal", "workout plan suggestion",
      "caloric intake", "macronutrient breakdown", "total calories", "gain", "lose",
      "maintain", "underweight", "normal weight", "overweight", "obese", "loss"
    ];
  
    // Check if the question is related to nutrition topics
    const isRelated = allowedKeywords.some(keyword =>
      question.toLowerCase().includes(keyword)
    );
  
    if (!isRelated) {
      return "I can only provide nutrition advice. Please ask me something about nutrition.";
    }
  
    // Construct user profile prompt based on preferences
    const userProfile = `
  Dietary Preference: ${userPreferences.diet || 'Not specified'}
  Goal: ${userPreferences.goal || 'Not specified'}
  Calories: ${userPreferences.calories || 'Not specified'}
  Allergies: ${userPreferences.allergies?.join(', ') || 'None'}
  Budget: ${userPreferences.budget || 'Not specified'}
  `;
  
    // Construct the nutrition assistant prompt with detailed instructions
    const nutritionAssistantPrompt = `
  You are an advanced AI Nutrition Assistant.
  Consider the user's dietary preference (vegetarian, non-vegetarian, Jain) and weight goals (loss, gain, maintenance).
  Analyze past meal reviews and progress if available.
  Suggest meals with detailed nutritional profiles (carbs, protein, fats, vitamins, calories).
  Account for allergies and medical records.
  If user provides a budget, optimize the meal within it.
  Offer personalized exercise plans based on remaining calories to burn.
  Suggest meal replacements based on goals.
  Provide a workout plan based on calories remaining/provided.
  When greeted, respond with a polite greeting.
  If asked anything unrelated to diet, nutrition, or fitness, guide the conversation back to health, nutrition, or fitness topics.
  If any required details are missing, ask the user to provide them.
  Use the provided BMI to calculate body fat percentage.
  Based on the BMI and body fat percentage, classify the user's health status (e.g., underweight, normal weight, overweight, obese).
  Provide personalized diet and fitness recommendations accordingly.
  If the query is completely out of scope, respond with: "I specialize in nutrition and fitness advice. Let me know how I can assist you with your diet or workout goals!"
  If input is an image, analyze portion size, identify the type of food and approximate nutritional value.
  Adapt suggestions based on user's location, weather, and seasonal ingredients.
  Keep responses under 50 words unless detailed reports are requested.
  When a final health analysis is asked, the template should look like:
  
  <br/>🩺 A. Health Analysis:
  <br/>BMI: ___________________ (Status: ___________________)
  <br/>Body Fat Percentage: ___________________
  <br/>TDEE (Daily Caloric Needs): ___________________ kcal
  <br/>Recommended Caloric Intake: ___________________ kcal
  <br/>Macronutrient Breakdown:
    
  <br/>Protein: ______ g (%)
  <br/>Carbs: ______ g (%)
  <br/>Fats: ______ g (%)
  
  <br/>🍽 B. Sample Daily Meal Plan:
  <br/>Breakfast: ___________________ (______ kcal)
  <br/>Mid-Morning Snack: ___________________ (______ kcal)
  <br/>Lunch: ___________________ (______ kcal)
  <br/>Evening Snack: ___________________ (______ kcal)
  <br/>Dinner: ___________________ (______ kcal)
  
  <br/>📊 C. Nutrition Breakdown (Daily Total):
  <br/>Total Calories: ______ kcal
  <br/>Protein: ______ g (%)
  <br/>Carbs: ______ g (%)
  <br/>Fats: ______ g (%)
  
  <br/>💡 D. Health & Lifestyle Tips:
  <br/>Hydration Goal: ______ liters/day
  <br/>Sleep Goal: ______ hours/night
  <br/>Supplements (if needed): ___________________
  <br/>Workout Plan Suggestion: ___________________
  
  <br/>📈 E. Progress Tracking & Adjustments:
  <br/>Weekly Check-ins: Record weight, body measurements, and energy levels.
  <br/>Monthly Milestones: Review progress toward goals.
  <br/>Adjustments: Update the diet or workout plan based on progress and results.
  <br/>Also reply accordingly to the question asked along with the template. 
  
  User Profile:
  ${userProfile}
  
  Question: ${question}
  `;
  
    // Gemini API endpoint
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;
  
    const requestBody = {
      contents: [{ parts: [{ text: nutritionAssistantPrompt }] }],
    };
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      const rawAnswer = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
      // Apply a series of regex-based formatting operations
      let formattedAnswer = rawAnswer || "I'm unable to generate a response. Please try again.";
  
      // Normalize Windows newlines to Unix style
      formattedAnswer = formattedAnswer.replace(/\r\n/g, "\n");
  
      // Replace any single newline (not already doubled) with double newlines
      formattedAnswer = formattedAnswer.replace(/\n(?!\n)/g, "\n\n");
  
      // Convert Markdown bold syntax (**text**) to HTML <b> tags
      formattedAnswer = formattedAnswer.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  
      // Convert Markdown italics (*text*) to HTML <i> tags
      formattedAnswer = formattedAnswer.replace(/\*(.*?)\*/g, "<i>$1</i>");
  
      // Optionally, convert bullet points if needed (e.g., "- " to HTML list items)
      formattedAnswer = formattedAnswer.replace(/^- (.*?)(\n|$)/gm, "<li>$1</li>");
  
      // Remove any extra spaces (more than one space in a row)
      formattedAnswer = formattedAnswer.replace(/[ ]{2,}/g, " ");
  
      // Trim leading and trailing whitespace
      formattedAnswer = formattedAnswer.trim();
  
      return formattedAnswer;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "An error occurred while fetching the response.";
    }
  }
  

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "User",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      const resp = await gemResp(inputMessage);
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: resp,
          sender: "AI",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="z-10 fixed bottom-4 right-4 bg-theme text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
      >
        <MessageCircle size={24} />
      </button>
      {/* Chat Popover */}
      {chatOpen && (
        <div className="z-10 fixed bottom-20 right-4 w-[700px] bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-theme text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-blue-200"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
  <div
    key={message.id}
    className={`flex flex-col ${
      message.sender === "User" ? "items-end" : "items-start"
    }`}
  >
    <div
      className={`max-w-[70%] rounded-lg p-3 ${
        message.sender === "User"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <p
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: message.text }}
      ></p>
    </div>
    <span className="text-xs text-gray-500 mt-1">
      {message.sender} • {message.timestamp.toLocaleTimeString()}
    </span>
  </div>
))}

            <div ref={messagesEndRef} />
          </div>
          <div className="border-t p-4">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="bg-theme text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}