import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { styles } from "../theme";
import { useEffect, useState } from "react";

const AppBar = ({
  title,
  navControl,
  themeControl,
  favoriteControl,
  mobile,
}) => {
  const [dark, setDark] = themeControl;
  const [expandNav, setExpandNav] = navControl;
  const [isCurrFavorite, addToFavorites, removeFromFavorites] = favoriteControl;
  const [favorite, setFavorite] = useState(isCurrFavorite);

  useEffect(() => {
    setFavorite(isCurrFavorite);
  }, [title, isCurrFavorite]);

  const handleDrawerToggle = () => {
    setExpandNav(!expandNav);
  };

  const handleFavoritesToggle = () => {
    if (!favorite) {
      addToFavorites();
    } else {
      removeFromFavorites();
    }
    setFavorite(!favorite);
  };

  const classes = styles();

  const BrightnessControl = () => (
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

  const CourseControl = () => (
    <Tooltip title={`${favorite ? "Remove from" : "Add to"} favorites`}>
      <IconButton color="inherit" onClick={handleFavoritesToggle}>
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );

  const DrawerControl = () => {
    if (!mobile) {
      return null;
    }

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
    <MuiAppBar position="fixed" sx={classes.appBar}>
      <Toolbar>
        <DrawerControl />
        <Title />
        <CourseControl />
        <BrightnessControl />
      </Toolbar>
    </MuiAppBar>
  );
};

export { AppBar };
