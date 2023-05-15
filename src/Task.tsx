import React, {ChangeEvent, useCallback} from 'react';
import CheckBox from "@mui/material/Checkbox";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
const Task = React.memo((props:TaskPropsType) => {
    const onClickHandler=()=>props.removeTask(props.task.id,props.todolistId)
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id,newIsDoneValue,props.todolistId)
    }
    let onTitleChangeHandler=useCallback((title:string)=>{
        props.changeTaskTitle(props.task.id,title,props.todolistId)
    },[props.changeTaskStatus,props.todolistId,props.task.id])
    return(
        <li key={props.task.id} className={props.task.isDone===true?"is-done":''}>
            <CheckBox  checked={props.task.isDone} color={'primary'} onChange={onChangeHandler}/>
            <EditableSpan title={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>)
});

export default Task;