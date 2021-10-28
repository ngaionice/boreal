import { Route, Switch } from "react-router-dom";
import { CourseScreen } from "./screens/CourseScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
// import { TimetableScreen } from "./screens/TimetableScreen";
import { LandingScreen } from "./screens/LandingScreen";
import { Box, Toolbar } from "@mui/material";
import { SearchScreen } from "./screens/SearchScreen";

const Switchboard = ({
  favorites,
  dispatchFavorites,
  currFetchedData,
  setCurrFetchedData,
  currDisplayedData,
  setCurrDisplayedData,
  // timetable,
  // dispatchTimetable,
  sv,
}) => {
  return (
    <Switch>
      <Route path="/" exact>
        <LandingScreen />
      </Route>

      <Box sx={sv}>
        <Toolbar />
        <Route path="/course">
          <CourseScreen
            currDisplayedData={currDisplayedData}
            setCurrDisplayedData={setCurrDisplayedData}
            currFetchedData={currFetchedData}
            favorites={favorites}
            // timetable={timetable}
            // dispatchTimetable={dispatchTimetable}
          />
        </Route>

        <Route path="/bookmarks">
          <FavoritesScreen
            favorites={favorites}
            dispatchFavorites={dispatchFavorites}
          />
        </Route>

        {/* <Route path="/timetable">
          <TimetableScreen
            timetable={timetable}
            dispatchTimetable={dispatchTimetable}
          />
        </Route> */}

        <Route path="/search">
          <SearchScreen
            currFetchedData={currFetchedData}
            setCurrFetchedData={setCurrFetchedData}
            setCurrDisplayedData={setCurrDisplayedData}
          />
        </Route>
      </Box>
    </Switch>
  );
};

export { Switchboard };
