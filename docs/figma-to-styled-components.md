# Converting Figma Designs to Styled Components

## Overview

This guide explains how to convert Figma designs into styled-components, ensuring consistency and maintainability in your React application.

## Step-by-Step Process

### 1. Extract Design Tokens

1. **Colors**
   ```typescript
   // From Figma color styles
   export const colors = {
     primary: {
       main: '#FF6B35',    // Primary color
       light: '#FF8B5A',   // 20% lighter
       dark: '#CC552A',    // 20% darker
     },
     // ... other colors
   };
   ```

2. **Typography**
   ```typescript
   // From Figma text styles
   export const typography = {
     h1: {
       fontSize: '2.5rem',     // 40px
       fontWeight: 700,
       lineHeight: 1.2,
       fontFamily: 'Inter',
     },
     body: {
       fontSize: '1rem',       // 16px
       fontWeight: 400,
       lineHeight: 1.5,
       fontFamily: 'Inter',
     },
     // ... other text styles
   };
   ```

3. **Spacing**
   ```typescript
   // From Figma auto-layout spacing
   export const spacing = {
     xs: '0.25rem',    // 4px
     sm: '0.5rem',     // 8px
     md: '1rem',       // 16px
     lg: '1.5rem',     // 24px
     xl: '2rem',       // 32px
   };
   ```

### 2. Create Theme File

```typescript
// src/styles/theme.ts
import { colors, typography, spacing } from './tokens';

export const theme = {
  colors,
  typography,
  spacing,
  // ... other theme values
};
```

### 3. Convert Components

1. **Basic Component**
   ```typescript
   // From Figma frame/component
   const Card = styled.div`
     padding: ${({ theme }) => theme.spacing.md};
     background-color: ${({ theme }) => theme.colors.background.paper};
     border-radius: 8px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   `;
   ```

2. **Component with Variants**
   ```typescript
   interface ButtonProps {
     variant?: 'primary' | 'secondary';
     size?: 'small' | 'medium' | 'large';
   }

   const Button = styled.button<ButtonProps>`
     padding: ${({ size = 'medium' }) => 
       size === 'small' ? '0.5rem 1rem' :
       size === 'large' ? '1rem 2rem' :
       '0.75rem 1.5rem'};
     
     background-color: ${({ variant = 'primary', theme }) =>
       variant === 'primary' ? theme.colors.primary.main :
       theme.colors.secondary.main};
     
     color: ${({ theme }) => theme.colors.text.contrast};
     border-radius: 4px;
     border: none;
     cursor: pointer;
     
     &:hover {
       opacity: 0.9;
     }
   `;
   ```

### 4. Handle Responsive Designs

```typescript
const ResponsiveContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;
```

### 5. Implement Auto-Layout

```typescript
const FlexContainer = styled.div<{ gap?: string; direction?: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  gap: ${({ gap = '1rem' }) => gap};
  align-items: center;
  justify-content: space-between;
`;
```

## Best Practices

1. **Use Figma's Auto-Layout**
   - Convert auto-layout properties to flexbox
   - Maintain consistent spacing using theme values
   - Use gap property for spacing between elements

2. **Handle Constraints**
   ```typescript
   const ConstrainedImage = styled.img`
     width: 100%;
     height: auto;
     object-fit: cover;
     max-width: 800px; // From Figma constraints
   `;
   ```

3. **Implement States**
   ```typescript
   const InteractiveButton = styled.button`
     // Default state
     background-color: ${({ theme }) => theme.colors.primary.main};
     
     // Hover state
     &:hover {
       background-color: ${({ theme }) => theme.colors.primary.dark};
     }
     
     // Active state
     &:active {
       transform: scale(0.98);
     }
     
     // Disabled state
     &:disabled {
       opacity: 0.5;
       cursor: not-allowed;
     }
   `;
   ```

4. **Use CSS Grid for Complex Layouts**
   ```typescript
   const GridLayout = styled.div`
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
     gap: ${({ theme }) => theme.spacing.md};
   `;
   ```

## Tools and Resources

1. **Figma Plugins**
   - Figma Tokens
   - Style Dictionary
   - CSS to Styled Components

2. **Development Tools**
   - Styled Components DevTools
   - React Developer Tools
   - Browser DevTools

## Common Patterns

1. **Card Component**
   ```typescript
   const Card = styled.div`
     background: ${({ theme }) => theme.colors.background.paper};
     border-radius: ${({ theme }) => theme.borderRadius.md};
     padding: ${({ theme }) => theme.spacing.md};
     box-shadow: ${({ theme }) => theme.shadows.sm};
   `;
   ```

2. **Form Input**
   ```typescript
   const Input = styled.input`
     width: 100%;
     padding: ${({ theme }) => theme.spacing.sm};
     border: 1px solid ${({ theme }) => theme.colors.border};
     border-radius: ${({ theme }) => theme.borderRadius.sm};
     
     &:focus {
       outline: none;
       border-color: ${({ theme }) => theme.colors.primary.main};
     }
   `;
   ```

3. **Navigation Bar**
   ```typescript
   const NavBar = styled.nav`
     display: flex;
     align-items: center;
     padding: ${({ theme }) => theme.spacing.md};
     background: ${({ theme }) => theme.colors.background.paper};
     box-shadow: ${({ theme }) => theme.shadows.sm};
   `;
   ```

## Tips for Efficient Conversion

1. **Start with Design System**
   - Extract all design tokens first
   - Create a comprehensive theme
   - Document all design decisions

2. **Component Hierarchy**
   - Start with basic components
   - Build compound components
   - Create page layouts last

3. **Responsive Design**
   - Use relative units (rem, em)
   - Implement mobile-first approach
   - Test all breakpoints

4. **Performance**
   - Use CSS-in-JS features wisely
   - Implement code splitting
   - Optimize re-renders

Remember to maintain consistency with your Figma design system and regularly sync with design updates. 