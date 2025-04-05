import React, { useState } from 'react';

const Form = ({user}) => {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    BMI:'',
    dietaryPreferences: '',
    fitnessGoal: ''
  });

  const fetchDetails = async () => {
    
    try {
      const response = await fetch(`http://192.168.0.141:5000/api/updateUser/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDetails();
    console.log(formData);
    setShowForm(false); // Close form after submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!showForm) return null;



  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 top-0 right-0">
        <div className=" p-6 rounded-lg shadow-lg w-[90%] md:w-[50%] lg:w-[40%]">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-white dark:bg-gray-900">Complete Your Profile</h2>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height (cm)"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="number"
          name="BMI"
          value={formData.BMI}
          onChange={handleChange}
          placeholder="BMI"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="dietaryPreferences"
          value={formData.dietaryPreferences}
          onChange={handleChange}
          placeholder="Dietary Preferences (e.g., Vegan, Keto)"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="fitnessGoal"
          value={formData.fitnessGoal}
          onChange={handleChange}
          placeholder="Fitness Goal (e.g., Weight Loss, Muscle Gain)"
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="w-1/2 bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
        </div>
      </div>

    
  );
};

export default Form;