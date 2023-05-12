import React, {ChangeEvent, useState,KeyboardEvent} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddBox from '@mui/icons-material/AddBox';
type AddItemPropsType ={
    addItem:(title:string)=>void
}
const AddItemForm = (props:AddItemPropsType) => {
    let [title,setTitle]=useState('')
    const [error,setError]=useState<string|null>(null)
    const addItem=()=>{
        if(title.trim()!==''){
            props.addItem(title)
            setTitle('')
        }else{
            setError('Title is required')
        }
    }
        const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
        }
        const onkeypressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
            setError(null)
            if(e.key==='Enter'){
                addItem()
            }
        }
    return (
        <div>
            <TextField variant={'outlined'} value={title} onChange={onChangeHandler} onKeyPress={onkeypressHandler} error={!!error} label={'Title'} helperText={error} />
            <IconButton color={'primary'} onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;