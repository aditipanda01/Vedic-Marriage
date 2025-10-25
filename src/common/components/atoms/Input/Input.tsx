import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

interface InputProps {
  error?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const getSizeStyles = (size: InputProps['size']) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.typography.body2.fontSize};
      `;
    case 'lg':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: ${theme.typography.h4.fontSize};
      `;
    default:
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.typography.body1.fontSize};
      `;
  }
};

const StyledInput = styled.input<InputProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border: 2px solid ${({ error }) => (error ? theme.colors.error.main : theme.colors.background.dark)};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background.main};
  color: ${theme.colors.text.primary};
  transition: all ${theme.transitions.default};

  ${({ size = 'md' }) => getSizeStyles(size)}

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? theme.colors.error.main : theme.colors.primary.main)};
    box-shadow: 0 0 0 3px ${({ error }) => (error ? theme.colors.error.light : theme.colors.primary.light)}40;
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }

  &:disabled {
    background-color: ${theme.colors.background.dark};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export default StyledInput; 