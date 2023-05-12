import React, {useState} from 'react';
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

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id:string
    title:string
    filter:FilterValueType
}
export type TasksStateType ={
[key:string]:Array<TaskType>
}
function App() {
   let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const addTask = (title: string,todolistId:string) => {
       let task = {id:v1(),title,isDone:false}
        let todolistTasks  = tasks[todolistId]
        tasks[todolistId]= [task,...todolistTasks]
        setTasks({...tasks})
    }


    const removeTask = (id: string,todolistId:string) => {
       let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(tasks=>tasks.id!==id)
        setTasks({...tasks})
    }
    const changeFilter = (value: FilterValueType,todolistId:string) => {
    let todolist= todolists.find(tl=>tl.id===todolistId)
        if(todolist){
            todolist.filter=value
            setTodolists([...todolists])
        }
    }

    function changeTaskStatus(id: string, isDone: boolean,todolistId:string) {
       let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find((el)=>el.id==id)
        if(task){
            task.isDone=isDone
            setTasks({...tasks})

        }
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }
    function removeTodolist(todolistId:string){
      setTodolists(todolists.filter(el=>el.id!==todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist=(title:string)=>{
       let newTodolistId = v1()
        let newTodolist:TodolistsType={id:newTodolistId,title:title,filter:'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,[newTodolistId]:[]
        })

    }
    const changeTodolistTitle=(title:string,todolistId:string)=>{
       let todolist = todolists.find(el=>el.id===todolistId)
        if(todolist){
            todolist.title = title
        }
        setTodolists([...todolists])
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

export default App;
