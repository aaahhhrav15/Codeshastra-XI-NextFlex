'use client'
import { useState } from "react";

async function getExerciseDescription(exerciseName) {
    const apiKey = 'AIzaSyACpDwXspWMdrsqHdM19akpMsg5g0Wkl3A';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: `Provide a brief description of the following exercise: ${exerciseName}, its benefits, calories burned per minute, target muscles, and equipment required.`,
                    },
                ],
            },
        ],
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        let description = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No description found.";

        // Remove ** from the response text using regex
        description = description.replace(/\*\*/g, '');

        console.log(`Gemini Response (Cleaned): ${description}`);
        return description;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Error fetching description.";
    }
}

function ExerciseInfo() {
    const [exercise, setExercise] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchDescription = async () => {
        if (!exercise) return;

        setIsLoading(true);
        setError("");
        setDescription("");

        try {
            const result = await getExerciseDescription(exercise);
            setDescription(result);
        } catch (err) {
            setError("Failed to fetch exercise description.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Exercise Explorer
            </h1>

            <div className="flex flex-col space-y-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter exercise name (e.g., 'Bench Press')"
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        onKeyPress={(e) => e.key === 'Enter' && fetchDescription()}
                    />
                    <button
                        onClick={fetchDescription}
                        disabled={!exercise || isLoading}
                        className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                            !exercise || isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {description && !isLoading && !error && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">
                            {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                        </h2>
                        <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                            {description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExerciseInfo;
