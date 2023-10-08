import React from "react";
import { ContextI } from './../Types/index';

export const Context = React.createContext<ContextI>({
    currencies: null,
    setCurrencies: null,

    fromTo: null,
    setFromTo: null,

    inputValues: null,
    setInputValues: null,

    trigers: null,
    setTrigers: null,

    isAnim: false,
    setIsAnim: null,

    handleChange: null,
    handleCurChange: null
    
})