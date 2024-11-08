import React, { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { AttentionBox } from "monday-ui-react-core";
const monday = mondaySdk();
//componente filtros

const Filtros = ({ filters }) => {
  return (
    <div>
      <h2>Filtros aplicados:</h2>
      {filters.length > 0 ? (
        filters.map((filter, index) => <p key={index}>{filter}</p>)
      ) : (
        <p>No hay filtros aplicados.</p>
      )}
    </div>
  );
};



// Componente Render
const Render = ({ colorTheme }) => {
  return (
    <div
      style={{
        backgroundColor: colorTheme === "dark" ? "#B1B1B3" : "#fff",
        color: colorTheme === "dark" ? "#fff" : "#000",
      }}
    >
      <h1>Theme actual: {colorTheme}</h1>
      <AttentionBox title="Este es el tema actual" />
    </div>
  );
};

// Componente para mostrar los grupos seleccionados
// Componente para mostrar los grupos seleccionados
const BoardId = ({ groups, colorTheme }) => {
  return (
    <div
      style={{
        backgroundColor: colorTheme === "dark" ? "#B1B1B3" : "#fff",
        color: colorTheme === "dark" ? "#fff" : "#000",
      }}
    >
      <h1>Grupos seleccionados:</h1>
      {groups.length > 0 ? (
        groups.map((board, index) => (
          <div key={index}>
            <h2>Board ID: {board.boardId}</h2>
            {board.groups.map((group, groupIndex) => (
              <p key={groupIndex}>{group}</p>
            ))}
          </div>
        ))
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};


// Componente Principal que obtiene el tema y los IDs de grupos
const App = () => {
  const [usrtheme, setUsrtheme] = useState(null);
  const [groups, setGroups] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    monday.listen("context", (res) => {
      setUsrtheme(res.data);
    });
    const callback = res => console.log(res);
    monday.listen('filter', callback);

    monday.get("settings").then((res) => {
      const groupsPerBoard = res.data.groupsPerBoard?.group_ids_per_board || {};
      const columnsPerBoard = res.data.columnsPerBoard || {};
      const allBoardGroups = Object.entries(groupsPerBoard).map(([boardId, groups]) => ({
        boardId,
        groups
      }));
      const allColumns = Object.entries(columnsPerBoard).map(([boardId, columns]) => ({
        boardId,
        columns
      }));
      setGroups(allBoardGroups);
      console.log("Grupos obtenidos por tablero:", allBoardGroups);
      console.log("Columnas filtradas:" , allColumns);
    });
    monday.get("settings").then((res) => {
      const settings = res;
      console.log("Columnas por tablero:", settings);
    });
    const unsubscribe = monday.listen("filter", (res) => {
      console.log("Filtros actualizados:", res.data.rules);
      setFilters(res.data || {});
    });

    // Limpieza al desmontar el componente
    return () => unsubscribe();
  }, []);

  let colorTheme = usrtheme && usrtheme.theme === "light" ? "dark" : "light";

  return (
    <div>
      <Render colorTheme={colorTheme} />
      <BoardId groups={groups} colorTheme={colorTheme} />
      <Filtros filters={filters}  />
    </div>
  );
};
export default App;
