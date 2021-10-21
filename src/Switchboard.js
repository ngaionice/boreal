import { Route, Switch } from "react-router-dom";
import { CourseScreen } from "./screens/CourseScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { TimetableScreen } from "./screens/TimetableScreen";

const Switchboard = ({
  favoritesControl,
  currFetchedData,
  currDisplayedDataControl,
  timetablesControl,
}) => {
  const [favorites] = favoritesControl;
  return (
    <Switch>
      <Route path="/course">
        <CourseScreen
          currDisplayedDataControl={currDisplayedDataControl}
          currFetchedData={currFetchedData}
          favorites={favorites}
        />
      </Route>

      <Route path="/bookmarks">
        <FavoritesScreen favoritesControl={favoritesControl} />
      </Route>

      <Route path="/timetable">
        <TimetableScreen timetablesControl={timetablesControl} />
      </Route>
    </Switch>
  );
};

export { Switchboard };
