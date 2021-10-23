import { Route, Switch } from "react-router-dom";
import { CourseScreen } from "./screens/CourseScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { TimetableScreen } from "./screens/TimetableScreen";

const Switchboard = ({
  favorites,
  dispatchFavorites,
  currFetchedData,
  currDisplayedData,
  setCurrDisplayedData,
  timetable,
  dispatchTimetable,
}) => {
  return (
    <Switch>
      <Route path="/course">
        <CourseScreen
          currDisplayedData={currDisplayedData}
          setCurrDisplayedData={setCurrDisplayedData}
          currFetchedData={currFetchedData}
          favorites={favorites}
          timetable={timetable}
          dispatchTimetable={dispatchTimetable}
        />
      </Route>

      <Route path="/bookmarks">
        <FavoritesScreen
          favorites={favorites}
          dispatchFavorites={dispatchFavorites}
        />
      </Route>

      <Route path="/timetable">
        <TimetableScreen
          timetable={timetable}
          dispatchTimetable={dispatchTimetable}
        />
      </Route>
    </Switch>
  );
};

export { Switchboard };
