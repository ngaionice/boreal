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

const Title = () => {
  return <Typography variant="h4">Saved Courses</Typography>;
};

const FavoritesList = ({ data }) => {
  const ListEntry = ({ entry }) => {
    const { courseTitle, code, section } = entry;
    return (
      <ListItem disableGutters>
        <ListItemButton>
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
      {Object.entries(data)
        .sort((a, b) => (a < b ? -1 : 1))
        .map(([k, v]) => (
          <ListEntry entry={v} key={k} />
        ))}
    </List>
  );
};

const FavoritesScreen = ({ favorites }) => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={3} divider={<Divider />}>
        <Title />
        <FavoritesList data={favorites} />
      </Stack>
    </Container>
  );
};

export { FavoritesScreen };
