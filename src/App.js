import { useEffect, useReducer, useState } from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import { styles, theme } from "./theme";
import { QuickSearchPanel } from "./components/QuickSearchPanel";
import { Drawer } from "./components/Drawer";
import { AppBar } from "./components/AppBar";
import { Switchboard } from "./Switchboard";
import { getPageTitle } from "./utilities/misc";
import {
  timetableReducer,
  favoritesReducer,
  favoritesKey,
  timetablesKey,
} from "./reducers";

const loadExistingFavorites = (favoritesKey) => {
  const existingFavorites = localStorage.getItem(favoritesKey);
  return existingFavorites ? JSON.parse(existingFavorites) : {};
};

const loadExistingTimetable = (timetablesKey) => {
  const existingTimetables = localStorage.getItem(timetablesKey);
  return existingTimetables ? JSON.parse(existingTimetables) : {};
};

const App = () => {
  const sv = styles();
  const themeFunction = useTheme();
  const mobile = useMediaQuery(themeFunction.breakpoints.down("md"));
  const location = useLocation();

  const [dark, setDark] = useState(localStorage.getItem("darkMode") === "dark");
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [appBarTitle, setAppBarTitle] = useState("");

  const [currDisplayedData, setCurrDisplayedData] = useState({});
  const [currFetchedData, setCurrFetchedData] = useState({});

  const [favorites, dispatchFavorites] = useReducer(
    favoritesReducer,
    loadExistingFavorites(favoritesKey)
  );

  const [timetable, dispatchTimetable] = useReducer(
    timetableReducer,
    loadExistingTimetable(timetablesKey)
  );

  // initial setup
  useEffect(() => {
    const monitorCrossTabState = (e) => {
      if (e.key === "darkMode") {
        setDark(e.newValue === "dark");
      } else if (e.key === favoritesKey) {
        dispatchFavorites({ type: "reset", payload: JSON.parse(e.newValue) });
      } else if (e.key === timetablesKey) {
        dispatchTimetable({ type: "reset", payload: JSON.parse(e.newValue) });
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
    document.title = `${
      newTitle === "Boreal" ? newTitle : newTitle + " — Boreal"
    }`;
  }, [location, currDisplayedData, mobile]);

  // theme updates
  useEffect(() => {
    localStorage.setItem("darkMode", dark ? "dark" : "light");
  }, [dark]);

  const onQuickPanelCourseSelection = () => {
    setIsNavExpanded(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(dark)}>
        <CssBaseline />
        <AppBar
          title={appBarTitle}
          expandNav={isNavExpanded}
          setExpandNav={setIsNavExpanded}
          dark={dark}
          setDark={setDark}
          currDisplayedData={currDisplayedData}
          setCurrDisplayedData={setCurrDisplayedData}
          favorites={favorites}
          dispatchFavorites={dispatchFavorites}
          mobile={mobile}
        />
        <Drawer mobile={mobile} navControl={[isNavExpanded, setIsNavExpanded]}>
          <QuickSearchPanel
            fetchedData={currFetchedData}
            setFetchedData={setCurrFetchedData}
            onCourseSelection={onQuickPanelCourseSelection}
          />
        </Drawer>

        <Switchboard
          favorites={favorites}
          dispatchFavorites={dispatchFavorites}
          timetable={timetable}
          dispatchTimetable={dispatchTimetable}
          currFetchedData={currFetchedData}
          setCurrFetchedData={setCurrFetchedData}
          currDisplayedData={currDisplayedData}
          setCurrDisplayedData={setCurrDisplayedData}
          sv={mobile ? sv.contentMobileWrapper : sv.contentWrapper}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export { App };
