"use client";
import NutritionInfoCard from "./component/card";
// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";

// export default function ChatPage() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Handle text input change
//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       setImageFile(file);
//     } else {
//       alert("Please upload a valid image file.");
//     }
//   };

//   // Handle drag and drop file upload
//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setImageFile(file);
//     } else {
//       alert("Please drop a valid image file.");
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   // onSubmit handler: send message and call gemResp for AI response
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!input && !imageFile) return;

//     // Add the user message
//     const userMessage = {
//       id: Date.now(),
//       role: "user",
//       content: input,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMessage]);

//     setIsLoading(true);

//     // Log the image if present (future image upload handling can be added)
//     if (imageFile) {
//       console.log("Image file:", imageFile);
//     }

//     // Call the gemResp function to get an AI response
//     const aiResponse = await gemResp(input, {
//       diet: "vegetarian",
//       goal: "weight loss",
//       calories: 2000,
//       allergies: ["peanuts", "dairy"],
//       budget: 50,
//     });

//     // Add the AI response to messages
//     const aiMessage = {
//       id: Date.now() + 1,
//       role: "ai",
//       content: aiResponse,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, aiMessage]);

//     setIsLoading(false);
//     setInput("");
//     setImageFile(null);
//   };

//   // gemResp function that calls Gemini API and returns a formatted HTML response
//   async function gemResp(
//     question,
//     userPreferences = {
//       diet: "vegetarian",
//       goal: "weight loss",
//       calories: 2000,
//       allergies: ["peanuts", "dairy"],
//       budget: 50,
//     }
//   ) {
//     // Allowed keywords for nutrition advice
//     const allowedKeywords = [
//       "nutrition",
//       "diet",
//       "protein",
//       "carbs",
//       "fats",
//       "vitamins",
//       "minerals",
//       "calories",
//       "meal plan",
//       "healthy food",
//       "allergies",
//       "exercise",
//       "workout",
//       "calorie burn",
//       "portion",
//       "budget",
//       "weight",
//       "BMI",
//       "body fat",
//       "health",
//       "fitness",
//       "progress",
//       "meal replacement",
//       "exercise plan",
//       "workout plan",
//       "location",
//       "weather",
//       "seasonal ingredients",
//       "health analysis",
//       "sample daily meal plan",
//       "nutrition breakdown",
//       "health & lifestyle tips",
//       "progress tracking",
//       "adjustments",
//       "weekly check-ins",
//       "monthly milestones",
//       "supplements",
//       "hydration goal",
//       "sleep goal",
//       "workout plan suggestion",
//       "caloric intake",
//       "macronutrient breakdown",
//       "total calories",
//       "gain",
//       "lose",
//       "maintain",
//       "underweight",
//       "normal weight",
//       "overweight",
//       "obese",
//       "loss",
//     ];

//     // Check if the question is related to nutrition topics
//     const isRelated = allowedKeywords.some((keyword) =>
//       question.toLowerCase().includes(keyword)
//     );

//     if (!isRelated) {
//       return "I can only provide nutrition advice. Please ask me something about nutrition.";
//     }

//     // Construct user profile prompt based on preferences
//     const userProfile = `
//   Dietary Preference: ${userPreferences.diet || "Not specified"}
//   Goal: ${userPreferences.goal || "Not specified"}
//   Calories: ${userPreferences.calories || "Not specified"}
//   Allergies: ${userPreferences.allergies?.join(", ") || "None"}
//   Budget: ${userPreferences.budget || "Not specified"}
//   `;

//     // Construct the nutrition assistant prompt with detailed instructions
//     const nutritionAssistantPrompt = `
//   You are an advanced AI Nutrition Assistant.
//   Consider the user's dietary preference (vegetarian, non-vegetarian, Jain) and weight goals (loss, gain, maintenance).
//   Analyze past meal reviews and progress if available.
//   Suggest meals with detailed nutritional profiles (carbs, protein, fats, vitamins, calories).
//   Account for allergies and medical records.
//   If user provides a budget, optimize the meal within it.
//   Offer personalized exercise plans based on remaining calories to burn.
//   Suggest meal replacements based on goals.
//   Provide a workout plan based on calories remaining/provided.
//   When greeted, respond with a polite greeting.
//   If asked anything unrelated to diet, nutrition, or fitness, guide the conversation back to health, nutrition, or fitness topics.
//   If any required details are missing, ask the user to provide them.
//   Use the provided BMI to calculate body fat percentage.
//   Based on the BMI and body fat percentage, classify the user's health status (e.g., underweight, normal weight, overweight, obese).
//   Provide personalized diet and fitness recommendations accordingly.
//   If the query is completely out of scope, respond with: "I specialize in nutrition and fitness advice. Let me know how I can assist you with your diet or workout goals!"
//   If input is an image, analyze portion size, identify the type of food and approximate nutritional value.
//   Adapt suggestions based on user's location, weather, and seasonal ingredients.
//   Keep responses under 50 words unless detailed reports are requested.
//   When a final health analysis is asked, the template should look like:
  
