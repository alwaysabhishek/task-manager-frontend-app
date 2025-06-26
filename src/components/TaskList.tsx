// frontend/src/components/TaskList.tsx
"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Save, X } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description?: string;
  category?: string;
  completed: boolean;
  priority: string;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const { user } = useUser();
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: "", category: "", priority: "medium" });
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const toggleTask = async (taskId: number) => {
    try {
      // Ensure NEXT_PUBLIC_API_URL is correctly set in your .env.local file
      // e.g., NEXT_PUBLIC_API_URL=http://localhost:3001 (if backend is on 3001)
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}/toggle`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.id}`,
        },
      });
      onTaskUpdate();
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.id}`,
        },
      });
      onTaskUpdate();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditForm({
      title: task.title,
      category: task.category || "",
      priority: task.priority,
    });
  };

  const saveEdit = async () => {
    if (!editingTask) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${editingTask}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.id}`,
        },
        body: JSON.stringify(editForm),
      });
      setEditingTask(null);
      onTaskUpdate();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditForm({ title: "", category: "", priority: "medium" });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"; // Corresponds to Shadcn variant
      case "medium": return "secondary"; // Corresponds to Shadcn variant
      case "low": return "outline";     // Corresponds to Shadcn variant
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            {/* Added a fallback text for SelectValue if no value is selected */}
            <SelectValue placeholder="Filter tasks">{filter === "all" ? "All Tasks" : filter === "pending" ? "Pending" : "Completed"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Badge variant="outline">{filteredTasks.length} tasks</Badge>
      </div>

      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No tasks found. Create your first task or generate some with AI!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <Card key={task.id} className={task.completed ? "opacity-60" : ""}>
              <CardContent className="pt-4">
                {editingTask === task.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Task title"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        placeholder="Category"
                        className="flex-1"
                      />
                      <Select
                        value={editForm.priority}
                        onValueChange={(value) => setEditForm({ ...editForm, priority: value })}
                      >
                        <SelectTrigger className="w-32">
                           {/* Added a fallback text for SelectValue if no value is selected */}
                          <SelectValue>{editForm.priority}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={saveEdit}>
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <div className="flex-1">
                      <h4 className={`font-medium ${task.completed ? "line-through" : ""}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {task.category && (
                          <Badge variant="outline" className="text-xs">
                            {task.category}
                          </Badge>
                        )}
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEditing(task)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
