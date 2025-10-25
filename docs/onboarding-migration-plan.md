# Onboarding Feature Migration Plan

## Overview
This document outlines the step-by-step process for migrating the existing Next.js onboarding implementation to our new React + TypeScript architecture.

## Current Structure
```
/api/src/
├── app/                    # Next.js app router
├── components/             # Shared components
├── screens/               # Screen components
└── lib/                   # Utilities and configs
```

## Target Structure
```
src/features/onboarding/
├── components/
├── hooks/
├── services/
├── store/
└── utils/
```

## Migration Phases

### Phase 1: Setup and Infrastructure (Week 1)

#### 1.1 Initial Setup
```bash
# Create feature structure
mkdir -p src/features/onboarding/{components,hooks,services,store,utils}

# Create component subdirectories
mkdir -p src/features/onboarding/components/{steps,shared}
```

#### 1.2 Dependencies Setup
```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.0.0",
    "react-hook-form": "^7.0.0",
    "zustand": "^4.0.0",
    "zod": "^3.0.0",
    "axios": "^1.0.0"
  }
}
```

#### 1.3 Type Definitions
```typescript
// src/features/onboarding/types/index.ts
export interface OnboardingStep {
  id: string;
  title: string;
  isComplete: boolean;
  isRequired: boolean;
}

export interface OnboardingState {
  currentStep: number;
  steps: OnboardingStep[];
  formData: OnboardingFormData;
  isComplete: boolean;
}
```

### Phase 2: Component Migration (Week 2)

#### 2.1 Step Components Migration
1. **Signup Flow**
   - [ ] PhoneNumber.tsx → components/steps/SignupStep/PhoneNumber.tsx
   - [ ] RegistrationForm.tsx → components/steps/SignupStep/RegistrationForm.tsx
   - [ ] VerificationCode.tsx → components/steps/SignupStep/VerificationCode.tsx

2. **Profile Flow**
   - [ ] BasicInfoSection.tsx → components/steps/ProfileStep/BasicInfo.tsx
   - [ ] CareerSection.tsx → components/steps/ProfileStep/Career.tsx
   - [ ] FamilyBackgroundSection.tsx → components/steps/ProfileStep/FamilyBackground.tsx
   - [ ] PreferenceSection.tsx → components/steps/ProfileStep/Preferences.tsx

3. **Personality Flow**
   - [ ] AboutMe.tsx → components/steps/PersonalityStep/AboutMe.tsx
   - [ ] MBTI.tsx → components/steps/PersonalityStep/MBTI.tsx
   - [ ] Hobby.tsx → components/steps/PersonalityStep/Hobbies.tsx
   - [ ] PersonalValue.tsx → components/steps/PersonalityStep/Values.tsx

4. **Verification Flow**
   - [ ] KYCVerification.tsx → components/steps/VerificationStep/KYC.tsx
   - [ ] SelfieVerification.tsx → components/steps/VerificationStep/Selfie.tsx
   - [ ] GalleryPhotoVerification.tsx → components/steps/VerificationStep/GalleryPhoto.tsx

#### 2.2 Shared Components Migration
1. **Layout Components**
   - [ ] FormFillSection.tsx → components/shared/FormSection.tsx
   - [ ] Header.tsx → components/shared/Header.tsx

2. **UI Components**
   - [ ] ProgressBar.tsx → components/shared/ProgressBar.tsx
   - [ ] StepNavigation.tsx → components/shared/StepNavigation.tsx

### Phase 3: State Management Migration (Week 3)

#### 3.1 Zustand Store Setup
```typescript
// src/features/onboarding/store/onboardingStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingStore {
  currentStep: number;
  steps: Step[];
  formData: OnboardingFormData;
  actions: {
    nextStep: () => void;
    previousStep: () => void;
    updateFormData: (data: Partial<OnboardingFormData>) => void;
    completeOnboarding: () => void;
  };
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      // Store implementation
    }),
    {
      name: 'onboarding-storage',
    }
  )
);
```

