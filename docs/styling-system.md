# Styling System Documentation

## Overview

Our application uses Styled Components as the primary styling solution, combined with a structured design system. This approach provides several benefits:

- Scoped styles to specific components
- Dynamic styling based on props/state
- Type-safe styling with TypeScript
- Consistent design tokens across the application
- Reusable components with predictable styling

## Design System

### Theme

The theme (`src/styles/theme.ts`) serves as the single source of truth for our design tokens:

```typescript
export const theme = {
  colors: {
    primary: { main, light, dark, contrast },
    secondary: { main, light, dark, contrast },
    background: { default, paper },
    text: { primary, secondary, disabled },
    error: { main, light, dark },
    success: { main, light, dark },
    warning: { main, light, dark },
  },
  typography: {
    fontFamily,
    h1: { fontSize, fontWeight, lineHeight },
    h2: { fontSize, fontWeight, lineHeight },
    h3: { fontSize, fontWeight, lineHeight },
    h4: { fontSize, fontWeight, lineHeight },
    body1: { fontSize, fontWeight, lineHeight },
    body2: { fontSize, fontWeight, lineHeight },
  },
  spacing: { xs, sm, md, lg, xl, xxl },
  borderRadius: { sm, md, lg, full },
  shadows: { sm, md, lg },
  breakpoints: { xs, sm, md, lg, xl, xxl },
  transitions: { default, fast, slow },
};
```

### Global Styles

Global styles (`src/styles/GlobalStyles.ts`) provide base styling for HTML elements:

- CSS reset
- Base typography
- Default colors
- Form element styling
- Scrollbar customization

## Component Architecture

We follow the Atomic Design pattern for our components:

### Atoms

Base components in `src/components/atoms/`:

- `Button`: Primary action component
- `Input`: Text input field
- `Select`: Dropdown selection
- `Checkbox`: Binary choice input
- `Radio`: Single choice input
- `Typography`: Text display
- `Card`: Container component

Each atom component:
- Uses styled-components
- Accepts theme-based props
- Handles common states (hover, focus, disabled)
- Maintains consistent styling

Example:
```typescript
const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ variant }) => getVariantStyles(variant)};
  padding: ${({ size }) => getSizeStyles(size)};
  // ... other styles
`;
```

### Molecules

Compound components in `src/components/molecules/`:

- `FormField`: Input wrapper with label and error
- `RadioGroup`: Radio button group with labels
- `CheckboxGroup`: Checkbox group with labels

Molecules combine atoms to create more complex components:
```typescript
const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => (
  <FieldContainer>
    {label && <Typography>{label}</Typography>}
    {children}
    {error && <Typography color="error">{error}</Typography>}
  </FieldContainer>
);
```

## Best Practices

1. **Theme Usage**
   - Always use theme values instead of hardcoded values
   - Access theme through props: `${({ theme }) => theme.colors.primary.main}`
   - Use theme spacing for consistent gaps and padding

2. **Component Props**
   - Keep props focused and specific
   - Use TypeScript interfaces for prop definitions
   - Provide sensible defaults

3. **Styled Components**
   - Use the `css` helper for complex styles
   - Leverage props for dynamic styling
   - Keep styles close to components
   - Use meaningful component names

4. **Responsive Design**
   - Use theme breakpoints for media queries
   - Implement mobile-first approach
   - Test across different screen sizes

## Usage Examples

### Basic Component
```typescript
import styled from 'styled-components';
import { theme } from '@/styles/theme';

const StyledComponent = styled.div`
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.md};
`;
```

### Dynamic Styling
```typescript
const DynamicComponent = styled.div<{ isActive: boolean }>`
  background-color: ${({ isActive }) => 
    isActive ? theme.colors.primary.main : theme.colors.background.default};
`;
```

### Compound Component
```typescript
const FormField = ({ label, error, children }) => (
  <FieldContainer>
    <Label>{label}</Label>
    {children}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FieldContainer>
);
```

## Adding New Components

1. Create component directory in appropriate atomic level
2. Define component interface
3. Create styled components using theme values
4. Export component and its types
5. Add to index file for easy importing

## Maintenance

- Keep theme values consistent
- Document new design tokens
- Update components when theme changes
- Maintain type safety
- Test across different states and screen sizes 