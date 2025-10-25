import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background.default};
  // overflow-x: hidden;
`;

export const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl} ${theme.spacing.lg};
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.h2.fontSize};
  font-weight: ${theme.typography.h2.fontWeight};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

export const SectionSubtitle = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.body1.fontSize};
  color: ${theme.colors.text.secondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto ${theme.spacing.xl};
`; 