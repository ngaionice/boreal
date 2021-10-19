import { Route, Switch } from "react-router-dom";
import { CourseScreen } from "./screens/CourseScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";

const Switchboard = ({
  favoritesControl,
  currFetchedData,
  currDisplayedDataControl,
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

      <Route path="/favorites">
        <FavoritesScreen favoritesControl={favoritesControl} />
      </Route>
    </Switch>
  );
};

export { Switchboard };
