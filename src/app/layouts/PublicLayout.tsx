import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  background: linear-gradient(135deg, ${theme.colors.background.default} 0%, rgba(255, 248, 245, 1) 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  border-bottom: 3px solid ${theme.colors.primary.main};
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 480px) {
    padding: 0 ${theme.spacing.md};
  }
  
  @media (max-width: 375px) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const NavContent = styled.div`
  display: flex;
  height: 72px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  @media (max-width: 375px) {
    height: 64px;
  }
  
  @media (max-width: 320px) {
    height: 60px;
  }
`;

const Logo = styled(Link)`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: clamp(1.2rem, 4vw, ${theme.typography.h1.fontSize});
  font-weight: 800;
  background: linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }
  
  @media (max-width: 375px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

const NavLinks = styled.div`
  display: none;
  
  @media (min-width: ${theme.breakpoints.sm}) {
    display: flex;
    gap: ${theme.spacing.xl};
    background: rgba(255, 255, 255, 0.1);
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.body1.fontSize};
  font-weight: 600;
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${theme.colors.primary.main};
    background: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${theme.colors.primary.main};
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover:before {
    width: 80%;
  }
`;

const SignInButton = styled(Link)`
  display: none;
  
  @media (min-width: ${theme.breakpoints.sm}) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%);
    color: ${theme.colors.primary.contrast};
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    border-radius: 30px;
    font-size: ${theme.typography.button.fontSize};
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s ease;
    }
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    &:hover:before {
      left: 100%;
    }
    
    &:active {
      transform: translateY(-1px);
    }
  }
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Footer = styled.footer`
  background-color: ${theme.colors.background.default};
  padding: ${theme.spacing.xl} 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  text-align: center;
`;

const Copyright = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.caption.fontSize};
`;

export default function PublicLayout() {
  return (
    <LayoutContainer>
      <Nav>
        <NavContainer>
          <NavContent>
            <Logo to="/">Vedic Marriage</Logo>
            <NavLinks>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </NavLinks>
            <SignInButton to="/login">Sign in</SignInButton>
          </NavContent>
        </NavContainer>
      </Nav>

      <Main>
        <Outlet />
      </Main>

      <Footer>
        <FooterContent>
          <Copyright>
            &copy; {new Date().getFullYear()} Vedic Marriage. All rights reserved.
          </Copyright>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
}
