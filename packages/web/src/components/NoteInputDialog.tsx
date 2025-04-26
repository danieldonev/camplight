import { Box, Typography, TextField } from '@mui/material';
import { IconButton } from '@camplight/shared';
import { Close, Check } from '@mui/icons-material';
import { memo, useState } from 'react';
import { Country } from '../types/country';

interface NoteInputDialogProps {
  country: Country;
  onSave: (note: string) => void;
  onCancel: () => void;
}

export const NoteInputDialog = memo(({ country, onSave, onCancel }: NoteInputDialogProps) => {
  const [note, setNote] = useState('');

  return (
    <Box sx={{ p: 2, minWidth: 300 }} data-testid={'note-input-dialog'}>
      <Typography variant="h6" gutterBottom>
        Add {country.name.common} to favorites
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Add a note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        sx={{ mb: 2 }}
        placeholder="Why do you want to favorite this country?"
        inputProps={{
          'data-testid': 'note-text-field',
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <IconButton onClick={onCancel} sx={{ color: 'error.main' }} icon={<Close />} />
        <IconButton
          data-testid={'save-button'}
          onClick={() => onSave(note)}
          sx={{ color: 'success.main' }}
          icon={<Check />}
        />
      </Box>
    </Box>
  );
});
