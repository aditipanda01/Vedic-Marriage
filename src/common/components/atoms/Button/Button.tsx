import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

const getVariantStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary.main};
        color: ${theme.colors.primary.contrast};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.dark};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary.main};
        color: ${theme.colors.secondary.contrast};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary.dark};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        border: 2px solid ${theme.colors.primary.main};
        color: ${theme.colors.primary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.main};
          color: ${theme.colors.primary.contrast};
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.primary.main};
        color: ${theme.colors.primary.contrast};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.dark};
        }
      `;
  }
};

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.typography.body2.fontSize};
      `;
    case 'lg':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.xl};
        font-size: ${theme.typography.h4.fontSize};
      `;
    default:
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.typography.body1.fontSize};
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  transition: all ${theme.transitions.default};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  ${({ variant = 'primary' }) => getVariantStyles(variant)}
  ${({ size = 'md' }) => getSizeStyles(size)}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary.light}40;
  }

  svg {
    width: 1.25em;
    height: 1.25em;
    margin-right: ${theme.spacing.xs};
  }
`;

export default StyledButton; 