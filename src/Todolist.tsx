import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValueType} from "./App";
import {Simulate} from "react-dom/test-utils";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
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
export const Todolist = (props:PropsType) => {
    const addTask=(title:string)=>{
        props.addTask(title,props.todolistId)
    }
    let onAllClickHandler=()=>{
        props.changeFilter('all',props.todolistId)
    }
    let onActiveClickHandler=()=>{
        props.changeFilter('active',props.todolistId)
    }
    let onCompletedClickHandler=()=>{
        props.changeFilter('completed',props.todolistId)
    }
    const changeTodolistTile=(title:string)=>{
        props.changeTodolistTitle(title,props.todolistId)
    }
    return (
        <div>

        <EditableSpan onChange={changeTodolistTile} title={props.title}/>
        <button  onClick={()=>props.removeTodolist(props.todolistId)}>x</button>

            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {props.tasks.map((task)=>{
                const onClickHandler=()=>props.removeTask(task.id,props.todolistId)
                const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeTaskStatus(task.id,newIsDoneValue,props.todolistId)
                }
                let onTitleChangeHandler=(title:string)=>{
                    props.changeTaskTitle(task.id,title,props.todolistId)
                }
               return(
                <li key={task.id} className={task.isDone===true?"is-done":''}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                    <EditableSpan title={task.title} onChange={onTitleChangeHandler}/>
                   <button onClick={onClickHandler}>✖</button>
                </li>
               )
                })}
            </ul>
            <div>
                <button className={props.filter==='all'?'active-filter':''} onClick={onAllClickHandler} >All</button>
                <button className={props.filter==='active'?'active-filter':''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter==='completed'?'active-filter':''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}