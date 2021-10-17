import { Route, Switch } from "react-router-dom";
import { CourseScreen } from "./screens/CourseScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";

const Switchboard = ({ favorites, currCourseData }) => {
  return (
    <Switch>
      <Route path="/course">
        <CourseScreen data={currCourseData} />
      </Route>

      <Route path="/favorites">
        <FavoritesScreen favorites={favorites} />
      </Route>
    </Switch>
  );
};

export { Switchboard };
