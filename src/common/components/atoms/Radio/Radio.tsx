import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

interface RadioProps {
  error?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const getSizeStyles = (size: RadioProps['size']) => {
  switch (size) {
    case 'sm':
      return css`
        width: 16px;
        height: 16px;
      `;
    case 'lg':
      return css`
        width: 24px;
        height: 24px;
      `;
    default:
      return css`
        width: 20px;
        height: 20px;
      `;
  }
};

const StyledRadio = styled.input.attrs({ type: 'radio' })<RadioProps>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 2px solid ${({ error }) => (error ? theme.colors.error.main : theme.colors.secondary.light)};
  border-radius: 50%;
  background-color: ${theme.colors.background.paper};
  cursor: pointer;
  position: relative;
  transition: all ${theme.transitions.default};

  ${({ size = 'md' }) => getSizeStyles(size)}

  &:checked {
    border-color: ${theme.colors.primary.main};

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background-color: ${theme.colors.primary.main};
    }
  }

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? theme.colors.error.main : theme.colors.primary.main)};
    box-shadow: 0 0 0 3px ${({ error }) => (error ? theme.colors.error.light : theme.colors.primary.light)}40;
  }

  &:disabled {
    background-color: ${theme.colors.background.default};
    border-color: ${theme.colors.text.disabled};
    cursor: not-allowed;
    opacity: 0.7;

    &:checked::after {
      background-color: ${theme.colors.text.disabled};
    }
  }
`;

export default StyledRadio; 