import {
  AppBar as MuiAppBar,
  CircularProgress,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import _ from "lodash";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";

import { styles } from "../theme";
import { cloneElement, useEffect, useState } from "react";
import { getCourseId } from "../utilities/misc";
import { fetchAndSetDisplayedData } from "../utilities/fetcher";

const ElevationScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const AppBar = ({
  title,
  expandNav,
  setExpandNav,
  dark,
  setDark,
  currDisplayedData,
  setCurrDisplayedData,
  favorites,
  dispatchFavorites,
  mobile,
}) => {
  const isCurrFavorite = Object.keys(favorites).includes(
    getCourseId(currDisplayedData)
  );
  const [favorite, setFavorite] = useState(isCurrFavorite);

  useEffect(() => {
    setFavorite(isCurrFavorite);
  }, [title, isCurrFavorite]);

  const handleDrawerToggle = () => {
    setExpandNav(!expandNav);
  };

  const handleFavoritesToggle = () => {
    dispatchFavorites({
      type: !favorite ? "add" : "remove",
      courseId: getCourseId(currDisplayedData),
      payload: currDisplayedData,
    });
  };

  const classes = styles();

  const BrightnessButton = () => (
    <Tooltip title={"Toggle theme"}>
      <IconButton
        color="inherit"
        aria-label="toggle theme"
        onClick={() => setDark(!dark)}
      >
        {dark ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );

  const FavoritesButton = () => {
    if (!title) return null;

    return (
      <Tooltip title={`${favorite ? "Remove from" : "Add to"} bookmarks`}>
        <IconButton color="inherit" onClick={handleFavoritesToggle}>
          {favorite ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
        </IconButton>
      </Tooltip>
    );
  };

  const RefreshButton = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      let mounted = true;
      if (loading) {
        const { session, section, code } = currDisplayedData;
        fetchAndSetDisplayedData(
          [session, section, code],
          setCurrDisplayedData
        ).then(() => {
          if (mounted) {
            setLoading(false);
          }
        });
      }
      return () => {
        mounted = false;
      };
    }, [loading]);

    const onRefresh = () => {
      setLoading(true);
    };

    if (!title || _.isEmpty(currDisplayedData)) return null;

    if (loading) {
      return (
        <IconButton color="inherit" disabled>
          <CircularProgress size={24} color="inherit" />
        </IconButton>
      );
    }

    return (
      <Tooltip title="Refresh course">
        <IconButton color="inherit" onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const DrawerButton = () => {
    if (!mobile) return null;

    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
    );
  };

  const Title = () => (
    <Typography variant="h6" sx={classes.flex}>
      {title}
    </Typography>
  );

  return (
    <ElevationScroll>
      <MuiAppBar position="fixed" sx={classes.appBar}>
        <Toolbar>
          <DrawerButton />
          <Title />
          <RefreshButton />
          <FavoritesButton />
          <BrightnessButton />
        </Toolbar>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export { AppBar };
