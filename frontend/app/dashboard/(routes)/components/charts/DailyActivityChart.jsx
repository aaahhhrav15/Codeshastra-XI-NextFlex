import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"


const DailyActivityChart = ({ foodIntake, exerciseDone }) => {
  const data = [...foodIntake, ...exerciseDone].map((item) => ({
    time: item.time,
    calories: "cal" in item ? item.cal : 0,
    caloriesBurnt: "cal_burnt" in item ? item.cal_burnt : 0,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="calories" fill="#8884d8" name="Calories Consumed" />
        <Bar dataKey="caloriesBurnt" fill="#82ca9d" name="Calories Burnt" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DailyActivityChart

