import React, {ChangeEvent, useState,KeyboardEvent} from 'react';
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
            <input value={title} onChange={onChangeHandler} onKeyPress={onkeypressHandler} className={error?'error':''} />
            <button onClick={addItem}>+</button>
            {error&&<div className={'error-message'}>{error}</div>}
            
        </div>
    );
};

export default AddItemForm;