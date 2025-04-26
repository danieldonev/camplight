import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  children,
  ...props
}) => {
  return (
    <MuiButton
      variant={variant === 'primary' || variant === 'secondary' ? 'contained' : variant}
      color={variant === 'primary' ? 'primary' : variant === 'secondary' ? 'secondary' : color}
      size={size}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
