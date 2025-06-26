// frontend/src/app/dashboard/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { GenerateTasksForm } from "@/components/GenerateTasksForm";
import { ProgressChart } from "@/components/ProgressChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      syncUser();
      fetchTasks();
    }
  }, [isLoaded, user]);

  const syncUser = async () => {
    if (!user) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: user.fullName,
        }),
      });
    } catch (error) {
      console.error("Failed to sync user:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${user?.id}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
        <p className="text-muted-foreground">Manage your tasks and boost your productivity</p>
      </div>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList tasks={tasks} onTaskUpdate={fetchTasks} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate Tasks with AI</CardTitle>
            </CardHeader>
            <CardContent>
              <GenerateTasksForm onTasksGenerated={fetchTasks} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressChart tasks={tasks} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskForm onTaskCreated={fetchTasks} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}