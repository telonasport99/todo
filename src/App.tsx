import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
export type FilterValueType = 'all'|'active'|'completed'
function App() {
let [tasks,setTask] = useState( [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "rrr", isDone: true },
    { id: 5, title: "dfgdf", isDone: false }
])
let [filter,setFilter]=useState<FilterValueType>('all')
    let taskForTodolist = tasks
    if (filter==='active'){
        taskForTodolist= tasks.filter(tasks=>tasks.isDone===false)
    }
    if (filter==='completed'){
        taskForTodolist= tasks.filter(tasks=>tasks.isDone===true)
    }
const removeTask=(id:number)=>{
    tasks = tasks.filter(task=>task.id!==id)
   setTask(tasks)
}
    const changeFilter=(value:FilterValueType)=>{
        setFilter(value)
    }
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={taskForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
