import React, { useEffect, useState } from 'react';
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

const Table = () => {
    const [groups, setGroups] = useState([]);
    let boardIds = []; // Variable para almacenar los IDs de tableros

    useEffect(() => {
        monday.get("settings").then((res) => {
            console.log("Estructura completa de datos:", res.data); // Revisar la estructura de los datos
            
            const idBoards = res.data.groupsPerBoard || {};

            // Extraemos todos los IDs de tableros y sus grupos asociados
            const allBoardsGroups = Object.entries(idBoards).flatMap(([_, boardGroups]) => {
                return Object.entries(boardGroups).map(([boardId, groupNames]) => ({
                    boardId,
                    groups: groupNames
                }));
            });
            
            // Guardamos los datos en el estado y en la variable boardIds
            setGroups(allBoardsGroups);
            boardIds = allBoardsGroups.map(board => board.boardId); // Almacenar los IDs en la variable

            console.log("IDs de Tableros capturados:", boardIds);

            // Construcción de la query
            const query = `query { boards(ids: [${boardIds.join(", ")}]) { name } }`;
            console.log("Query generada:", query);
        });
    }, []); // Ejecutar solo una vez al montar el componente

    return (
        <div>
            <p>Detalles de Tableros y Grupos:</p>
            <ul>
                {groups.map(({ boardId, groups }) => (
                    <li key={boardId}>
                        <strong>Tablero {boardId}:</strong> {groups.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Table;
