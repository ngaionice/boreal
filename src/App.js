import { useEffect, useReducer, useState } from "react";
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

// to be fixed eventually when stable
const favoritesKey = "dfsoudfhsud";
const timetablesKey = "asfoahfisd";

const timetableReducer = (state, action) => {
  if (action.type === "reset") {
    localStorage.setItem(timetablesKey, JSON.stringify(action.payload));
    return action.payload;
  }

  let { session, code, section, meeting } = action.payload;
  const { teachingMethod } = meeting;
  let updatedTimetable = { ...state };
  code = code.toUpperCase();
  section = section.toUpperCase();

  switch (action.type) {
    case "add":
      if (!Object.keys(updatedTimetable).includes(session)) {
        updatedTimetable[session] = {};
      }
      if (
        !Object.keys(updatedTimetable[session]).includes(`${code}${section}`)
      ) {
        updatedTimetable[session][`${code}${section}`] = {};
      }
      updatedTimetable[session][`${code}${section}`][teachingMethod] = meeting;
      break;
    case "remove":
      if (
        Object.keys(updatedTimetable).includes(session) &&
        Object.keys(updatedTimetable[session]).includes(`${code}${section}`) &&
        Object.keys(updatedTimetable[session][`${code}${section}`]).includes(
          teachingMethod
        )
      ) {
        delete updatedTimetable[session][`${code}${section}`][teachingMethod];
      }
      break;
    default:
      throw new Error(
        `Called timetableReducer with unknown action type ${action.type}`
      );
  }
  localStorage.setItem(timetablesKey, JSON.stringify(updatedTimetable));
  return updatedTimetable;
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

  const getId = () => {
    if (_.isEmpty(currDisplayedData)) return null;
    return `${currDisplayedData.code}-${currDisplayedData.section}-${currDisplayedData.session}`;
  };

  const favoriteReducer = (state, action) => {
    const courseId = getId();
    if (!courseId && action.type !== "reset") {
      throw new Error("Called favoriteReducer while course ID is invalid.");
    }
    let updatedState;
    switch (action.type) {
      case "add":
        updatedState = {
          ...state,
          [courseId]: currDisplayedData,
        };
        break;
      case "remove":
        updatedState = _.omit(
          state,
          action.payload ? action.payload : courseId
        );
        break;
      case "reset":
        updatedState = action.payload;
        break;
      default:
        throw new Error(
          `Called favoriteReducer with invalid action.type: ${action.type}`
        );
    }
    localStorage.setItem(favoritesKey, JSON.stringify(updatedState));
    return updatedState;
  };

  const [favorites, dispatchFavorites] = useReducer(
    favoriteReducer,
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
    document.title = `Boreal${newTitle === "Boreal" ? "" : " — " + newTitle}`;
  }, [location, currDisplayedData, mobile]);

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
          navControl={[isNavExpanded, setIsNavExpanded]}
          themeControl={[dark, setDark]}
          isCurrFavorite={Object.keys(favorites).includes(getId())}
          dispatchFavorites={dispatchFavorites}
          mobile={mobile}
        />
        <Drawer mobile={mobile} navControl={[isNavExpanded, setIsNavExpanded]}>
          <QuickSearchPanel
            fetchedData={currFetchedData}
            setFetchedData={setCurrFetchedData}
            fetchedDataControl={[currFetchedData, setCurrFetchedData]}
            onCourseSelection={onQuickPanelCourseSelection}
            onButtonClick={() => setIsNavExpanded(!isNavExpanded)}
          />
        </Drawer>
        <Toolbar />
        <Box sx={mobile ? sv.contentMobileWrapper : sv.contentWrapper}>
          <Switchboard
            favorites={favorites}
            dispatchFavorites={dispatchFavorites}
            timetable={timetable}
            dispatchTimetable={dispatchTimetable}
            currFetchedData={currFetchedData}
            currDisplayedData={currDisplayedData}
            setCurrDisplayedData={setCurrDisplayedData}
          />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export { App };
