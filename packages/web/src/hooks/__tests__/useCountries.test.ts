import { renderHook, act } from '@testing-library/react';
import { useCountries } from '../useCountries';
import { useGetCountriesQuery } from '../../api/countriesApi';

// Mock the countries API hook
jest.mock('../../api/countriesApi', () => ({
  useGetCountriesQuery: jest.fn(),
}));

const mockCountries = [
  {
    cca2: 'US',
    name: { common: 'United States', official: 'United States of America' },
    region: 'Americas',
  },
  {
    cca2: 'CA',
    name: { common: 'Canada', official: 'Canada' },
    region: 'Americas',
  },
  {
    cca2: 'GB',
    name: {
      common: 'United Kingdom',
      official: 'United Kingdom of Great Britain and Northern Ireland',
    },
    region: 'Europe',
  },
  {
    cca2: 'FR',
    name: { common: 'France', official: 'French Republic' },
    region: 'Europe',
  },
  {
    cca2: 'JP',
    name: { common: 'Japan', official: 'Japan' },
    region: 'Asia',
  },
];

describe('useCountries', () => {
  beforeEach(() => {
    (useGetCountriesQuery as jest.Mock).mockReturnValue({
      data: mockCountries,
      isLoading: false,
    });
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useCountries());

    expect(result.current.countries).toHaveLength(5); // All mock countries
    expect(result.current.searchTerm).toBe('');
    expect(result.current.selectedRegion).toBe('All regions');
    expect(result.current.regions).toEqual(['All regions', 'Americas', 'Asia', 'Europe']);
    expect(result.current.hasMore).toBe(false); // No more items to load
  });

  it('should filter countries by search term', () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.setSearchTerm('united');
    });

    expect(result.current.countries).toHaveLength(2);
    expect(result.current.countries[0].cca2).toBe('US');
    expect(result.current.countries[1].cca2).toBe('GB');
  });

  it('should filter countries by region', () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.setSelectedRegion('Europe');
    });

    expect(result.current.countries).toHaveLength(2);
    expect(result.current.countries[0].cca2).toBe('GB');
    expect(result.current.countries[1].cca2).toBe('FR');
  });

  it('should combine search and region filters', () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.setSearchTerm('united');
      result.current.setSelectedRegion('Europe');
    });

    expect(result.current.countries).toHaveLength(1);
    expect(result.current.countries[0].cca2).toBe('GB');
  });

  it('should handle pagination', () => {
    const { result } = renderHook(() => useCountries());

    // Initial state should show all items since we have less than 20
    expect(result.current.countries).toHaveLength(5);
    expect(result.current.hasMore).toBe(false);

    // Load more items (should not change anything)
    act(() => {
      result.current.loadMore();
    });

    // Should still show all items
    expect(result.current.countries).toHaveLength(mockCountries.length);
    expect(result.current.hasMore).toBe(false);
  });

  it('should handle pagination with more items than page size', () => {
    // Create a larger mock dataset
    const largeMockCountries = Array.from({ length: 25 }, (_, i) => ({
      cca2: `C${i}`,
      name: { common: `Country ${i}`, official: `Country ${i}` },
      region: 'Test',
    }));

    (useGetCountriesQuery as jest.Mock).mockReturnValue({
      data: largeMockCountries,
      isLoading: false,
    });

    const { result } = renderHook(() => useCountries());

    // Initial state should show first 20 items
    expect(result.current.countries).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);

    // Load more items
    act(() => {
      result.current.loadMore();
    });

    // Should show all items
    expect(result.current.countries).toHaveLength(25);
    expect(result.current.hasMore).toBe(false);
  });

  it('should reset pagination', () => {
    const { result } = renderHook(() => useCountries());

    // Change page
    act(() => {
      result.current.loadMore();
    });

    // Reset pagination
    act(() => {
      result.current.resetPagination();
    });

    expect(result.current.countries).toHaveLength(5);
    expect(result.current.hasMore).toBe(false);
  });

  it('should reset pagination when filters change', () => {
    const { result } = renderHook(() => useCountries());

    // Change filter
    act(() => {
      result.current.setSearchTerm('united');
    });

    // Should show filtered results
    expect(result.current.countries).toHaveLength(2);
    expect(result.current.hasMore).toBe(false);
  });

  it('should handle loading state', () => {
    (useGetCountriesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useCountries());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.countries).toHaveLength(0);
  });

  it('should handle empty data', () => {
    (useGetCountriesQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    const { result } = renderHook(() => useCountries());

    expect(result.current.countries).toHaveLength(0);
    expect(result.current.regions).toEqual(['All regions']);
  });
});
