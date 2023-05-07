import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const addTask = (title: string) => {
        let task = {id: v1(), title, isDone: false}
        let newTasks = [task, ...tasks]
        setTask(newTasks)
    }
    let [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "rrr", isDone: true},
        {id: v1(), title: "dfgdf", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValueType>('all')
    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(tasks => tasks.isDone === false)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(tasks => tasks.isDone === true)
    }
    const removeTask = (id: string) => {
        tasks = tasks.filter(task => task.id !== id)
        setTask(tasks)
    }
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    function changeTaskStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTask([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={taskForTodolist} addTask={addTask}
                      removeTask={removeTask} changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
