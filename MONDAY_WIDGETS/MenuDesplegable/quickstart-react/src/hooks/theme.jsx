import { ThemeProvider } from "monday-ui-react-core";
import mondaySdk from "monday-sdk-js";
import { useEffect, useState } from "react";
import Render from "./Render";

const monday = mondaySdk();

const useGetContext = () => {
  const [context, setContext] = useState({});
  
  useEffect(() => {
    monday.get("context").then(res => {
      setContext(res.theme);
    });

    monday.listen("context", (res) => {
      setContext(res.theme);
    });
  }, []);

  return context;
};

const AppWrapper = () => {
  const context = useGetContext();
  
  const [systemTheme, setSystemTheme] = useState(context.theme || "light");

  useEffect(() => {
    if (context.theme) {
      setSystemTheme(context.theme);
    }
  }, [context.theme]);

  const onToggleButtonClick = () => {
    setSystemTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider themeConfig={context.themeConfig} systemTheme={systemTheme}>
      <Render onToggleButtonClick={onToggleButtonClick} systemTheme={systemTheme} />
    </ThemeProvider>
  );
};

export default AppWrapper;