import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = () => {
    const blogs = [
        {
            title: "Balanced Nutrition",
            text: "The importance of balanced nutrition in daily life cannot be overstated. A well-balanced diet helps maintain energy levels and improves overall health.",
            timestamp: "2025-02-15T14:30:00.000Z",
            name: "Dr. John Smith",
            tags: ["Nutrition", "Health", "Diet"]
        },
        {
            title: "Exercise and Well-being",
            text: "Regular exercise plays a crucial role in maintaining physical and mental well-being. It helps reduce stress and improves overall fitness levels.",
            timestamp: "2025-02-16T10:15:00.000Z",
            name: "Dr. Jane Doe",
            tags: ["Exercise", "Health", "Fitness"]
        },
        {
            title: "The Importance of Hydration",
            text: "Hydration is key to a healthy lifestyle. Drinking enough water daily supports digestion, energy levels, and overall body functions.",
            timestamp: "2025-02-17T08:45:00.000Z",
            name: "Dr. Alan Brown",
            tags: ["Hydration", "Health", "Wellness"]
        }
    ];

    return (
        <div className="p-6">
            <Button className="mb-6 w-full hover:bg-purple-600">Add Blog</Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                    <Card key={index} className="p-4 shadow-lg rounded-lg">
                        <CardHeader>
                            <CardTitle>{blog.name}</CardTitle>
                            <CardTitle className="text-lg font-semibold">{blog.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 mb-4">{blog.text}</p>
                            <p className="text-sm text-gray-500">{new Date(blog.timestamp).toLocaleString()}</p>
                            <div className="flex gap-2 my-2 flex-wrap">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="bg-blue-200 text-blue-800 px-2 py-1 text-xs rounded-full">{tag}</span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Page;