//   <br/>🩺 A. Health Analysis:
//   <br/>BMI: ___________________ (Status: ___________________)
//   <br/>Body Fat Percentage: ___________________
//   <br/>TDEE (Daily Caloric Needs): ___________________ kcal
//   <br/>Recommended Caloric Intake: ___________________ kcal
//   <br/>Macronutrient Breakdown:
    
//   <br/>Protein: ______ g (%)
//   <br/>Carbs: ______ g (%)
//   <br/>Fats: ______ g (%)
  
//   <br/>🍽 B. Sample Daily Meal Plan:
//   <br/>Breakfast: ___________________ (______ kcal)
//   <br/>Mid-Morning Snack: ___________________ (______ kcal)
//   <br/>Lunch: ___________________ (______ kcal)
//   <br/>Evening Snack: ___________________ (______ kcal)
//   <br/>Dinner: ___________________ (______ kcal)
  
//   <br/>📊 C. Nutrition Breakdown (Daily Total):
//   <br/>Total Calories: ______ kcal
//   <br/>Protein: ______ g (%)
//   <br/>Carbs: ______ g (%)
//   <br/>Fats: ______ g (%)
  
//   <br/>💡 D. Health & Lifestyle Tips:
//   <br/>Hydration Goal: ______ liters/day
//   <br/>Sleep Goal: ______ hours/night
//   <br/>Supplements (if needed): ___________________
//   <br/>Workout Plan Suggestion: ___________________
  
//   <br/>📈 E. Progress Tracking & Adjustments:
//   <br/>Weekly Check-ins: Record weight, body measurements, and energy levels.
//   <br/>Monthly Milestones: Review progress toward goals.
//   <br/>Adjustments: Update the diet or workout plan based on progress and results.
//   <br/>Also reply accordingly to the question asked along with the template.
  
//   User Profile:
//   ${userProfile}
  
//   Question: ${question}
//   `;

//     // Gemini API endpoint
//     const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;

//     const requestBody = {
//       contents: [{ parts: [{ text: nutritionAssistantPrompt }] }],
//     };

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestBody),
//       });

//       const data = await response.json();
//       const rawAnswer =
//         data.candidates?.[0]?.content?.parts?.[0]?.text;

//       // Apply regex-based formatting operations
//       let formattedAnswer =
//         rawAnswer || "I'm unable to generate a response. Please try again.";

//       // Normalize Windows newlines to Unix style
//       formattedAnswer = formattedAnswer.replace(/\r\n/g, "\n");

//       // Replace any single newline (not already doubled) with double newlines
//       formattedAnswer = formattedAnswer.replace(/\n(?!\n)/g, "\n\n");

//       // Convert Markdown bold syntax (**text**) to HTML <b> tags
//       formattedAnswer = formattedAnswer.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

//       // Convert Markdown italics (*text*) to HTML <i> tags
//       formattedAnswer = formattedAnswer.replace(/\*(.*?)\*/g, "<i>$1</i>");

//       // Convert bullet points (e.g., "- " to HTML list items)
//       formattedAnswer = formattedAnswer.replace(/^- (.*?)(\n|$)/gm, "<li>$1</li>");

//       // Remove any extra spaces (more than one space in a row)
//       formattedAnswer = formattedAnswer.replace(/[ ]{2,}/g, " ");

//       // Trim leading and trailing whitespace
//       formattedAnswer = formattedAnswer.trim();

