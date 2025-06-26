// frontend/src/components/GenerateTasksForm.tsx
"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus } from "lucide-react";

interface GenerateTasksFormProps {
    onTasksGenerated: () => void;
}

export function GenerateTasksForm({ onTasksGenerated }: GenerateTasksFormProps) {
    const { user } = useUser();
    const [topic, setTopic] = useState("");
    const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null); // Added error state

    const generateTasks = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic.");
            return;
        }

        setLoading(true);
        setError(null); // Clear previous errors
        setGeneratedTasks([]); // Clear previous generated tasks

        try {
            // Fetch the API key from environment variables
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

            if (!apiKey) {
                setError("Gemini API key is not configured.");
                console.error("NEXT_PUBLIC_GEMINI_API_KEY is missing in .env.local");
                return;
            }

            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: `Generate 3 distinct task titles based on the following topic: "${topic}". Provide them as a JSON array where each item is a string. Example: ["Task 1", "Task 2", "Task 3"]` }] });

            const payload = {
                contents: chatHistory,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "ARRAY",
                        items: { "type": "STRING" }
                    }
                }
            };

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const jsonString = result.candidates[0].content.parts[0].text;
                const parsedTasks = JSON.parse(jsonString);
                if (Array.isArray(parsedTasks) && parsedTasks.every(item => typeof item === 'string')) {
                    setGeneratedTasks(parsedTasks);
                } else {
                    setError("Received unexpected format from AI. Please try again.");
                    console.error("AI response not an array of strings:", parsedTasks);
                }
            } else {
                setError("No tasks generated. Please try a different topic.");
                console.error("Unexpected API response structure:", result);
            }
        } catch (error: any) {
            setError(`Failed to generate tasks: ${error.message}`);
            console.error("Error generating tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveAllTasks = async () => {
        setSaving(true);
        setError(null); // Clear previous errors
        try {
            // Get the session token from Clerk. This is the correct token to send to backend.
            // Assuming useAuth is imported at the top (add if not there: import { useAuth } from "@clerk/nextjs";)
            // const { getToken } = useAuth();
            // const token = await getToken({ template: "long_lasting" }); // Get a long-lasting session token

            const promises = generatedTasks.map((taskTitle) =>
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // 'Authorization': `Bearer ${token}` // Send the actual session token
                        Authorization: `Bearer ${user?.id}`, // Fallback if getToken is not implemented yet
                    },
                    body: JSON.stringify({
                        title: taskTitle,
                        category: topic,
                        priority: "medium",
                        // You might need a default description if your backend requires it
                        description: `Generated task for topic: ${topic}`,
                    }),
                })
            );

            const responses = await Promise.all(promises);
            const failedResponses = responses.filter(res => !res.ok);

            if (failedResponses.length > 0) {
                const errorMessages = await Promise.all(failedResponses.map(async res => {
                    const errorData = await res.json();
                    return `(${res.status}) ${errorData.message || res.statusText}`;
                }));
                setError(`Failed to save some tasks: ${errorMessages.join(", ")}`);
            } else {
                setGeneratedTasks([]);
                setTopic("");
                onTasksGenerated(); // Notify parent component (e.g., Dashboard) to refresh tasks
            }
        } catch (error: any) {
            setError(`Failed to save tasks: ${error.message}`);
            console.error("Failed to save tasks:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-2">
                <Input
                    placeholder="Enter a topic (e.g., Learn Python, Plan Wedding)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && generateTasks()}
                />
                <Button onClick={generateTasks} disabled={loading || !topic.trim()}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Generate"}
                </Button>
            </div>

            {error && (
                <div className="text-red-500 p-2 border border-red-300 rounded-md">
                    Error: {error}
                </div>
            )}

            {generatedTasks.length > 0 && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Generated Tasks for "{topic}"</h3>
                            <Button onClick={saveAllTasks} disabled={saving}>
                                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                                Save All Tasks
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {generatedTasks.map((task, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                                    <Badge variant="outline">{index + 1}</Badge>
                                    <span className="flex-1">{task}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}