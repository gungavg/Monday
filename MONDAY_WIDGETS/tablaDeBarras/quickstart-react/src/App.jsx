import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import { AttentionBox } from "monday-ui-react-core";
import Background from "./Components/Containers/background";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {

  return (
    <div className="App">
      <Background></Background>
    </div>
  );
};

export default App;
