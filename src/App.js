import React, { Fragment, useEffect, useState } from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import _ from "lodash";

import { theme, useStyles } from "./Theme";
import SearchPanel from "./SearchPanel";
import { InformationPanel } from "./InfoPanel";
import { Drawer } from "./Drawer";
import { AppBar } from "./AppBar";

const App = () => {
  const [data, setData] = useState({});
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hasData, setHasData] = useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    setHasData(!_.isEmpty(data));
  }, [data]);

  const classes = useStyles();

  const setCourseData = (courseData) => setData(courseData);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar
          title={
            hasData
              ? `${data.code}${data.section}`
              : "Select a course to view its details."
          }
          showTabs={hasData}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          index={tabIndex}
          setIndex={setTabIndex}
        />
        <Drawer
          children={<SearchPanel setData={setCourseData} />}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {hasData ? (
            <Fragment>
              <div className={classes.tabs} />
              <InformationPanel courseData={data} selectedIndex={tabIndex} />
            </Fragment>
          ) : null}
        </main>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
