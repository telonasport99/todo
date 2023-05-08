import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValueType} from "./App";
import {Simulate} from "react-dom/test-utils";
import keyPress = Simulate.keyPress;
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
}
export  type TaskType={
    id:string
    title:string
    isDone:boolean
}
export const Todolist = (props:PropsType) => {
    let [title,setTitle]=useState('')
    const [error, setError]=useState<null|string>(null)
    const addTask=()=>{
        if(title.trim()!==''){
        props.addTask(title.trim(),props.todolistId)
        setTitle('')}
        else {
            setError('Title is required')
        }
    }
    let onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }
    let onKeyPressHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        setError(null)
        if(event.key==='Enter'){
            addTask()
        }
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
    return (
        <div>

        <span>{props.title}</span>
        <button  onClick={()=>props.removeTodolist(props.todolistId)}>x</button>

            <div>
                <input value={title}
                       onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                       className={error?'error':''}
                />
                <button onClick={()=>{addTask()}}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task)=>{
                const onClickHandler=()=>props.removeTask(task.id,props.todolistId)
                const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeTaskStatus(task.id,newIsDoneValue,props.todolistId)
                }
               return(
                <li key={task.id} className={task.isDone===true?"is-done":''}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                    <span>{task.title}</span>
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