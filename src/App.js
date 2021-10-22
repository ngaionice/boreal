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

  // to be fixed eventually when stable
  const favoritesKey = "dfsoudfhsud";
  const timetablesKey = "asfoahfisd";

  const [favorites, setFavorites] = useState(
    loadExistingFavorites(favoritesKey)
  );
  const [timetable, setTimetable] = useState(
    loadExistingTimetable(timetablesKey)
  );

  // initial setup
  useEffect(() => {
    const monitorCrossTabState = (e) => {
      if (e.key === "darkMode") {
        setDark(e.newValue === "dark");
      } else if (e.key === favoritesKey) {
        setFavorites(JSON.parse(e.newValue));
      } else if (e.key === timetablesKey) {
        setTimetable(JSON.parse(e.newValue));
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

  const updateTimetable = (action, { session, code, section, meeting }) => {
    const { teachingMethod } = meeting;
    const newTimetable = { ...timetable };
    code = code.toUpperCase();
    section = section.toUpperCase();

    if (action === "add") {
      if (!Object.keys(timetable).includes(session)) {
        newTimetable[session] = {};
      }
      if (!Object.keys(newTimetable[session]).includes(`${code}${section}`)) {
        newTimetable[session][`${code}${section}`] = {};
      }
      newTimetable[session][`${code}${section}`][teachingMethod] = meeting;
      localStorage.setItem(timetablesKey, JSON.stringify(newTimetable));
    } else if (action === "remove") {
      if (
        !Object.keys(timetable).includes(session) ||
        !Object.keys(newTimetable[session]).includes(`${code}${section}`) ||
        !Object.keys(newTimetable[session][`${code}${section}`]).includes(
          teachingMethod
        )
      ) {
        return;
      }
      delete newTimetable[session][`${code}${section}`][teachingMethod];
      localStorage.setItem(timetablesKey, JSON.stringify(newTimetable));
    }
    setTimetable(newTimetable);
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
            timetableControl={[timetable, updateTimetable]}
            currFetchedData={currFetchedData}
            currDisplayedDataControl={[currDisplayedData, setCurrDisplayedData]}
          />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export { App };
