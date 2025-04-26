import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Country } from '../types/country';

interface CountryDetailsModalProps {
  country: Country;
}

export const CountryDetailsModal = ({ country }: CountryDetailsModalProps) => {
  const languages = Object.values(country.languages || {}).join(', ');
  const currencies = Object.values(country.currencies || {})
    .map((currency) => `${currency.name} (${currency.symbol || 'N/A'})`)
    .join(', ');

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
      <Box sx={{ flex: 1 }}>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {country.name.official}
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="Capital" secondary={country.capital?.[0] || 'N/A'} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Population" secondary={country.population.toLocaleString()} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Region" secondary={country.region} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Subregion" secondary={country.subregion || 'N/A'} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Languages" secondary={languages || 'N/A'} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Currencies" secondary={currencies || 'N/A'} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
