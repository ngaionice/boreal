import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import { useStyles } from "./Theme";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AppBar2 = ({
  title,
  showTabs,
  mobileOpen,
  setMobileOpen,
  index,
  setIndex,
}) => {
  const handleTabChange = (event, newValue) => {
    setIndex(newValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
      {showTabs ? (
        <Tabs
          value={index}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="course information"
        >
          <Tab label="Course Info" {...a11yProps(0)} />
          <Tab label="Meeting Sections" {...a11yProps(1)} />
        </Tabs>
      ) : null}
    </AppBar>
  );
};

export { AppBar2 as AppBar };
