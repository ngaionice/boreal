import React, { useState } from "react";
import { CssBaseline, Grid, MuiThemeProvider } from "@material-ui/core";
import _ from "lodash";

import { theme } from "./Theme";
import SearchPanel from "./SearchPanel";
import InfoPanel from "./InfoPanel";

const App = () => {
  const [data, setData] = useState({});

  const setCourseData = (courseData) => setData(courseData);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} md={_.isEmpty(data) ? 12 : 2}>
          <SearchPanel setData={setCourseData} />
        </Grid>
        {_.isEmpty(data) ? null : (
          <Grid item xs={12} md={10}>
            <InfoPanel courseData={data} />
          </Grid>
        )}
      </Grid>
    </MuiThemeProvider>
  );
};
export default App;
