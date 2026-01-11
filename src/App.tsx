import { useState } from "react";

import { secondToString } from "./utils/second_to_str";
import { useTimer } from "./hooks/timer";
import { timerMode, useActiveMode } from "./hooks/timer_mode";
import { Tasks, type Task } from "./components/Tasks";

function App() {
    const { time, isStart, toggleStart, setTime, addTime, subTime } = useTimer();

    const [activeMode, setActiveMode] = useState('Pomodoro');

    // tasks
    const [tasks, setTasks] = useState<Task[]>([
        { id: -1, text: "Focus", completed: false },
    ]);

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <>
            <div className="header">
                <h1>Pomodoro</h1>
                <nav>
                    <ul className='button'>
                        <li><a href="/">Home</a></li>
                        <li><a href="https://www.wales.com.tw">About</a></li>
                    </ul>
                </nav>
            </div>

            <main>
                <div className="container">
                    <nav>
                        <ul>
                            {timerMode.map((mode) => (
                                <li key={mode.label} onClick={useActiveMode(mode.label, setActiveMode, setTime, toggleStart)} className={activeMode === mode.label ? 'active' : ''}>
                                    {mode.label}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <p className="time">{secondToString(time)}</p>

                    <div className="buttons">
                        <button className="left" onClick={subTime}>-</button>
                        <button className="start-button" onClick={toggleStart}>{isStart ? "Stop" : "Start"}</button>
                        <button className="right" onClick={addTime}>+</button>
                    </div>
                </div>

                <div className="curr-task">
                    <p>Time to {tasks[0].text} !</p>
                </div>

                <Tasks tasks={tasks} toggleTask={toggleTask} setTasks={setTasks} />
            </main>
        </>
    )
}

export default App
