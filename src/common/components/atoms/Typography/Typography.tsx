import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2';
type TypographyColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: 'left' | 'center' | 'right';
  gutterBottom?: boolean;
  noWrap?: boolean;
}

const getVariantStyles = (variant: TypographyVariant) => {
  switch (variant) {
    case 'h1':
      return css`
        font-size: ${theme.typography.h1.fontSize};
        font-weight: ${theme.typography.h1.fontWeight};
        line-height: ${theme.typography.h1.lineHeight};
      `;
    case 'h2':
      return css`
        font-size: ${theme.typography.h2.fontSize};
        font-weight: ${theme.typography.h2.fontWeight};
        line-height: ${theme.typography.h2.lineHeight};
      `;
    case 'h3':
      return css`
        font-size: ${theme.typography.h3.fontSize};
        font-weight: ${theme.typography.h3.fontWeight};
        line-height: ${theme.typography.h3.lineHeight};
      `;
    case 'h4':
      return css`
        font-size: ${theme.typography.h4.fontSize};
        font-weight: ${theme.typography.h4.fontWeight};
        line-height: ${theme.typography.h4.lineHeight};
      `;
    case 'body1':
      return css`
        font-size: ${theme.typography.body1.fontSize};
        font-weight: ${theme.typography.body1.fontWeight};
        line-height: ${theme.typography.body1.lineHeight};
      `;
    case 'body2':
      return css`
        font-size: ${theme.typography.body2.fontSize};
        font-weight: ${theme.typography.body2.fontWeight};
        line-height: ${theme.typography.body2.lineHeight};
      `;
    default:
      return css`
        font-size: ${theme.typography.body1.fontSize};
        font-weight: ${theme.typography.body1.fontWeight};
        line-height: ${theme.typography.body1.lineHeight};
      `;
  }
};

const getColorStyles = (color: TypographyColor) => {
  switch (color) {
    case 'primary':
      return css`
        color: ${theme.colors.text.primary};
      `;
    case 'secondary':
      return css`
        color: ${theme.colors.text.secondary};
      `;
    case 'error':
      return css`
        color: ${theme.colors.error.main};
      `;
    case 'success':
      return css`
        color: ${theme.colors.success.main};
      `;
    case 'warning':
      return css`
        color: ${theme.colors.warning.main};
      `;
    default:
      return css`
        color: ${theme.colors.text.primary};
      `;
  }
};

const StyledTypography = styled.p<TypographyProps>`
  margin: 0;
  font-family: ${theme.typography.fontFamily};
  text-align: ${({ align = 'left' }) => align};
  margin-bottom: ${({ gutterBottom }) => (gutterBottom ? theme.spacing.sm : 0)};
  white-space: ${({ noWrap }) => (noWrap ? 'nowrap' : 'normal')};
  overflow: ${({ noWrap }) => (noWrap ? 'hidden' : 'visible')};
  text-overflow: ${({ noWrap }) => (noWrap ? 'ellipsis' : 'clip')};

  ${({ variant = 'body1' }) => getVariantStyles(variant)}
  ${({ color = 'primary' }) => getColorStyles(color)}
`;

export default StyledTypography; 