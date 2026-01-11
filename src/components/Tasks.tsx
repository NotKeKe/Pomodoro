// basically vibe coding
import { useState, type Dispatch, type SetStateAction } from "react";

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TasksProps {
    tasks: Task[];
    toggleTask: (id: number) => void;
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function Tasks({ tasks, toggleTask, setTasks }: TasksProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskText, setNewTaskText] = useState("");
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

    const addTask = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        if (!newTaskText.trim()) return setIsModalOpen(false);

        const newTask = {
            id: Date.now(), // 使用 timestamp 避免重複 ID
            text: newTaskText,
            completed: false,
        };
        setTasks(prev => [...prev, newTask]);
        setNewTaskText("");
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setNewTaskText("");
        setIsModalOpen(false);
    };

    const deleteTask = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // 避免觸發 li 的 onClick (toggleTask)
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    // Drag and Drop 邏輯
    const handleDragStart = (index: number) => {
        setDraggedItemIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault(); // 必須 preventDefault 才能觸發 drop
        if (draggedItemIndex === null || draggedItemIndex === index) return;

        const newTasks = [...tasks];
        const draggedItem = newTasks[draggedItemIndex];

        // 重新排序
        newTasks.splice(draggedItemIndex, 1);
        newTasks.splice(index, 0, draggedItem);

        setDraggedItemIndex(index);
        setTasks(newTasks);
    };

    const handleDragEnd = () => {
        setDraggedItemIndex(null);
    };

    return (
        <div className="tasks">
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        onClick={() => toggleTask(task.id)}
                        className={`
                            ${task.completed ? 'completed' : ''} 
                            ${draggedItemIndex === index ? 'dragging' : ''}
                        `}
                    >
                        <div className="task-content">
                            <span className="checkbox">{task.completed ? '✓' : ''}</span>
                            {task.text}
                        </div>
                        <button className="delete-button" onClick={(e) => deleteTask(e, task.id)}>×</button>
                    </li>
                ))}
            </ul>
            <button className="add-button" onClick={addTask}>Add Task</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Task</h3>
                        <input
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            placeholder="What are you working on?"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                        />
                        <div className="modal-actions">
                            <button className="cancel" onClick={handleCancel}>Cancel</button>
                            <button className="save" onClick={handleConfirm}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
