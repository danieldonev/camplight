import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { IconButton, useModal } from '@camplight/shared';
import { Star, StarBorder } from '@mui/icons-material';
import { memo, useCallback } from 'react';
import { Country } from '../types/country';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addFavorite, removeFavorite } from '../store/countriesSlice';
import { NoteInputDialog } from './NoteInputDialog';

interface CountryCardProps {
  country: Country;
  onOpenModal: (country: Country) => void;
}

export const CountryCard = memo(({ country, onOpenModal }: CountryCardProps) => {
  const dispatch = useDispatch();
  const { openModal, closeModal, ModalComponent } = useModal();
  const favorites = useSelector((state: RootState) => state.countries.favorites);
  const isFavorite = !!favorites[country.ccn3];
  const note = favorites[country.ccn3]?.note;

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isFavorite) {
        dispatch(removeFavorite(country.ccn3));
      } else {
        openModal(
          <NoteInputDialog
            country={country}
            onSave={(note) => {
              dispatch(addFavorite({ country, note }));
              closeModal();
            }}
            onCancel={closeModal}
          />,
          { title: 'Add to Favorites' }
        );
      }
    },
    [country, dispatch, isFavorite, openModal, closeModal]
  );

  return (
    <>
      <ModalComponent />
      <Grid item onClick={() => onOpenModal(country)}>
        <Card
          sx={{
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease-in-out',
            },
          }}
        >
          <Box sx={{ position: 'relative', height: '140px', backgroundColor: 'grey.100' }}>
            <CardMedia
              component="img"
              height="140"
              image={country.flags.png}
              alt={country.flags.alt}
              sx={{
                height: '100%',
                objectFit: 'contain',
                width: '100%',
              }}
            />
            <IconButton
              data-testid={'toggle-favorite-button'}
              onClick={handleToggleFavorite}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
              icon={
                isFavorite ? (
                  <Star data-testid={'star-icon'} sx={{ color: 'yellow' }} />
                ) : (
                  <StarBorder data-testid={'star-border-icon'} sx={{ color: 'white' }} />
                )
              }
            />
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {country.name.common}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Capital: {country.capital?.[0] || 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Population: {country.population.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Region: {country.region}
            </Typography>
            {isFavorite && note && (
              <Typography
                data-testid={'favorite-note'}
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Note: {note}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
});
