import { styles } from "../theme";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  const classes = styles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={classes.loader}
    >
      <CircularProgress />
    </Box>
  );
};

export { Loader };
