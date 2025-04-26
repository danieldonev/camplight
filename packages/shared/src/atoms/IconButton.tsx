import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@mui/material';

export interface IconButtonProps extends MuiIconButtonProps {
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => {
  return <MuiIconButton {...props}>{icon}</MuiIconButton>;
};
