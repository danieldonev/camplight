import { useGetCountriesQuery } from '../api/countriesApi';
import { useMemo, useState, useCallback, useEffect } from 'react';

export type Region = 'All' | string;
const ITEMS_PER_PAGE = 20;

export const useCountries = () => {
  const allRegionsDropdownValue = 'All regions';

  const { data: countries, isLoading } = useGetCountriesQuery();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>(allRegionsDropdownValue);

  const regions = useMemo(() => {
    if (!countries) return [allRegionsDropdownValue];
    const uniqueRegions = new Set(countries.map((country) => country.region));
    return [allRegionsDropdownValue, ...Array.from(uniqueRegions).sort()];
  }, [countries]);

  const filteredCountries = useMemo(() => {
    if (!countries) return [];

    return countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion =
        selectedRegion === allRegionsDropdownValue || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchTerm, selectedRegion]);

  const paginatedCountries = useMemo(() => {
    return filteredCountries.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredCountries, page]);

  useEffect(() => {
    setHasMore(paginatedCountries.length < filteredCountries.length);
  }, [paginatedCountries.length, filteredCountries.length]);

  const loadMore = useCallback(() => {
    if (paginatedCountries.length < filteredCountries.length) {
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
  }, [paginatedCountries.length, filteredCountries.length]);

  const resetPagination = useCallback(() => {
    setPage(1);
    setHasMore(false);
  }, []);

  return {
    countries: paginatedCountries,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    regions,
    hasMore,
    loadMore,
    resetPagination,
  };
};
