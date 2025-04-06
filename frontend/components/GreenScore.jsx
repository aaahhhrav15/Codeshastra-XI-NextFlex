export default function GreenScore({ score }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Green Score</h2>
        <div className="flex items-center space-x-4">
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <span className="text-2xl font-bold text-green-600">{score}</span>
        </div>
      </div>
    );
  }
  