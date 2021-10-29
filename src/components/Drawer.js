import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
} from "@mui/material";

import { Link as RouterLink, useLocation } from "react-router-dom";

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";

import { styles } from "../theme";

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

const ListEntry = ({
  label,
  icon,
  right = null,
  to = null,
  onClick = null,
}) => (
  <ListItem>
    <ListItemButton component={RouterLink} to={to} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
      {right}
    </ListItemButton>
  </ListItem>
);

const DrawerContent = ({ children, mobileClose }) => (
  <List dense>
    <ListEntry
      label="Search"
      icon={<SearchIcon />}
      to="/search"
      onClick={mobileClose}
    />

    <ListEntry
      label="Bookmarks"
      icon={<BookmarksIcon />}
      to="/bookmarks"
      onClick={mobileClose}
    />

    <ListSubheader id="search" sx={{ backgroundColor: "inherit" }}>
      Quick Search
    </ListSubheader>

    <ListItem disableGutters>
      <Box paddingLeft={2} paddingRight={2} paddingBottom={1}>
        {children}{" "}
      </Box>
    </ListItem>
  </List>
);

const Drawer = ({ children, navControl, mobile }) => {
  const location = useLocation();

  const [expandNav, setExpandNav] = navControl;

  const classes = styles();
  const drawerWidth = classes.drawerWidth;
  const { mobileSx, permanentSx } = sx(drawerWidth);

  const handleDrawerToggle = () => {
    setExpandNav(!expandNav);
  };

  if (location.pathname === "/") {
    return null;
  }

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
        <Toolbar />
        <Divider />
        <DrawerContent
          children={children}
          mobileClose={mobile ? handleDrawerToggle : null}
        />
      </MuiDrawer>
    </Box>
  );
};

export { Drawer };
