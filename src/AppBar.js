import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { styles } from "./Theme";

const AppBar = ({ title, navControl, themeControl, mobile }) => {
  const [dark, setDark] = themeControl;
  const [expandNav, setExpandNav] = navControl;

  const handleDrawerToggle = () => {
    setExpandNav(!expandNav);
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
        <BrightnessControl />
      </Toolbar>
    </MuiAppBar>
  );
};

export { AppBar };
