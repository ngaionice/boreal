import React, { useEffect, useRef, useState } from "react";
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
  const [dark, setDark] = React.useState(false);

  const [expandNav, setExpandNav] = React.useState(false);
  const mobile = useMediaQuery(themeFunction.breakpoints.down("md"));

  const [data, setData] = useState({});
  const [hasData, setHasData] = useState(false);
  // const favorites = useRef([]);
  //
  // const getId = () => {
  //   if (_.isEmpty(data)) {
  //     return null;
  //   }
  //   return `${data.session}-${data.code}-${data.section}`;
  // };
  //
  // const setFavorites = (data) => {
  //   favorites.current = data;
  //   localStorage.setItem("favorites", JSON.stringify(favorites));
  //   console.log(favorites.current);
  // };
  //
  // const isFavorite = (id) => _.includes(favorites.current, id);
  //
  // const updateFavorites = () => {
  //   if (_.isEmpty(data)) {
  //     return;
  //   }
  //   const id = `${data.session}-${data.code}-${data.section}`;
  //   if (_.includes(favorites.current, id)) {
  //     _.remove(favorites.current, (e) => e === id);
  //   } else {
  //     setFavorites([...favorites.current, id]);
  //   }
  //   console.log(favorites.current);
  // };

  useEffect(() => {
    setHasData(!_.isEmpty(data));
  }, [data]);

  // initial setup
  useEffect(() => {
    const existingPreference = localStorage.getItem("darkMode");
    if (existingPreference) {
      setDark(existingPreference === "dark");
    } else {
      localStorage.setItem("darkMode", "light");
    }

    // const existingFavorites = localStorage.getItem("favorites");
    // if (existingFavorites) {
    //   setFavorites(JSON.parse(existingFavorites));
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", dark ? "dark" : "light");
  }, [dark]);

  const setCourseData = (data) => {
    setData(data);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(dark)}>
        <CssBaseline />
        <AppBar
          title={hasData ? `${data.code}${data.section}` : "Boreal"}
          navControl={[expandNav, setExpandNav]}
          themeControl={[dark, setDark]}
          // favoriteControl={[isFavorite(getId()), updateFavorites]}
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
