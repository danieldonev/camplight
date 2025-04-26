import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

export const Loader: React.FC<CircularProgressProps> = ({ size = 40, color = 'primary' }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
      <CircularProgress size={size} color={color} />
    </Box>
  );
};
