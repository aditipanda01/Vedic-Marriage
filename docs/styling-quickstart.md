# Styling System Quick Start Guide

## Getting Started

1. **Installation**
   ```bash
   npm install styled-components
   npm install --save-dev @types/styled-components
   ```

2. **Theme Provider Setup**
   ```typescript
   // src/App.tsx
   import { ThemeProvider } from 'styled-components';
   import { theme } from '@/styles/theme';
   import GlobalStyles from '@/styles/GlobalStyles';

   const App = () => (
     <ThemeProvider theme={theme}>
       <GlobalStyles />
       {/* Your app content */}
     </ThemeProvider>
   );
   ```

## Creating a New Component

1. **Basic Styled Component**
   ```typescript
   import styled from 'styled-components';
   import { theme } from '@/styles/theme';

   const StyledComponent = styled.div`
     color: ${theme.colors.text.primary};
     padding: ${theme.spacing.md};
   `;
   ```

2. **Component with Props**
   ```typescript
   interface MyComponentProps {
     variant?: 'primary' | 'secondary';
   }

   const MyComponent = styled.div<MyComponentProps>`
     background-color: ${({ variant = 'primary' }) =>
       variant === 'primary' ? theme.colors.primary.main : theme.colors.secondary.main};
   `;
   ```

## Using Existing Components

1. **Basic Usage**
   ```typescript
   import { Button, Input, Typography } from '@/components/atoms';

   const MyPage = () => (
     <div>
       <Typography variant="h1">Welcome</Typography>
       <Input placeholder="Enter text" />
       <Button>Click Me</Button>
     </div>
   );
   ```

2. **Form Field Usage**
   ```typescript
   import { FormField } from '@/components/molecules';
   import { Input } from '@/components/atoms';

   const MyForm = () => (
     <FormField label="Username" error="This field is required">
       <Input placeholder="Enter username" />
     </FormField>
   );
   ```

## Common Patterns

1. **Responsive Design**
   ```typescript
   const ResponsiveComponent = styled.div`
     padding: ${theme.spacing.md};

     @media (min-width: ${theme.breakpoints.md}) {
       padding: ${theme.spacing.lg};
     }
   `;
   ```

2. **Dynamic Styles**
   ```typescript
   const DynamicComponent = styled.div<{ isActive: boolean }>`
     background-color: ${({ isActive }) =>
       isActive ? theme.colors.primary.main : theme.colors.background.default};
     transition: background-color ${theme.transitions.default};
   `;
   ```

3. **Nested Styles**
   ```typescript
   const ParentComponent = styled.div`
     padding: ${theme.spacing.md};

     &:hover {
       background-color: ${theme.colors.background.paper};
     }

     > * {
       margin-bottom: ${theme.spacing.sm};
     }
   `;
   ```

## Best Practices

1. **Theme Access**
   - Use theme values for colors, spacing, typography
   - Avoid hardcoded values
   - Use theme breakpoints for responsive design

2. **Component Organization**
   - Place styled components in the same file as the component
   - Use meaningful names for styled components
   - Keep styles close to where they're used

3. **Type Safety**
   - Define interfaces for component props
   - Use TypeScript for styled-components
   - Export types for reuse

4. **Performance**
   - Avoid unnecessary style recalculations
   - Use CSS-in-JS features like `css` helper for complex styles
   - Keep styles simple and maintainable

## Troubleshooting

1. **Type Errors**
   - Ensure `@types/styled-components` is installed
   - Check theme type definitions
   - Verify prop types match styled-component props

2. **Style Issues**
   - Check theme values are correct
   - Verify styled-component syntax
   - Use browser dev tools to inspect styles

3. **Common Mistakes**
   - Forgetting to wrap app with ThemeProvider
   - Using incorrect theme property paths
   - Missing type definitions for props

## Resources

- [Styled Components Documentation](https://styled-components.com/docs)
- [Theme Type Definitions](./theme.ts)
- [Component Library](./components)
- [Global Styles](./GlobalStyles.ts) 