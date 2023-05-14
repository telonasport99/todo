import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id:string
    title:string
    filter:FilterValueType
}
export type TasksStateType ={
[key:string]:Array<TaskType>
}
function AppWithRedux() {
    const todolists = useSelector<AppRootStateType,Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
    const dispatch=useDispatch()
    const addTask = (title: string,todolistId:string) => {
    let action = addTaskAC(title,todolistId)
        dispatch(action)
    }
    const removeTask = (id: string,todolistId:string) => {
       let action = removeTaskAC(id,todolistId)
        dispatch(action)
    }
    const changeFilter = (value: FilterValueType,todolistId:string) => {
        let action = ChangeTodolistFilterAC(todolistId,value)
        dispatch(action)
    }
    function changeTaskStatus(id: string, isDone: boolean,todolistId:string) {
      let action = changeTaskStatusAC(id,isDone,todolistId)
        dispatch(action)
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let action = changeTaskTitleAC(id,newTitle,todolistId)
        dispatch(action)
    }
    function removeTodolist(todolistId:string){
     let action = RemoveTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodolist=(title:string)=>{
       const action=AddTodolistAC(title)
        dispatch(action)
    }
    const changeTodolistTitle=(title:string,todolistId:string)=>{
      let action = ChangeTodolistTitleAC(todolistId,title)
        dispatch(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar >
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
            <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {todolists.map((el)=>{
                let allTodolistTasks = tasks[el.id]
                let taskForTodolist=allTodolistTasks
                if (el.filter === 'active') {
                    taskForTodolist = allTodolistTasks.filter(tasks => !tasks.isDone)
                }
                if (el.filter === 'completed') {
                    taskForTodolist = allTodolistTasks.filter(tasks => tasks.isDone)
                }
                return(
                    <Grid item>
                        <Paper style={{padding:'10px'}}>
                    <Todolist key={el.id} title={el.title} todolistId={el.id} tasks={taskForTodolist}
                              removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}
                              changeTaskStatus={changeTaskStatus} filter={el.filter}
                                removeTodolist={removeTodolist}
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}
                    />
                        </Paper>
                    </Grid>
                )
            })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
