import { useEffect, useState } from "react";
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
import { QuickSearchPanel } from "./components/QuickSearchPanel";
import { Drawer } from "./components/Drawer";
import { AppBar } from "./components/AppBar";
import { Switchboard } from "./Switchboard";
import { getPageTitle } from "./utilities/misc";

const App = () => {
  const sv = styles();
  const themeFunction = useTheme();
  const mobile = useMediaQuery(themeFunction.breakpoints.down("md"));
  const location = useLocation();

  const [dark, setDark] = useState(localStorage.getItem("darkMode") === "dark");
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [appBarTitle, setAppBarTitle] = useState("");

  const favoritesKey = "dfsoudfhsud"; // to be fixed eventually when stable

  const loadExistingFavorites = () => {
    const existingFavorites = localStorage.getItem(favoritesKey);
    return existingFavorites ? JSON.parse(existingFavorites) : {};
  };

  const [currFetchedData, setCurrFetchedData] = useState({});
  const [favorites, setFavorites] = useState(loadExistingFavorites());

  const [currDisplayedData, setCurrDisplayedData] = useState({});

  // initial setup
  useEffect(() => {
    // cache();

    const existingFavorites = localStorage.getItem(favoritesKey);
    if (existingFavorites) setFavorites(JSON.parse(existingFavorites));

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
    const { pathname } = location;
    const newTitle = getPageTitle(pathname, currDisplayedData, mobile);

    setAppBarTitle(location.pathname.startsWith("/course") ? newTitle : "");
    document.title = `Boreal${newTitle === "Boreal" ? "" : " — " + newTitle}`;
  }, [location, currDisplayedData, mobile]);

  useEffect(() => {
    localStorage.setItem("darkMode", dark ? "dark" : "light");
  }, [dark]);

  const getId = () => {
    if (_.isEmpty(currDisplayedData)) return null;
    return `${currDisplayedData.code}-${currDisplayedData.section}-${currDisplayedData.session}`;
  };

  const updateFavorite = (action, courseId = getId()) => {
    if (!courseId) return;

    setFavorites((state) => {
      if (action !== "add" && action !== "remove") return state;
      const updated =
        action === "remove"
          ? _.omit(state, courseId)
          : {
              ...state,
              [courseId]: currDisplayedData,
            };
      localStorage.setItem(favoritesKey, JSON.stringify(updated));
      return updated;
    });
  };

  const onQuickPanelCourseSelection = () => {
    setIsNavExpanded(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(dark)}>
        <CssBaseline />
        <AppBar
          title={appBarTitle}
          navControl={[isNavExpanded, setIsNavExpanded]}
          themeControl={[dark, setDark]}
          favoriteControl={[
            Object.keys(favorites).includes(getId()),
            updateFavorite,
          ]}
          mobile={mobile}
        />
        <Drawer mobile={mobile} navControl={[isNavExpanded, setIsNavExpanded]}>
          <QuickSearchPanel
            fetchedDataControl={[currFetchedData, setCurrFetchedData]}
            onCourseSelection={onQuickPanelCourseSelection}
            onButtonClick={() => setIsNavExpanded(!isNavExpanded)}
          />
        </Drawer>
        <Toolbar />
        <Box sx={mobile ? sv.contentMobileWrapper : sv.contentWrapper}>
          <Switchboard
            favoritesControl={[favorites, updateFavorite]}
            currFetchedData={currFetchedData}
            currDisplayedDataControl={[currDisplayedData, setCurrDisplayedData]}
          />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export { App };
