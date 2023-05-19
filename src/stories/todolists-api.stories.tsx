import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistApi.getTodolists().then(res=>setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist('Salam').then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId="b11ef675-ce5d-42c4-98a5-9c715b8ed5d1"
    useEffect(() => {
        todolistApi.deleteTodolist(todolistId)
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId="2b5b60a2-c4f6-4ca2-ae9b-633104702dfb"
    useEffect(() => {
        todolistApi.updateTodolist(todolistId,'newwwwww')
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = ()=>{
    const [state,setState]=useState<any>(null)
    const todolistId="2b5b60a2-c4f6-4ca2-ae9b-633104702dfb"
    useEffect(()=>{
        todolistApi.getTasks(todolistId)
            .then(res=>setState(res.data))
    },[])
    return<div>{JSON.stringify(state)}</div>
}
export const PostTasks = ()=>{
    const [state,setState]=useState<any>(null)
    const todolistId="2b5b60a2-c4f6-4ca2-ae9b-633104702dfb"
    useEffect(()=>{
     todolistApi.postTask(todolistId,'УДАЛИ').then(res=>setState(res.data))
    },[])
    return<div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = ()=>{
    const [state,setState]=useState<any>(null)
    const todolistId="2b5b60a2-c4f6-4ca2-ae9b-633104702dfb"
    const taskId="49598c60-fe68-43a1-bbb7-95a2e0ef904c"
    useEffect(()=>{
     todolistApi.deleteTask(todolistId,taskId).then(res=>setState(res.data))
    },
        [])
    return<div>{JSON.stringify(state)}</div>
}
export const UpdateTasks = ()=>{
    const [state,setState]=useState<any>(null)
    const todolistId="2b5b60a2-c4f6-4ca2-ae9b-633104702dfb"
    const taskId="ab27fccf-ca36-410a-9952-c5f6a3576081"
    useEffect(()=>{
     todolistApi.updateTask(todolistId,taskId,{...state, title:'SOS'}).then(res=>setState(res.data))
    },
        [])
    return<div>{JSON.stringify(state)}</div>
}
