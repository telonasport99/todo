import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "../state/todolists-reducer";
type RemoveTaskActionType={
    type:'REMOVE-TASK',
    id:string,
    todolistId:string
}
type AddTaskActionType={
    type:'ADD-TASK',
    todolistId:string
    title:string
}
type ChangeTaskStatusActionType={
    type:"CHANGE-TASK-STATUS",
    isDone:boolean
    todolistId:string
    id:string
}
type ChangeTaskTitleActionType={
    type:"CHANGE-TASK-TITLE",
    title:string
    todolistId:string
    id:string
}

export type ActionType=RemoveTaskActionType|AddTaskActionType|
    ChangeTaskStatusActionType|ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType
const initialState:TasksStateType={}
export const tasksReducer = (state:TasksStateType=initialState,action:ActionType)=>{
    switch (action.type) {
        case 'REMOVE-TASK':{
            return {...state,[action.todolistId]:state[action.todolistId].filter(el=>el.id!==action.id)}
        }
        case "ADD-TASK":{
            const task={id:v1(),title:action.title,isDone:false}
            return {...state,[action.todolistId]:[task,...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.id ? {...t, isDone: action.isDone} : t);

            state[action.todolistId] = newTasksArray
            return ({...state});
        }
        case "CHANGE-TASK-TITLE":{
            return {...state,[action.todolistId]:state[action.todolistId].map(el=>el.id===action.id?{...el,title:action.title}:el)}
        }
        case 'ADD-TODOLIST': {
            return {
            ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state
    }
}
export const removeTaskAC=(id:string,todolistId:string):RemoveTaskActionType=>{
    return{type:'REMOVE-TASK',id,todolistId}
}
export const addTaskAC=(title:string,todolistId:string):AddTaskActionType=>{
    return{type:'ADD-TASK',title,todolistId}
}
export const changeTaskStatusAC=(id:string,isDone:boolean,todolistId:string):ChangeTaskStatusActionType=>{
    return{type:'CHANGE-TASK-STATUS',id,isDone,todolistId}
}
export const changeTaskTitleAC=(id:string,title:string,todolistId:string):ChangeTaskTitleActionType=>{
    return{type:'CHANGE-TASK-TITLE',id,title,todolistId}
}


