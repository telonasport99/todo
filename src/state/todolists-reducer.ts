import React from "react";
import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType={
    type:'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}
export type ChangeTodolistFilterActionType={
    type:'CHANGE-TODOLIST-FILTER'
    id:string
    filter:FilterValueType
}
export type ActionType= AddTodolistActionType|RemoveTodolistActionType|ChangeTodolistFilterActionType|ChangeTodolistTitleActionType

export const todolistsReducer = (state:Array<TodolistType>,action:ActionType)=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return   [...state.filter(el=>el.id!==action.id)]
        }
        case 'ADD-TODOLIST':{
            return [...state, {id:action.todolistId,title:action.title,filter:'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            return state.map(todolist=>todolist.id===action.id?{...todolist,title:action.title}:todolist)
            }
        case 'CHANGE-TODOLIST-FILTER':{
            return state.map(el=>el.id===action.id?{...el,filter:action.filter}:el)
        }
        default:
            throw new Error('i dnk thid type')
    }
}
export const RemoveTodolistAC=(todolistId:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST',id:todolistId}
}
export const AddTodolistAC=(title:string):AddTodolistActionType=>{
    return {type:'ADD-TODOLIST',title,todolistId:v1()}
}
export const ChangeTodolistTitleAC=(todolistId:string,title:string):ChangeTodolistTitleActionType=>{
    return {type:'CHANGE-TODOLIST-TITLE',id:todolistId,title}
}
export const ChangeTodolistFilterAC=(todolistId:string,filter:FilterValueType):ChangeTodolistFilterActionType=>{
    return {type:'CHANGE-TODOLIST-FILTER',id:todolistId,filter}
}