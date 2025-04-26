import {
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useCountries } from '../hooks/useCountries';
import { Loader } from '@camplight/shared';
import { CountriesList } from '../components/CountriesList';

export const Countries = () => {
  const {
    countries,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    regions,
    hasMore,
    loadMore,
    resetPagination,
  } = useCountries();

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    resetPagination();
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    resetPagination();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Countries
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{ flex: 1 }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Region</InputLabel>

          <Select
            value={selectedRegion}
            label="Filter by Region"
            onChange={(e) => handleRegionChange(e.target.value)}
          >
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <CountriesList countries={countries} hasMore={hasMore} loadMore={loadMore} />
    </Box>
  );
};
