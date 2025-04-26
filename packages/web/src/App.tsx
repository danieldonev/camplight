import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import { routes } from './router/routes';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 2 }}>
          <nav>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <Typography variant="button">{route.name}</Typography>
                </Link>
              ))}
            </Box>
          </nav>
        </Box>

        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
