import React from 'react'
import axios from "axios";

const settings = {
    withCredentials:true,
    headers:{
        'API-KEY':'88e747f1-600f-4bbb-8fce-7131a724b96d'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials:true,
    headers:{
        'API-KEY':'88e747f1-600f-4bbb-8fce-7131a724b96d'
    }
    }
)
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}
type DeleteTodolistResponseType={
    resultCode: number
    messages: Array<string>,
    data: {}
}
type UpdateTodolistResponseType={
data:{},
    messages:Array<string>,
    fieldsErrors:Array<string>,
    resultCode:number
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export const todolistApi = {
    updateTodolist(todolistId:string,title:string){
      return  instance.put(`todo-lists/${todolistId}`,
            {title:title})
    },
    getTodolists(){
        return instance.get<Array<TodolistType>>(`todo-lists`)

    },
    createTodolist(title:string){
        return  instance.post<ResponseType<{item:TodolistType}>>(`todo-lists`,{title:title})
    },
    deleteTodolist(todolistId:string){
        return  instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`)

    }

}