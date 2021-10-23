import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

const theme = (useDark) => {
  return responsiveFontSizes(
    createTheme({
      palette: {
        mode: useDark ? "dark" : "light",
        primary: {
          main: blue[800],
        },
        secondary: {
          main: grey[50],
        },
        error: {
          main: red[500],
        },
      },
      typography: {
        fontFamily: ["Roboto", "Quicksand"].join(","),
      },
      components: {
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              h4: "h1",
              h5: "h2",
              h6: "h3",
            },
          },
          styleOverrides: {
            h3: {
              fontFamily: "Quicksand",
              fontWeight: 300,
            },
            h4: {
              fontFamily: "Quicksand",
              fontWeight: 300,
            },
            h5: {
              fontFamily: "Quicksand",
              fontWeight: 400,
            },
            h6: {
              fontFamily: "Quicksand",
              fontWeight: 400,
            },
          },
        },
      },
    })
  );
};

const styles = () => {
  const drawerWidth = 360;

  return {
    flex: {
      flex: 1,
    },
    paginator: {
      justifyContent: "center",
      padding: "4px",
    },
    drawerWidth: drawerWidth,
    drawer: { width: { md: drawerWidth }, flexShrink: { md: 0 } },
    appBar: {
      width: { md: `calc(100% - ${drawerWidth}px)` },
      ml: { md: `${drawerWidth}px` },
    },
    menuButton: {
      marginRight: 2,
      display: {
        md: "none",
      },
    },
    content: {
      flexGrow: 1,
      padding: 3,
    },
    contentWrapper: {
      flexGrow: 1,
      paddingLeft: 3,
      paddingRight: 3,
      paddingTop: 5,
      paddingBottom: 5,
      marginLeft: `${drawerWidth}px`,
    },
    contentMobileWrapper: {
      flexGrow: 1,
      paddingLeft: 3,
      paddingRight: 3,
      paddingTop: 5,
      paddingBottom: 5,
    },
    loader: {
      padding: 2,
    },
  };
};

export { theme, styles };
