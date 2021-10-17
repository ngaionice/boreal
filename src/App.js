import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import _ from "lodash";

import { styles, theme } from "./theme";
import { BasicSearch } from "./components/BasicSearch";
import { Drawer } from "./components/Drawer";
import { AppBar } from "./components/AppBar";
import { Switchboard } from "./Switchboard";

const App = () => {
  const sv = styles();
  const themeFunction = useTheme();
  const [dark, setDark] = React.useState(
    localStorage.getItem("darkMode") === "dark"
  );

  const [expandNav, setExpandNav] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const mobile = useMediaQuery(themeFunction.breakpoints.down("md"));
  const location = useLocation();

  const favoritesKey = "sfoishdfoa";

  const loadExistingFavorites = () => {
    const existingFavorites = localStorage.getItem(favoritesKey);
    return existingFavorites ? JSON.parse(existingFavorites) : {};
  };

  const [data, setData] = useState({});
  const [favorites, setFavorites] = useState(loadExistingFavorites());

  // initial setup
  useEffect(() => {
    const existingFavorites = localStorage.getItem(favoritesKey);
    if (existingFavorites) {
      setFavorites(JSON.parse(existingFavorites));
    }

    const monitorCrossTabState = (e) => {
      if (e.key === "darkMode") {
        setDark(e.newValue === "dark");
      } else if (e.key === favoritesKey) {
        setFavorites(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", monitorCrossTabState);
    return () => {
      window.removeEventListener("storage", monitorCrossTabState);
    };
  }, []);

  // location updates
  useEffect(() => {
    let newTitle;
    switch (location.pathname) {
      case "/favorites":
        newTitle = "Favorites";
        break;
      case "/timetable":
        newTitle = "Timetable";
        break;
      case "/settings":
        newTitle = "Settings";
        break;
      case "/course":
        newTitle = !_.isEmpty(data) ? `${data.code}${data.section}` : "Course";
        break;
      default:
        newTitle = "Boreal";
    }
    if (location.pathname.startsWith("/course")) {
      setTitle(newTitle);
    } else {
      setTitle("");
    }
    document.title = newTitle;
  }, [location, data]);

  useEffect(() => {
    localStorage.setItem("darkMode", dark ? "dark" : "light");
  }, [dark]);

  const setCourseData = (data) => setData(data);

  const getId = () => {
    if (_.isEmpty(data)) {
      return null;
    }
    return `${data.session}-${data.code}-${data.section}`;
  };

  const updateFavorite = (action) => {
    if (_.isEmpty(data)) return;

    const courseId = `${data.session}-${data.code}-${data.section}`;
    let updated;
    setFavorites((state) => {
      switch (action) {
        case "add":
          updated = {
            ...state,
            [courseId]: data,
          };
          break;
        case "remove":
          updated = _.omit(state, courseId);
          break;
        default:
          return state;
      }
      localStorage.setItem(favoritesKey, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(dark)}>
        <CssBaseline />
        <AppBar
          title={title}
          navControl={[expandNav, setExpandNav]}
          themeControl={[dark, setDark]}
          favoriteControl={[
            Object.keys(favorites).includes(getId()),
            updateFavorite,
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
          <Switchboard favorites={favorites} currCourseData={data} />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