#### 3.2 Form State Migration
1. **React Hook Form Integration**
   - [ ] Setup form schemas
   - [ ] Implement form validation
   - [ ] Add form persistence

2. **API Integration**
   - [ ] Setup API client
   - [ ] Implement API services
   - [ ] Add error handling

### Phase 4: Routing Migration (Week 4)

#### 4.1 Route Configuration
```typescript
// src/app/router/routes.tsx
const onboardingRoutes = {
  path: '/onboarding',
  element: <OnboardingLayout />,
  children: [
    { path: '', element: <WelcomeStep /> },
    { path: 'signup', element: <SignupStep /> },
    { path: 'profile', element: <ProfileStep /> },
    { path: 'personality', element: <PersonalityStep /> },
    { path: 'verification', element: <VerificationStep /> },
    { path: 'payment', element: <PaymentStep /> },
  ],
};
```

#### 4.2 Navigation Guards
- [ ] Implement route protection
- [ ] Add progress tracking
- [ ] Handle incomplete steps

### Phase 5: Testing Implementation (Week 5)

#### 5.1 Unit Tests
```typescript
// src/features/onboarding/__tests__/components/SignupStep.test.tsx
describe('SignupStep', () => {
  it('should render phone number input', () => {
    // Test implementation
  });
});
```

#### 5.2 Integration Tests
- [ ] Step navigation tests
- [ ] Form submission tests
- [ ] API integration tests

#### 5.3 E2E Tests
- [ ] Complete flow tests
- [ ] Error scenario tests
- [ ] Edge case tests

### Phase 6: Performance Optimization (Week 6)

#### 6.1 Code Splitting
- [ ] Implement lazy loading
- [ ] Optimize bundle size
- [ ] Add loading states

#### 6.2 Performance Monitoring
- [ ] Add performance metrics
- [ ] Implement error tracking
- [ ] Add analytics

## Migration Checklist

### Pre-Migration
- [ ] Backup current implementation
- [ ] Document current functionality
- [ ] Set up new project structure
- [ ] Configure development environment

### During Migration
- [ ] Migrate components one by one
- [ ] Test each migrated component
- [ ] Update dependencies
- [ ] Fix any breaking changes

### Post-Migration
- [ ] Verify all functionality
- [ ] Run full test suite
- [ ] Performance testing
- [ ] Documentation update

## Risk Mitigation

### Technical Risks
1. **Data Loss**
   - Implement data backup
   - Add data validation
   - Test data migration

2. **Breaking Changes**
   - Maintain backward compatibility
   - Add feature flags
   - Implement fallbacks

3. **Performance Issues**
   - Monitor performance metrics
   - Implement caching
   - Optimize assets

### Business Risks
1. **User Experience**
   - Maintain existing UX
   - Add progress indicators
   - Implement error handling

2. **Feature Parity**
   - Verify all features
   - Test edge cases
   - Document differences

## Success Criteria

1. **Technical**
   - All tests passing
   - No console errors
   - Performance metrics met
   - Code coverage > 80%

2. **Business**
   - All features working
   - User experience maintained
   - No data loss
   - Smooth transition

## Timeline

- Week 1: Setup and Infrastructure
- Week 2: Component Migration
- Week 3: State Management
- Week 4: Routing Migration
- Week 5: Testing Implementation
- Week 6: Performance Optimization

## Team Responsibilities

### Frontend Team
- Component migration
- State management
- Testing implementation

### Backend Team
- API integration
- Data validation
- Performance optimization

### QA Team
- Test planning
- Test execution
- Bug reporting

## Communication Plan

1. **Daily Updates**
   - Progress tracking
   - Blockers identification
   - Next steps planning

2. **Weekly Reviews**
   - Progress review
   - Risk assessment
   - Timeline adjustment

3. **Documentation**
   - Technical documentation
   - User guides
   - API documentation 