import { v1 } from 'uuid';
import {TaskType, todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}
export const fetchTodolistsTC=()=>(dispatch:Dispatch)=>{
    todolistsAPI.getTodolists()
        .then(res=>{
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC=(todolistId:string)=>(dispatch:Dispatch)=>{
    todolistsAPI.deleteTodolist(todolistId)
        .then(res=>{
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTc=(title:string)=>(dispatch:Dispatch)=>{
    todolistsAPI.createTodolist(title)
        .then(res=>{
            dispatch(addTodolistAC(title))
        })
}
export const changeTodolistTitleTC=(todolistId:string,title:string)=>(dispatch:Dispatch)=>{
    todolistsAPI.updateTodolist(todolistId,title)
        .then(res=>{
            dispatch(changeTodolistTitleAC(todolistId,title))
        })
}