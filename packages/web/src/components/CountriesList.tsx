import { memo, useCallback, Suspense, lazy, useEffect, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import { Country } from '../types/country';
import { CountryCard } from './CountryCard';
import { useModal, Loader } from '@camplight/shared';

// Lazy load the CountryDetails component
const CountryDetails = lazy(() =>
  import('./CountryDetails').then((module) => ({ default: module.CountryDetailsModal }))
);

// Memoized modal content component
const ModalContent = memo(({ country }: { country: Country }) => (
  <Suspense fallback={<Loader />}>
    <CountryDetails country={country} />
  </Suspense>
));

interface CountriesListProps {
  countries: Country[];
  hasMore: boolean;
  loadMore: () => void;
}

export const CountriesList = memo(({ countries, hasMore, loadMore }: CountriesListProps) => {
  const { openModal, ModalComponent } = useModal();
  const observer = useRef<IntersectionObserver>();
  const lastCountryElementRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = useCallback(
    (country: Country) => {
      openModal(<ModalContent country={country} />, { title: country.name.official });
    },
    [openModal]
  );

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (lastCountryElementRef.current) {
      observer.current.observe(lastCountryElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loadMore]);

  return (
    <>
      <ModalComponent />
      <Grid container spacing={3}>
        {countries.map((country, index) => (
          <Grid
            item
            key={country.ccn3}
            xs={12}
            sm={4}
            lg={3}
            data-testid={`country-${country.ccn3}`}
          >
            <div ref={index === countries.length - 1 ? lastCountryElementRef : undefined}>
              <CountryCard country={country} onOpenModal={handleOpenModal} />
            </div>
          </Grid>
        ))}
      </Grid>
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Loader />
        </Box>
      )}
    </>
  );
});
