# Onboarding Feature Structure

## Directory Structure
```
src/features/onboarding/
├── components/                     # Onboarding-specific components
│   ├── steps/                     # Individual onboarding steps
│   │   ├── WelcomeStep.tsx        # Initial welcome screen
│   │   ├── BasicInfoStep.tsx      # Basic user information
│   │   ├── ProfilePhotoStep.tsx   # Profile photo upload
│   │   ├── PreferencesStep.tsx    # Partner preferences
│   │   ├── VedicDetailsStep.tsx   # Vedic astrology details
│   │   └── VerificationStep.tsx   # Phone/email verification
│   ├── shared/                    # Shared onboarding components
│   │   ├── ProgressBar.tsx        # Step progress indicator
│   │   ├── StepNavigation.tsx     # Next/Back buttons
│   │   └── OnboardingLayout.tsx   # Common layout for steps
│   └── index.ts                   # Component exports
│
├── hooks/                         # Custom hooks
│   ├── useOnboardingFlow.ts       # Manages step navigation
│   ├── useOnboardingForm.ts       # Form handling
│   └── useOnboardingProgress.ts   # Progress tracking
│
├── services/                      # API and business logic
│   ├── onboardingAPI.ts           # API calls
│   ├── validationService.ts       # Form validation
│   └── storageService.ts          # Local storage handling
│
├── store/                         # State management
│   ├── onboardingStore.ts         # Zustand store
│   └── types.ts                   # Store types
│
├── types/                         # TypeScript types
│   ├── steps.ts                   # Step definitions
│   ├── forms.ts                   # Form types
│   └── index.ts                   # Type exports
│
└── utils/                         # Helper functions
    ├── validators.ts              # Validation helpers
    ├── formatters.ts              # Data formatting
    └── constants.ts               # Onboarding constants
```

## Key Components

### 1. Step Components
- **WelcomeStep**: Initial welcome screen with app introduction
- **BasicInfoStep**: Collect basic user information
- **ProfilePhotoStep**: Profile photo upload with preview
- **PreferencesStep**: Partner preferences and requirements
- **VedicDetailsStep**: Vedic astrology information
- **VerificationStep**: Phone/email verification

### 2. Shared Components
- **ProgressBar**: Visual progress indicator
- **StepNavigation**: Navigation controls
- **OnboardingLayout**: Common layout wrapper

## State Management

### Onboarding Store (Zustand)
```typescript
interface OnboardingState {
  currentStep: number;
  steps: Step[];
  formData: OnboardingFormData;
  isComplete: boolean;
  actions: {
    nextStep: () => void;
    previousStep: () => void;
    updateFormData: (data: Partial<OnboardingFormData>) => void;
    completeOnboarding: () => void;
  };
}
```

## Routing Structure

```typescript
// routes.tsx
const onboardingRoutes = {
  path: '/onboarding',
  element: <OnboardingLayout />,
  children: [
    { path: '', element: <WelcomeStep /> },
    { path: 'basic-info', element: <BasicInfoStep /> },
    { path: 'profile-photo', element: <ProfilePhotoStep /> },
    { path: 'preferences', element: <PreferencesStep /> },
    { path: 'vedic-details', element: <VedicDetailsStep /> },
    { path: 'verification', element: <VerificationStep /> },
  ],
};
```

## Best Practices

1. **Progressive Disclosure**
   - Show only necessary information at each step
   - Break complex forms into manageable chunks
   - Provide clear progress indicators

2. **Form Handling**
   - Use React Hook Form for efficient form management
   - Implement real-time validation
   - Save progress automatically

3. **User Experience**
   - Smooth transitions between steps
   - Clear error messages
   - Mobile-first design
   - Offline support

4. **Data Management**
   - Store progress in local storage
   - Sync with backend when online
   - Handle network errors gracefully

5. **Accessibility**
   - Keyboard navigation
   - Screen reader support
   - Clear focus management

## Integration Points

1. **Authentication**
   - Connect with auth feature for user creation
   - Handle verification flow

2. **Profile**
   - Pass completed data to profile feature
   - Handle profile completion

3. **Analytics**
   - Track completion rates
   - Monitor drop-off points
   - Measure time to complete

## Example Usage

```typescript
// OnboardingLayout.tsx
const OnboardingLayout = () => {
  const { currentStep, steps } = useOnboardingStore();
  
  return (
    <div className="onboarding-container">
      <ProgressBar steps={steps} currentStep={currentStep} />
      <Outlet /> {/* Renders current step */}
      <StepNavigation />
    </div>
  );
};

// BasicInfoStep.tsx
const BasicInfoStep = () => {
  const { updateFormData } = useOnboardingStore();
  const { register, handleSubmit } = useOnboardingForm();
  
  return (
    <form onSubmit={handleSubmit}>
      <Input {...register('name')} />
      <Input {...register('dateOfBirth')} />
      <Input {...register('gender')} />
      <Button type="submit">Next</Button>
    </form>
  );
};
```

## Testing Strategy

1. **Unit Tests**
   - Individual step components
   - Form validation
   - State management

2. **Integration Tests**
   - Step navigation
   - Form submission
   - Data persistence

3. **E2E Tests**
   - Complete onboarding flow
   - Error scenarios
   - Network conditions 