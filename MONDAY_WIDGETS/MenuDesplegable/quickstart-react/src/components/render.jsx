import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import { AttentionBox } from "monday-ui-react-core";
const monday = mondaySdk();

const Render = () => {


    const [usrtheme, setUsrtheme] = useState();
    useEffect(() => {
        monday.listen("cnstext",(res)=>{setUsrtheme(res.data);});
    },[] );
    let themeUsr = usrtheme.theme;
    let colorTheme = ''
    if (themeUsr = 'light' ){
        colorTheme = 'dark'
        return colorTheme
    }
    return (
        <div>
            
        </div>
    );
}

export default Render;
