import {
  Box,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";

import { styles } from "./Theme";

const sx = (drawerWidth) => ({
  mobileSx: {
    display: { xs: "block", md: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
    },
  },
  permanentSx: {
    display: { xs: "none", md: "block" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
    },
  },
});

const ListEntry = ({ label, icon, right = null, to = null }) => (
  <ListItem>
    <ListItemButton component={RouterLink} to={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
      {right}
    </ListItemButton>
  </ListItem>
);

const DrawerContent = ({ children }) => (
  <List dense>
    <ListSubheader id="site-functions" sx={{ backgroundColor: "transparent" }}>
      Site functions
    </ListSubheader>

    <ListEntry label="Favourites" icon={<FavoriteIcon />} to="/favorites" />
    <ListEntry label="Timetable" icon={<CalendarTodayIcon />} to="/timetable" />
    <ListEntry label="Settings" icon={<SettingsIcon />} to="/settings" />

    <ListSubheader id="search" sx={{ backgroundColor: "transparent" }}>
      Search
    </ListSubheader>

    <ListItem>{children}</ListItem>
  </List>
);

const Drawer = ({ children, navControl, mobile }) => {
  const [expandNav, setExpandNav] = navControl;

  const classes = styles();
  const drawerWidth = classes.drawerWidth;
  const { mobileSx, permanentSx } = sx(drawerWidth);

  const handleDrawerToggle = () => {
    setExpandNav(!expandNav);
  };

  return (
    <Box sx={classes.drawer} aria-label="search">
      <MuiDrawer
        variant={mobile ? "temporary" : "permanent"}
        open={mobile ? expandNav : true}
        onClose={mobile ? handleDrawerToggle : null}
        ModalProps={{
          keepMounted: true,
        }}
        sx={mobile ? mobileSx : permanentSx}
      >
        <DrawerContent children={children} />
      </MuiDrawer>
    </Box>
  );
};

export { Drawer };
