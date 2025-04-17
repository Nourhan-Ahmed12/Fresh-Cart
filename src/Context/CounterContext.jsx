import { useState } from "react";
import { createContext } from "react";

export let CounterContext = createContext(0);
export default function CounterContextProvider(props)
{
    const [userName, setUserName]= useState('')
    const [counter, setCounter]= useState(0)
    
    return (<>
        <CounterContext.Provider value={ {counter , userName} }>
            {props.children}
        </CounterContext.Provider>
    </>)
}