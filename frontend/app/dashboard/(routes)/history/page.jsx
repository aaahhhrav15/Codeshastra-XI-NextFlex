'use client'
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveCalendar } from '@nivo/calendar';

const Page = () => {
    const [filterDate, setFilterDate] = useState("");
    const history = [
        {
            text: "Completed 10,000 steps goal.",
            timestamp: "2025-02-15T14:30:00.000Z"
        },
        {
            text: "Achieved daily hydration target.",
            timestamp: "2025-02-16T10:15:00.000Z"
        },
        {
            text: "Burned 500 calories in a workout session.",
            timestamp: "2025-02-17T08:45:00.000Z"
        }
    ];

    const filteredHistory = filterDate ? history.filter(entry => new Date(entry.timestamp) <= new Date(filterDate)) : history;

    const formattedData = history.map(entry => ({
        day: entry.timestamp.split('T')[0],
        value: 1
    }));

    return (
        <div className="p-6">
            <input 
                type="date" 
                className="mb-6 p-2 border rounded w-full" 
                onChange={(e) => setFilterDate(e.target.value)}
            />
            <div className="m-1">
                {filteredHistory.map((entry, index) => (
                    <Card key={index} className="p-4 mb-4 mt-4 shadow-lg rounded-lg">
                        <CardContent>
                            <p className="text-gray-700 mb-4">{entry.text}</p>
                            <p className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="h-64">
                <ResponsiveCalendar
                    data={formattedData}
                    from="2025-01-01"
                    to="2025-12-31"
                    emptyColor="#eeeeee"
                    colors={["#d6e685", "#8cc665", "#44a340", "#1e6823"]}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    yearSpacing={40}
                    monthBorderColor="#ffffff"
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff"
                    theme={{
                        textColor: "#C9D1D9",
                        tooltip: {
                            container: {
                                background: "#161B22",
                                color: "#C9D1D9",
                                border: "1px solid #30363D"
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Page;
