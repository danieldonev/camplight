import { Typography, Box } from '@mui/material';

export const About = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        About Page
      </Typography>
      <Typography variant="body1">This is the about page of our application.</Typography>
    </Box>
  );
};
