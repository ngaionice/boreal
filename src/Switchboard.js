import { Route, Switch } from "react-router-dom";
import { CourseScreen } from "./screens/CourseScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";

const Switchboard = ({
  favorites,
  currFetchedData,
  currDisplayedDataControl,
}) => {
  const [setCurrDisplayedData] = currDisplayedDataControl;
  return (
    <Switch>
      <Route path="/course">
        <CourseScreen
          currDisplayedDataControl={currDisplayedDataControl}
          currFetchedData={currFetchedData}
        />
      </Route>

      <Route path="/favorites">
        <FavoritesScreen
          favorites={favorites}
          setCurrData={setCurrDisplayedData}
        />
      </Route>
    </Switch>
  );
};

export { Switchboard };
