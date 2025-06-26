// frontend/src/components/ProgressChart.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Task {
  id: number;
  title: string;
  category?: string;
  completed: boolean;
  priority: string;
  createdAt: string;
}

interface ProgressChartProps {
  tasks: Task[];
}

export function ProgressChart({ tasks }: ProgressChartProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    const category = task.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = { total: 0, completed: 0 };
    }
    acc[category].total++;
    if (task.completed) {
      acc[category].completed++;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  // Group tasks by priority
  const tasksByPriority = tasks.reduce((acc, task) => {
    if (!acc[task.priority]) {
      acc[task.priority] = { total: 0, completed: 0 };
    }
    acc[task.priority].total++;
    if (task.completed) {
      acc[task.priority].completed++;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "low": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Completion Rate</span>
              <span className="font-medium">{completionRate.toFixed(1)}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
                <div className="text-sm text-muted-foreground">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{pendingTasks}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress by Category */}
      {Object.keys(tasksByCategory).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Progress by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(tasksByCategory).map(([category, stats]) => {
                const categoryProgress = (stats.completed / stats.total) * 100;
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {stats.completed}/{stats.total} ({categoryProgress.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={categoryProgress} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress by Priority */}
      <Card>
        <CardHeader>
          <CardTitle>Progress by Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(tasksByPriority).map(([priority, stats]) => {
              const priorityProgress = (stats.completed / stats.total) * 100;
              return (
                <div key={priority} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(priority)}
                      <span className="capitalize font-medium">{priority} Priority</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {stats.completed}/{stats.total} ({priorityProgress.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={priorityProgress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 5)
              .map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg border">
                  <div className={`h-2 w-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            {tasks.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No tasks yet. Create your first task to see activity here!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}