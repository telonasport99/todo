import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    title:string
    onChange:(newTitle:string)=>void
}
const EditableSpan = (props:EditableSpanPropsType) => {
    let [editMode,setEditMode]=useState(false)
    let [title,setTitle]=useState(props.title)
    const activateEditMode = ()=>{
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode=()=>{
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode?
        <TextField variant={'outlined'} value={title} onChange={changeTitle} onBlur={activateViewMode} autoFocus/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
};

export default EditableSpan;