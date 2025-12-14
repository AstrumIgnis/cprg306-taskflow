export default function Task({ taskId, title, category, description, creationDate, isSelected, onSelect, onTaskAction }) {

    const handleAction = (e, action) => {
        e.stopPropagation(); // prevent li click
        onTaskAction(action, taskId);
    };

    return (
        <li className={`p-4 rounded-lg border cursor-pointer transition ${isSelected ? "bg-blue-50 border-blue-500 ring-2 ring-blue-300 text-gray-900" : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-900"}`}
            onClick={() => { onSelect(taskId); }}
        >

            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">
                {category} • {new Date(creationDate).toLocaleDateString()}
            </p>

            {isSelected && (
                <div className="mt-2">
                    <p className="text-gray-700">{description}</p>
                    <button className="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg mr-5 mb-5" onClick={(e) => handleAction(e, "complete")}>Mark as Completed</button>
                    <button className="border border-red-400 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg" onClick={(e) => handleAction(e, "delete")}>Delete Task</button>
                </div>
            )}
        </li>
    );
}