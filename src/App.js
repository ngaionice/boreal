import React, { Fragment, useState } from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import _ from "lodash";

import { theme, useStyles } from "./Theme";
import SearchPanel from "./SearchPanel";
import InfoPanel from "./InfoPanel";
import { Drawer } from "./Drawer";
import { AppBar } from "./AppBar";

const App = () => {
  const [data, setData] = useState({});
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const classes = useStyles();

  const setCourseData = (courseData) => setData(courseData);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar
          title={
            !_.isEmpty(data)
              ? `${data.code}
                ${data.section} — ${data.courseTitle}`
              : "Select a course to see its details."
          }
          showTabs={!_.isEmpty(data)}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <Drawer
          children={<SearchPanel setData={setCourseData} />}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {_.isEmpty(data) ? null : (
            <Fragment>
              <div className={classes.tabs} />
              <InfoPanel courseData={data} />
            </Fragment>
          )}
        </main>
      </div>
    </MuiThemeProvider>
  );
};
export default App;
