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
  const mobile = useMediaQuery(themeFunction.breakpoints.down("md"));

  const [data, setData] = useState({});
  const [dataTimestamp, setDataTimestamp] = useState(null); // this may seem duplicated with Search's, but is not. if user does not click on new search results, existing data's timestamp should be the same
  const [favorites, setFavorites] = useState({});

  const favoritesKey = "sfoishdfoa";

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

    setFavorites((state) => {
      const updated = {
        ...state,
        [courseId]: dataTimestamp,
      };
      localStorage.setItem(favoritesKey, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteFavorite = () => {
    const courseId = getId();
    if (!courseId) return;

    setFavorites((state) => {
      const updated = _.omit(state, courseId);
      localStorage.setItem(favoritesKey, JSON.stringify(updated));
      return updated;
    });
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
            Object.keys(favorites).includes(getId()),
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
          <Switchboard favorites={favorites} currCourseData={data} />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
