import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
  useMediaQuery,
  useTheme,
  Toolbar,
} from "@mui/material";
import _ from "lodash";

import { theme, styles } from "./theme";
import { BasicSearch } from "./components/BasicSearch";
import { Drawer } from "./components/Drawer";
import { AppBar } from "./components/AppBar";
import { CourseScreen } from "./screens/CourseScreen";

const App = () => {
  const sv = styles();
  const themeFunction = useTheme();
  const [dark, setDark] = React.useState(true);

  const [expandNav, setExpandNav] = React.useState(false);
  const mobile = useMediaQuery(themeFunction.breakpoints.down("md"));

  const [data, setData] = useState({});
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    setHasData(!_.isEmpty(data));
  }, [data]);

  // theming
  useEffect(() => {
    const existingPreference = localStorage.getItem("darkMode");
    if (existingPreference) {
      setDark(existingPreference === "dark");
    } else {
      setDark(false);
      localStorage.setItem("dark", "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", dark ? "dark" : "light");
  }, [dark]);

  const setCourseData = (courseData) => setData(courseData);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(dark)}>
        <CssBaseline />
        <AppBar
          title={hasData ? `${data.code}${data.section}` : "Boreal"}
          navControl={[expandNav, setExpandNav]}
          themeControl={[dark, setDark]}
          mobile={mobile}
        />
        <Drawer mobile={mobile} navControl={[expandNav, setExpandNav]}>
          <BasicSearch
            setData={setCourseData}
            onCourseSelectionAction={setExpandNav}
            onButtonClick={() => setExpandNav(!expandNav)}
          />
        </Drawer>
        <Toolbar />
        <Box sx={mobile ? sv.contentMobileWrapper : sv.contentWrapper}>
          <CourseScreen data={data} />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
