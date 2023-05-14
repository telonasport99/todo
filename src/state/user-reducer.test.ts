import {userReducer} from "./user-reducer";
test('user reducer should increment age',()=>{
    const startState={age:20,childrenCount:2,name:'Dima'}
    const endState=userReducer(startState,{type:'INCREMENT-AGE'})
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})
test('user reducer should increment only childCount',()=>{
    const startState={age:20,childrenCount:2,name:'Dima'}
    const endState=userReducer(startState,{type:'INCREMENT-CHiLDREN-COUNT'})
    expect(endState.childrenCount).toBe(3)
})
test('USER reducer should change name',()=>{
    const startState={age:20,childrenCount:2,name:'Dima'}
    const endState=userReducer(startState,{type:'CHANGE-NAME'})
    expect(endState.name).toBe('Vadim')
})