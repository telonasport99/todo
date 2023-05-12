import React, {ChangeEvent} from 'react'
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import CheckBox from "@mui/material/Checkbox"
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

      <IconButton onClick={()=>props.removeTodolist(props.todolistId)} >
            <Delete/>
        </IconButton>
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
                    <CheckBox  checked={task.isDone} color={'primary'} onChange={onChangeHandler}/>
                    <EditableSpan title={task.title} onChange={onTitleChangeHandler}/>

                   <IconButton onClick={onClickHandler}>
                       <Delete/>
                   </IconButton>
                </li>
               )
                })}
            </ul>
            <div>
                <Button color={'inherit'} variant={props.filter==='all'?'outlined':'text'} onClick={onAllClickHandler} >All</Button>
                <Button color={'primary'} variant={props.filter==='active'?'outlined':'text'} onClick={onActiveClickHandler}>Active</Button>
                <Button color={'secondary'} variant={props.filter==='completed'?'outlined':'text'} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}