import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import _ from "lodash";

import { theme, styles } from "./Theme";
import { SearchPanel } from "./SearchPanel";
import { Drawer } from "./Drawer";
import { AppBar } from "./AppBar";

const App = () => {
  const themeFunction = useTheme();

  const [data, setData] = useState({});
  const [expandNav, setExpandNav] = React.useState(false);
  const [dark, setDark] = React.useState(true);
  const [hasData, setHasData] = useState(false);
  const mobile = useMediaQuery(themeFunction.breakpoints.down("md"));

  useEffect(() => {
    setHasData(!_.isEmpty(data));
  }, [data]);

  useEffect(() => {
    const existingPreference = localStorage.getItem("useDark");
    if (existingPreference) {
      existingPreference === "dark" ? setDark(true) : setDark(false);
    } else {
      setDark(false);
      localStorage.setItem("useDark", "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", dark ? "dark" : "light");
  }, [dark]);

  const classes = styles();

  const setCourseData = (courseData) => setData(courseData);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(dark)}>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            title={hasData ? `${data.code}${data.section}` : "Boreal"}
            navControl={[expandNav, setExpandNav]}
            themeControl={[dark, setDark]}
            mobile={mobile}
          />
          <Drawer mobile={mobile} navControl={[expandNav, setExpandNav]}>
            <SearchPanel
              setData={setCourseData}
              onCourseSelectionAction={setExpandNav}
            />
          </Drawer>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
