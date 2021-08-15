import { createTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import { makeStyles, responsiveFontSizes } from "@material-ui/core";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: orange[500],
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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80vw",
    },
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
  selectionBox: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export { theme, useStyles };
