import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials:true,
    headers:{
        'API-KEY':'88e747f1-600f-4bbb-8fce-7131a724b96d'
    }
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

