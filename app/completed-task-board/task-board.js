"use client"

import Task from "./task";
import { useState } from "react";

export default function TaskBoard({ tasks, onTaskAction }) {
    const [sortby, setSortBy] = useState("title");
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const getSortedTasks = () => {
        let TaskData = [...tasks];

        if (sortby === "title") {
            return TaskData.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (sortby === "category") {
            const categorizedData = TaskData.reduce((category, task) => {
                (category[task.category.toLowerCase()] ??= []).push(task);
                return category;
            }, {});

            return Object.keys(categorizedData)
                .map(key => ({ key, tasks: categorizedData[key] }))
                .sort((a, b) => a.key.localeCompare(b.key));
        }
    };

    const sortedTasks = getSortedTasks();

    return (
        <div className="w-full max-w-7xl mx-auto bg-white text-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Tasks</h2>

            <div className="flex justify-center gap-2 mb-6">
                <button
                    className={`px-4 py-1 rounded-lg text-sm font-medium ${sortby === "title" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    onClick={() => setSortBy("title")}>
                    Title
                </button>
                <button
                    className={`px-4 py-1 rounded-lg text-sm font-medium ${sortby === "category" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    onClick={() => setSortBy("category")}>
                    Category
                </button>
            </div>

            {sortby === "category" ? (
                <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
                    {sortedTasks.map(group => (
                        <div key={group.key} className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                            <h2 className="text-xl font-semibold mb-4 capitalize">
                                {group.key}
                            </h2>

                            <ul className="space-y-4">
                                {group.tasks.map(task => (
                                    <Task
                                        key={task.firestoreId}
                                        {...task}
                                        taskId={task.firestoreId}
                                        isSelected={selectedTaskId === task.firestoreId}
                                        onSelect={setSelectedTaskId}
                                        onTaskAction={onTaskAction}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <ul className="space-y-3">
                    {sortedTasks.map(task => (
                        <Task
                            key={task.firestoreId}
                            {...task}
                            taskId={task.firestoreId}
                            isSelected={selectedTaskId === task.firestoreId}
                            onSelect={setSelectedTaskId}
                            onTaskAction={onTaskAction}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}