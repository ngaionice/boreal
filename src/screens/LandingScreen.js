import { Button, Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LandingScreen = () => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
      >
        <Grid item paddingBottom={2} marginRight="-40px">
          {/* keep value of marginRight and letterSpacing equal; old CSS bug that is still not fixed in 2021 */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 100,
              letterSpacing: "40px",
              fontFamily: "Roboto",
            }}
          >
            {"Boreal".toUpperCase()}
          </Typography>
        </Grid>

        <Grid item paddingBottom={2}>
          <Typography variant="body1" sx={{ fontFamily: "Quicksand" }}>
            Course finder for UofT Arts & Science, reimagined.
          </Typography>
        </Grid>

        <Grid item>
          <Button variant="outlined" component={RouterLink} to="/search">
            Search Courses
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export { LandingScreen };
