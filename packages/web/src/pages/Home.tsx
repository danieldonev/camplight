import { useState } from 'react';
import { Button } from '@camplight/shared';
import { Typography, Box } from '@mui/material';

export const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Home Page
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
        <Typography variant="body1">
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </Box>
    </Box>
  );
};
