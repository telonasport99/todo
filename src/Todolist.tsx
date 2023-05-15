import React, {ChangeEvent, useCallback} from 'react'
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import CheckBox from "@mui/material/Checkbox"
import Task from "./Task";
type PropsType = {
    title:string
    tasks:Array<TaskType>
    removeTask:(id:string,todolistId:string)=>void
    changeFilter:(value:FilterValueType,todolistId:string)=>void
    addTask:(title:string,todolistId:string)=>void
    changeTaskStatus:(id:string,isDone:boolean,todolistId:string)=>void
    filter:FilterValueType
    todolistId:string
    removeTodolist:(todolistId:string)=>void
    changeTaskTitle:(id: string, newTitle: string, todolistId: string)=>void
    changeTodolistTitle:(title:string,todolistId:string)=>void
}
export  type TaskType={
    id:string
    title:string
    isDone:boolean
}
export const Todolist = React.memo((props:PropsType) => {
    console.log("Todolist called")
    const addTask = useCallback((title:string)=>{
        props.addTask(title,props.todolistId)
    },[props.addTask,props.todolistId])
    let onAllClickHandler= useCallback(()=>{
        props.changeFilter('all',props.todolistId)
    },[props.changeFilter,props.todolistId])
    let onActiveClickHandler= useCallback(()=>{
        props.changeFilter('active',props.todolistId)
    },[props.changeFilter,props.todolistId])
    let onCompletedClickHandler=useCallback(()=>{
        props.changeFilter('completed',props.todolistId)
    },[props.changeFilter,props.todolistId])
    const changeTodolistTile=(title:string)=>{
        props.changeTodolistTitle(title,props.todolistId)
    }
    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(tasks => !tasks.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(tasks => tasks.isDone)
    }
    return (
        <div>

        <EditableSpan onChange={changeTodolistTile} title={props.title}/>

      <IconButton onClick={()=>props.removeTodolist(props.todolistId)} >
            <Delete/>
        </IconButton>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {tasksForTodolist.map((task)=><Task todolistId={props.todolistId }
                                                    task={task}
                                                    removeTask={props.removeTask}
                                                changeTaskStatus={props.changeTaskStatus}
                                                    changeTaskTitle={props.changeTaskTitle}
                                                    key={task.id}
                    />
                )}
            </ul>
            <div>
                <Button color={'inherit'} variant={props.filter==='all'?'outlined':'text'} onClick={onAllClickHandler} >All</Button>
                <Button color={'primary'} variant={props.filter==='active'?'outlined':'text'} onClick={onActiveClickHandler}>Active</Button>
                <Button color={'secondary'} variant={props.filter==='completed'?'outlined':'text'} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})