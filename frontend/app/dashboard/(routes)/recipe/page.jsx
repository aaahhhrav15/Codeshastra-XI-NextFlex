import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GreenScore from "@/components/GreenScore"

const recipes = [
  {
    id: 1,
    name: "Green Salad",
    score: 95,
    ingredients: [
      "2 cups mixed greens",
      "1/4 cup cherry tomatoes",
      "1/4 cup cucumber, sliced",
      "2 tbsp olive oil",
      "1 tbsp balsamic vinegar",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Wash and dry the mixed greens.",
      "Cut the cherry tomatoes in half and slice the cucumber.",
      "In a large bowl, combine the greens, tomatoes, and cucumber.",
      "In a small bowl, whisk together olive oil, balsamic vinegar, salt, and pepper.",
      "Drizzle the dressing over the salad and toss gently to combine.",
      "Serve immediately and enjoy your fresh, green salad!"
    ]
  },
  // Add more recipes here...
]

export default function Recipe({ params }) {
  const recipe = recipes.find(r => r.id === 1)

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">{recipe.name}</h1>

      <GreenScore score={recipe.score} />

      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="mb-2">{instruction}</li>
            ))}
          </ol>
        </CardContent>
      </Card>
      {/* completion/feedback form with fields type(enum | dropdown: options- breakfast, dinner, lunch, brunch), taste (did you like the taste of above recipe) */}
        <div className="space-y-4">
            <label className="block">
            <span className="text-gray-700">Type</span>
            <select className="form-select mt-1 block w-full">
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Brunch</option>
            </select>
            </label>
            <label className="block">
            <span className="text-gray-700">Taste</span>
            {/* use an icon and make it functional as a radio button */}
            <input type="radio" name="taste" value="like" /> Like
            <input type="radio" name="taste" value="dislike" /> Dislike
            
            </label>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-200">Submit</button>
        </div>
    </div>
  )
}

