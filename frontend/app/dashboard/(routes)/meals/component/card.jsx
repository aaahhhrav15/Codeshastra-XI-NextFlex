import React from 'react';

const NutritionInfoCard = ({ info }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition transform hover:scale-105">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Nutrition Facts
      </h2>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
        <div className="font-semibold">Calories:</div>
        <div>{info.calories}</div>
        <div className="font-semibold">Serving Size:</div>
        <div>{info.serving_size_grams} g</div>
        <div className="font-semibold">Protein:</div>
        <div>{info.protein_content_grams} g</div>
        <div className="font-semibold">Carbohydrates:</div>
        <div>{info.carbohydrate_content_grams} g</div>
        <div className="font-semibold">Fat:</div>
        <div>{info.fat_content_grams} g</div>
        <div className="font-semibold">Fiber:</div>
        <div>{info.fiber_grams} g</div>
        <div className="font-semibold">Sugar:</div>
        <div>{info.sugar_grams} g</div>
      </div>
      <div className="mt-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Minerals:
          </h3>
          <ul className="list-disc list-inside">
            {Object.entries(info.minerals).map(([key, value]) => (
              <li key={key} className="capitalize text-gray-700 dark:text-gray-300">
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Vitamins:
          </h3>
          <ul className="list-disc list-inside">
            {Object.entries(info.vitamins).map(([key, value]) => (
              <li key={key} className="capitalize text-gray-700 dark:text-gray-300">
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NutritionInfoCard;
