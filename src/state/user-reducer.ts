import React from "react";
type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}
export const userReducer = (state:StateType,action:ActionType)=>{
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state,age:state.age+1}
        case 'INCREMENT-CHiLDREN-COUNT':
            return {...state,childrenCount:state.childrenCount+1}
        case 'CHANGE-NAME':
            return {...state,name:state.name = 'Vadim'}
        default:
            throw new Error('Idn')
    }
}