import React, { useEffect, useState } from 'react';
import mondaySdk from "monday-sdk-js";
import Table from '../Pure/table';

// Inicialización de mondaySdk
const monday = mondaySdk();

/**
 * Este será el contenedor de la tabla, donde se deben pasar las props del tema del usuario para que se renderice con el tema
 */
const DivWithBackground = ({ children }) => {
    // Estado para el tema del usuario
    const [usrtheme, setUsrtheme] = useState(null);
    
    useEffect(() => {
        // Se obtiene el tema del usuario y se configura
        monday.listen('context', (res) => {
            setUsrtheme(res.data);
        });
    }, []);
    
    let colorTheme = usrtheme && usrtheme.theme === "light" ? "dark" : "light";
    let bgColor = colorTheme === "dark" ? "#fff" : "#111111";
    let fontColor = colorTheme === "dark" ? "#111111 " : "#fff";
    let stylePersonal = { backgroundColor: bgColor, color:fontColor, width: '100%' , height:'100%'};
    
    return (
        <div style={stylePersonal}>
            {children}
        </div>
    );
};

const Background = () => {
    return (
        <DivWithBackground>
            <Table></Table>
        </DivWithBackground>
    );
};

export default Background;
