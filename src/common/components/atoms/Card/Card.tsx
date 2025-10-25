import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface CardProps {
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  padding?: keyof typeof theme.spacing;
  fullWidth?: boolean;
}

const getElevation = (elevation: CardProps['elevation']) => {
  switch (elevation) {
    case 'sm':
      return theme.shadows.sm;
    case 'md':
      return theme.shadows.md;
    case 'lg':
      return theme.shadows.lg;
    default:
      return 'none';
  }
};

const StyledCard = styled.div<CardProps>`
  background-color: ${theme.colors.background.paper};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${({ elevation = 'md' }) => getElevation(elevation)};
  padding: ${({ padding = 'md' }) => theme.spacing[padding]};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  transition: box-shadow ${theme.transitions.default};

  &:hover {
    box-shadow: ${({ elevation = 'md' }) =>
      elevation === 'none' ? 'none' : theme.shadows.lg};
  }
`;

export default StyledCard; 