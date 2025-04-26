import { Modal as MuiModal, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '../atoms';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  borderRadius: 2,
};

export const Modal = ({ open, onClose, children, title, maxWidth = 'md' }: ModalProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          ...modalStyle,
          maxWidth: {
            xs: '90%',
            sm: maxWidth === 'xs' ? '90%' : '80%',
            md: maxWidth === 'xs' ? '90%' : maxWidth === 'sm' ? '80%' : '60%',
            lg:
              maxWidth === 'xs'
                ? '90%'
                : maxWidth === 'sm'
                  ? '80%'
                  : maxWidth === 'md'
                    ? '60%'
                    : '50%',
            xl:
              maxWidth === 'xs'
                ? '90%'
                : maxWidth === 'sm'
                  ? '80%'
                  : maxWidth === 'md'
                    ? '60%'
                    : maxWidth === 'lg'
                      ? '50%'
                      : '40%',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          {title && (
            <Box component="h2" sx={{ m: 0, typography: 'h5' }}>
              {title}
            </Box>
          )}
          <IconButton
            onClick={onClose}
            sx={{ ml: 'auto' }}
            aria-label="close"
            icon={<CloseIcon />}
          />
        </Box>
        {children}
      </Box>
    </MuiModal>
  );
};
