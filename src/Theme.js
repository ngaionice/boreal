import { createTheme } from "@material-ui/core/styles";
import { makeStyles, responsiveFontSizes } from "@material-ui/core";
import { blue, grey, red } from "@material-ui/core/colors";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: blue[900],
      },
      secondary: {
        main: grey[50],
      },
      error: {
        main: red[500],
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

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
    },
    paginator: {
      justifyContent: "center",
      padding: "10px",
    },
    searchBox: {
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      "& > *": {
        marginTop: theme.spacing(1),
      },
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
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
    loader: {
      margin: theme.spacing(3),
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    gridItem: {
      height: "100%",
    },
  }),
  { index: 1 }
);

// the {index: 1} is needed for production builds, as webpack messes with JSS precedence rules.
// see https://stackoverflow.com/questions/62473898/material-ui-rendering-bugs-in-production-build

export { theme, useStyles };