//       return formattedAnswer;
//     } catch (error) {
//       console.error("Error calling Gemini API:", error);
//       return "An error occurred while fetching the response.";
//     }
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <Card className="flex flex-col h-full m-2 sm:m-4 md:max-w-3xl md:mx-auto">
//         <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex ${
//                 message.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[70%] rounded-lg p-3 ${
//                   message.role === "user"
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 <p
//                   className="text-sm"
//                   dangerouslySetInnerHTML={{ __html: message.content }}
//                 />
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </CardContent>
//         <CardFooter className="p-4">
//           <form onSubmit={onSubmit} className="flex flex-col w-full space-y-2">
//             <div
//               className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg cursor-pointer"
//               onClick={() => fileInputRef.current?.click()}
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//             >
//               {imageFile ? (
//                 <p className="text-sm text-gray-600">{imageFile.name}</p>
//               ) : (
//                 <p className="text-sm text-gray-500">
//                   Drag and drop an image here, or click to select
//                 </p>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 ref={fileInputRef}
//               />
//             </div>
//             <div className="flex space-x-2">
//               <Textarea
//                 value={input}
//                 onChange={handleInputChange}
//                 placeholder="Type your message..."
//                 className="flex-grow resize-none"
//                 rows={1}
//               />
//               <Button type="submit" disabled={isLoading}>
//                 {isLoading ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : (
//                   "Send"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }





import React, { useState, useRef, useEffect } from 'react';

const CameraAndUploadComponent = () => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [captureType, setCaptureType] = useState("meal"); // "meal" selected by default
  const [capturedFrame, setCapturedFrame] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  // Request camera access on mount.
  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    getCameraStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Upload handler common for capture and file upload.
  const processImageBlob = async (blob) => {
    setCapturedFrame(URL.createObjectURL(blob));
    const formData = new FormData();
    formData.append('image', blob);

    const endpoint =
      captureType === "meal"
        ? "http://127.0.0.1:5000/mealnutrition"
        : "http://127.0.0.1:5000/menuanalysis";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Error uploading image:", error);
      setApiResponse({ error: "Failed to fetch data" });
    }
  };

  // Capture current frame from camera.
  const captureFrame = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        processImageBlob(blob);
      }
    }, "image/jpeg");
  };

  // Handle file selection via click.
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageBlob(file);
    }
  };

  // Handle drag and drop events.
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processImageBlob(file);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Panel: Camera, drag & drop, and upload options */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
            Image Capture & Upload
          </h1>
          {/* Radio Buttons */}
          <div className="flex justify-center mb-6">
            <label className="flex items-center space-x-2 mr-6">
              <input
                type="radio"
                name="captureType"
                value="meal"
                checked={captureType === "meal"}
                onChange={() => setCaptureType("meal")}
                className="h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">Meal</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="captureType"
                value="menu"
                checked={captureType === "menu"}
                onChange={() => setCaptureType("menu")}
                className="h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">Menu</span>
            </label>
          </div>
          {/* Camera Feed */}
          <div className="w-full mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg shadow-lg border"
            />
          </div>
          {/* Capture Button */}
          <button
            onClick={captureFrame}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition mb-4"
          >
            Capture
          </button>
          {/* Drag & Drop / Click Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className="w-full border-dashed border-4 border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Drag & drop an image here, or click to upload.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
          {/* Display Captured Image */}
          {capturedFrame && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Captured Image:
              </h2>
              <img
                src={capturedFrame}
                alt="Captured"
                className="w-full rounded-lg shadow"
              />
            </div>
          )}
        </div>

        {/* Right Panel: API Response */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Response
          </h2>









          {/* {apiResponse && Array.isArray(apiResponse) ? (captureType === "menu" ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {apiResponse.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition transform hover:scale-105"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {item.meal}
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="font-semibold">Calories:</div>
            <div>{item.calories}</div>
            <div className="font-semibold">Serving Size:</div>
            <div>{item.serving_size_grams} g</div>
            <div className="font-semibold">Protein:</div>
            <div>{item.protein_grams} g</div>
            <div className="font-semibold">Carbs:</div>
            <div>{item.carbohydrate_grams} g</div>
            <div className="font-semibold">Fat:</div>
            <div>{item.fat_grams} g</div>
            <div className="font-semibold">Fiber:</div>
            <div>{item.fiber_grams} g</div>
            <div className="font-semibold">Sugar:</div>
            <div>{item.sugar_grams} g</div>
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Main Ingredients:</span>{" "}
              {item.main_ingredients.join(", ")}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Minerals:</span>{" "}
              {item.minerals.join(", ")}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Vitamins:</span>{" "}
              {item.vitamins.join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div> ) : (
      <NutritionInfoCard info={apiResponse}/>
    ))
  ) : (
    <p className="text-gray-700 dark:text-gray-300">
      No API response yet.
    </p>
  )} */}










          {apiResponse ? (
            <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-auto">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              No response yet. Upload or capture an image to see the result.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraAndUploadComponent;
