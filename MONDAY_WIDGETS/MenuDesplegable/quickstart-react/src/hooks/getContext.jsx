import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import { AttentionBox } from "monday-ui-react-core";
const monday = mondaySdk();

const GetUserId = ()=>{
    const [usrId, setUsrId] = useState();
    useEffect(() => {
        monday.listen("filter", res =>{
            setUsrId(res)
        })
        return () => {
            
        };
    }, []);
}
export default GetUserId;
