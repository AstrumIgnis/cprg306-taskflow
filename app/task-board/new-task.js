"use client"

import { useState } from "react";

function GenerateId() {
    return '_' + Math.random().toString(36).substring(2, 20);
}

export default function NewTask({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const submitFunction = (event) => {
        event.preventDefault();

        const newTask = {
            id: GenerateId(),
            title: title,
            category: category,
            description: description,
            completed: false,
            creationDate: new Date().toISOString(),
            completionDate: null
        };

        onAddTask(newTask);

        // Reset form fields after submission
        setTitle("");
        setCategory("");
        setDescription("");
    }

    return (
        <form className="w-full max-w-xl mx-auto mb-6 bg-white text-gray-900 rounded-xl shadow-lg p-6" onSubmit={submitFunction}>
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

            {/* Title */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Title
                </label>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 p-2focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Category */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Category
                </label>
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Description */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                    Description
                </label>
                <textarea
                    placeholder="Describe the task…"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition">Add Task</button>
        </form>
    );
}