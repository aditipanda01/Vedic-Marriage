import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

interface SelectProps {
  error?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const getSizeStyles = (size: SelectProps['size']) => {
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

const StyledSelect = styled.select<SelectProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border: 2px solid ${({ error }) => (error ? theme.colors.error.main : theme.colors.background.default)};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background.paper};
  color: ${theme.colors.text.primary};
  transition: all ${theme.transitions.default};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing.sm} center;
  background-size: 1.25em;
  padding-right: ${theme.spacing.xl};

  ${({ size = 'md' }) => getSizeStyles(size)}

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? theme.colors.error.main : theme.colors.primary.main)};
    box-shadow: 0 0 0 3px ${({ error }) => (error ? theme.colors.error.light : theme.colors.primary.light)}40;
  }

  &:disabled {
    background-color: ${theme.colors.background.default};
    cursor: not-allowed;
    opacity: 0.7;
  }

  option {
    background-color: ${theme.colors.background.paper};
    color: ${theme.colors.text.primary};
  }
`;

export default StyledSelect; 