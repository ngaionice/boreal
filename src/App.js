import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import _ from "lodash";

import { styles, theme } from "./theme";
import { BasicSearch } from "./components/BasicSearch";
import { Drawer } from "./components/Drawer";
import { AppBar } from "./components/AppBar";
import { Switchboard } from "./Switchboard";

const App = () => {
  const sv = styles();
  const themeFunction = useTheme();
  const [dark, setDark] = React.useState(false);

  const [expandNav, setExpandNav] = React.useState(false);
  const mobile = useMediaQuery(themeFunction.breakpoints.down("md"));

  const [data, setData] = useState({});
  const [dataTimestamp, setDataTimestamp] = useState(null); // this may seem duplicated with Search's, but is not. if user does not click on new search results, existing data's timestamp should be the same
  const favorites = useRef({});

  const favoritesKey = "sfoishdfoa";

  // initial setup
  useEffect(() => {
    const existingPreference = localStorage.getItem("darkMode");
    if (existingPreference) {
      setDark(existingPreference === "dark");
    } else {
      localStorage.setItem("darkMode", "light");
    }

    const existingFavorites = localStorage.getItem(favoritesKey);
    if (existingFavorites) {
      favorites.current = JSON.parse(existingFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", dark ? "dark" : "light");
  }, [dark]);

  const setCourseData = (data, timestamp) => {
    setData(data);
    setDataTimestamp(timestamp);
  };

  const getId = () => {
    if (_.isEmpty(data)) {
      return null;
    }
    return `${data.session}-${data.code}-${data.section}`;
  };

  const addFavorite = () => {
    const courseId = getId();
    if (!courseId) return;

    favorites.current = {
      ...favorites.current,
      [courseId]: dataTimestamp,
    };
    // call function save to local storage here
    localStorage.setItem(favoritesKey, JSON.stringify(favorites.current));
    console.log(
      `added favorite: ${courseId} with timestamp ${dataTimestamp}, now has size ${_.size(
        favorites.current
      )}`
    );
    console.log(favorites.current);
  };

  const deleteFavorite = () => {
    const courseId = getId();
    if (!courseId) return;

    delete favorites.current[courseId];
    localStorage.setItem(favoritesKey, JSON.stringify(favorites.current));
    console.log(
      `removed favorite: ${courseId}, now has size ${_.size(favorites.current)}`
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(dark)}>
        <CssBaseline />
        <AppBar
          title={!_.isEmpty(data) ? `${data.code}${data.section}` : "Boreal"}
          navControl={[expandNav, setExpandNav]}
          themeControl={[dark, setDark]}
          favoriteControl={[
            Object.keys(favorites.current).includes(getId()),
            addFavorite,
            deleteFavorite,
          ]}
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
          <Switchboard favorites={favorites.current} currCourseData={data} />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
