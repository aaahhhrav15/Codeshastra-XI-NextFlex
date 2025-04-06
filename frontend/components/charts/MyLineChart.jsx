"use client";
import { format, parseISO } from "date-fns";
import {
  Line,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const MyLineChart = () => {
  const [dateRange] = useState({
    from: "2024-01-01",
    to: "2024-12-31",
  });

  const data = [
    { date: "2024-01", value: 15 },
    { date: "2024-02", value: 23 },
    { date: "2024-03", value: 20 },
    { date: "2024-04", value: 28 },
    { date: "2024-05", value: 32 },
    { date: "2024-06", value: 45 },
    { date: "2024-07", value: 40 },
    { date: "2024-08", value: 38 },
    { date: "2024-09", value: 43 },
    { date: "2024-10", value: 50 },
    { date: "2024-11", value: 47 },
    { date: "2024-12", value: 52 },
  ];

  return (
    <>
      <div className="mb-5">
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <p className="text-xl md:text-2xl lg:text-3xl text-textbold">
              Monthly Weight
            </p>
          </div>
          <p className="text-sm md:text-lg lg:text-xl text-textlight">
            Weighing data of every month
          </p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              stroke="var(--white-black)"
              opacity="0.8"
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => format(parseISO(`${str}-01`), "MMM")}
            />
            <YAxis
              stroke="var(--white-black)"
              opacity="0.8"
              dataKey="value"
              axisLine={false}
              tickLine={false}
              tickFormatter={(number) => `${number}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <CartesianGrid opacity={0.4} strokeDasharray="5 5" />
            <Line
              dataKey="value"
              stroke="#FF9F43"
              type="linear"
              activeDot={{ r: 6 }}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MyLineChart;

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="bg-themelight shadow-md p-2 rounded-xl">
        <h4>{format(parseISO(`${label}-01`), "MMM yyyy")}</h4>
        <p>{payload ? `Cases: ${payload[0].value}` : "No data"}</p>
      </div>
    );
  } else return null;
};
