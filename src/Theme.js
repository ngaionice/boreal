import { createTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import { makeStyles, responsiveFontSizes } from "@material-ui/core";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: "#000",
      },
    },
    props: {
      MuiTypography: {
        variantMapping: {
          h4: "h1",
          h5: "h2",
          h6: "h3",
        },
      },
    },
  })
);

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
  selectionBox: {
    "& > *": {
      margin: theme.spacing(1),
      width: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  tabs: {
    height: "48px",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export { theme, useStyles };
