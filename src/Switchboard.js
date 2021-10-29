import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";

import { CourseScreen } from "./screens/CourseScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { LandingScreen } from "./screens/LandingScreen";
import { defaultSearchState, SearchScreen } from "./screens/SearchScreen";

const Switchboard = ({
  favorites,
  dispatchFavorites,
  currFetchedData,
  currDisplayedData,
  setCurrDisplayedData,
  sv,
}) => {
  const [searchFields, setSearchFields] = useState(defaultSearchState);
  const [searchResults, setSearchResults] = useState({});

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
            dispatchFavorites={dispatchFavorites}
          />
        </Route>

        <Route path="/bookmarks">
          <FavoritesScreen
            favorites={favorites}
            dispatchFavorites={dispatchFavorites}
          />
        </Route>

        <Route path="/search">
          <SearchScreen
            currFetchedData={searchResults}
            setCurrFetchedData={setSearchResults}
            setCurrDisplayedData={setCurrDisplayedData}
            searchFields={searchFields}
            setSearchFields={setSearchFields}
          />
        </Route>
      </Box>
    </Switch>
  );
};

export { Switchboard };
