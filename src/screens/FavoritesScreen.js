import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

const Title = () => {
  return <Typography variant="h4">Saved Courses</Typography>;
};

const FavoritesList = ({ favorites, setCurrData }) => {
  const ListEntry = ({ entry }) => {
    const { courseTitle, code, section, session } = entry;
    return (
      <ListItem disableGutters>
        <ListItemButton
          component={RouterLink}
          onClick={() => setCurrData(entry)}
          to={`/course/${session}/${section.toLowerCase()}/${code.toLowerCase()}`}
        >
          <ListItemText
            primary={`${courseTitle}`}
            secondary={`${code}${section}`}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <List dense>
      {Object.entries(favorites)
        .sort((a, b) => (a < b ? -1 : 1))
        .map(([k, v]) => (
          <ListEntry entry={v} key={k} />
        ))}
    </List>
  );
};

const FavoritesScreen = ({ favorites, setCurrData }) => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={3} divider={<Divider />}>
        <Title />
        <FavoritesList favorites={favorites} setCurrData={setCurrData} />
      </Stack>
    </Container>
  );
};

export { FavoritesScreen };
