"use client"

import TaskBoard from "./task-board";
import NewTask from "./new-task";
import { getTasks, addTask, completeTask, deleteTask } from "../_services/task-board-service";
import { useUserAuth } from "../_utils/auth-context";
import { useState, useEffect } from "react";

export default function PageClient() {
    const { user } = useUserAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) loadTasks();
    }, [user]);

    async function loadTasks() {
        let tasksData = await getTasks(user.uid);
        setTasks(tasksData);
    }

    if (!user) {
        return <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-lg">Loading...</div>;
    }

    const handleAddTask = async (newTask) => {
        const taskId = await addTask(user.uid, newTask);

        setTasks(prev => [
            ...prev,
            { ...newTask, firestoreId: taskId }
        ]);
    };

    const handleTaskAction = async (action, taskId) => {
        if (action === "complete") {
            await completeTask(user.uid, taskId);
        } else if (action === "delete") {
            await deleteTask(user.uid, taskId);
        }

        // Update local state for immediate UI feedback
        setTasks(prev => prev.filter(task => task.firestoreId !== taskId));
    };

    return (
        <main className="w-full flex justify-center px-4">
            <div className="w-full max-w-4xl flex flex-col gap-8">

                {/* Page Header */}
                <header className="text-center mt-6">
                    <h1 className="text-3xl font-bold text-gray-900">Your Tasks</h1>
                    <p className="text-gray-600 mt-1">Add, organize, and complete your tasks</p>
                </header>

                {/* New Task Card */}
                <section>
                    <NewTask onAddTask={handleAddTask} />
                </section>

                {/* Task Board Card */}
                <section className="bg-white rounded-xl shadow-lg p-6">
                    <TaskBoard
                        tasks={tasks}
                        userId={user.uid}
                        onTaskAction={handleTaskAction}
                    />
                </section>

            </div>
        </main>
    );
}