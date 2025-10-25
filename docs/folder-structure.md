# VedicMarriage Frontend Architecture Documentation

## Overview
This enhanced documentation provides a comprehensive blueprint for VedicMarriage's frontend architecture. It builds upon the initial structure with refined practices, concrete implementation details, and strategic enhancements to ensure scalability, performance, and maintainability. The architecture follows Domain-Driven Design (DDD) principles with Atomic Design implementation, optimized for a React + TypeScript monorepo.

## Folder Structure
```
src/
├── app/                            # Core application infrastructure
│   ├── layouts/                    # Layout components (AuthLayout, DashboardLayout)
│   │   ├── AuthLayout.tsx          # Authentication flow layout
│   │   ├── DashboardLayout.tsx     # Main app layout with navigation
│   │   └── PublicLayout.tsx        # Landing page layout
│   │
│   ├── providers/                  # Global context providers
│   │   ├── AppProviders.tsx        # Aggregates all providers
│   │   ├── AuthProvider.tsx        # Authentication context
│   │   ├── ThemeProvider.tsx       # Theme management
│   │   ├── QueryProvider.tsx       # React Query client
│   │   └── SocketProvider.tsx      # WebSocket connection context
│   │
│   └── router/                     # Advanced routing configuration
│       ├── routes.tsx              # Route definitions with lazy loading
│       ├── ProtectedRoute.tsx      # Auth-protected route HOC
│       ├── PublicRoute.tsx         # Public-only route HOC
│       └── routeGuards.ts          # Route permission guards
│
├── assets/                         # Optimized static assets
│   ├── images/                     # Compressed images (WebP format)
│   │   ├── avatars/                # Default user avatars
│   │   ├── backgrounds/            # Auth background images
│   │   └── logos/                  # App logos (SVG preferred)
│   │
│   ├── fonts/                      # Custom font files
│   ├── icons/                      # SVG icons library
│   └── locales/                    # i18n resource files
│       ├── en.json                 # English translations
│       ├── hi.json                 # Hindi translations
│       └── i18n.ts                 # i18next configuration
│
├── common/                         # Shared application resources
│   ├── components/                 # Atomic Design implementation
│   │   ├── atoms/                  # Fundamental UI elements
│   │   │   ├── Avatar.tsx          # User avatar with fallback
│   │   │   ├── MatchButton.tsx     # Animated like/skip buttons
│   │   │   ├── IconButton.tsx      # Accessible icon button
│   │   │   ├── Tag.tsx             # Filter tag with remove action
│   │   │   ├── Rating.tsx          # Star rating component
│   │   │   └── ProgressBar.tsx     # Profile completeness indicator
│   │   │
│   │   ├── molecules/              # Compound components
│   │   │   ├── ProfileHeader.tsx   # User name + basic info
│   │   │   ├── FilterGroup.tsx     # Collapsible filter section
│   │   │   ├── ActionBar.tsx       # Profile action buttons
│   │   │   ├── PreferenceRow.tsx   # Education/occupation display
│   │   │   └── ChatBubble.tsx      # Message bubble with status
│   │   │
│   │   ├── organisms/              # Complex UI sections
│   │   │   ├── ProfileCard.tsx     # Interactive match card
│   │   │   ├── MatchGrid.tsx       # Responsive profile grid
│   │   │   ├── ChatWindow.tsx      # Real-time chat interface
│   │   │   ├── FilterPanel.tsx     # Advanced search panel
│   │   │   └── ConnectionList.tsx  # Sent/received connections
│   │   │
│   │   └── templates/              # Page layout templates
│   │       ├── Dashboard.tsx       # Main app layout structure
│   │       ├── Discovery.tsx       # Match discovery template
│   │       └── ProfileView.tsx     # Profile detail template
│   │
│   ├── hooks/                      # Reusable custom hooks
│   │   ├── useDebounce.ts          # Debounce input/actions
│   │   ├── usePagination.ts        # Cursor-based pagination
│   │   ├── useScrollPosition.ts    # Track scroll position
│   │   ├── useMediaQuery.ts        # Responsive design helper
│   │   └── useAnalytics.ts         # Analytics event tracking
│   │
│   ├── utils/                      # Utility functions
│   │   ├── validators/             # Form validation schemas
│   │   ├── formatters/             # Data formatting helpers
│   │   ├── api/                    # API response handlers
│   │   └── errorHandlers.ts        # Global error processing
│   │
│   ├── constants/                  # Application constants
│   │   ├── routes.ts               # Route paths
│   │   ├── apiEndpoints.ts         # API endpoint URLs
│   │   └── regexPatterns.ts        # Validation regex patterns
│   │
│   └── types/                      # Global TypeScript types
│       ├── user.ts                 # User/profile types
│       ├── match.ts                # Match-related types
│       └── apiResponses.ts         # API response shapes
│
├── contexts/                       # React context providers
│   ├── AuthContext.tsx             # Authentication state
│   ├── NotificationContext.tsx     # Notification system
│   └── ErrorBoundary.tsx           # Global error boundary
│
├── features/                       # Domain-driven feature modules
│   ├── auth/                       # Authentication flow
│   │   ├── components/             
│   │   │   ├── LoginForm.tsx       # Credential login
│   │   │   ├── OTPVerification.tsx # OTP validation
│   │   │   └── PasswordReset.tsx   # Password recovery
│   │   │
│   │   ├── hooks/
│   │   │   ├── useLogin.ts         # Login logic
│   │   │   └── usePasswordReset.ts # Password reset flow
│   │   │
│   │   ├── services/
│   │   │   └── authAPI.ts          # Authentication API calls
│   │   │
│   │   └── store/                  # Zustand store slice
│   │       └── authSlice.ts        # Auth state management
│   │
│   ├── profile/                    # Profile management
│   │   ├── components/
│   │   │   ├── PhotoUpload.tsx     # Image cropper + uploader
│   │   │   ├── PrivacySettings.tsx # Privacy controls
│   │   │   └── EditBio.tsx         # Rich text bio editor
│   │   │
│   │   ├── hooks/
│   │   │   └── useProfileUpdate.ts # Profile update logic
│   │   │
│   │   └── services/
│   │       └── profileAPI.ts       # Profile API services
│   │
│   ├── matches/                    # Match discovery
│   │   ├── components/
│   │   │   ├── MatchFilters.tsx    # Dynamic filter controls
│   │   │   ├── ResultCard.tsx      # Match result card
│   │   │   └── CompatibilityMeter.tsx # Compatibility indicator
│   │   │
│   │   ├── hooks/
│   │   │   ├── useMatchSearch.ts   # Search/filter logic
│   │   │   └── useRecommendations.ts # Vedic recommendation hook
│   │   │
│   │   └── services/
│   │       └── matchAPI.ts         # Match data API
│   │
│   ├── connections/                # Connection management
│   │   ├── components/
│   │   │   ├── ConnectionCard.tsx  # Connection request UI
│   │   │   └── ActionButtons.tsx   # Accept/Reject/Block controls
│   │   │
│   │   └── hooks/
│   │       └── useConnectionActions.ts # Connection operations
│   │
│   ├── chat/                       # Real-time messaging
│   │   ├── components/
│   │   │   ├── ConversationList.tsx # Active conversations
│   │   │   ├── MessageInput.tsx    # Message composer
│   │   │   └── TypingIndicator.tsx # Real-time typing status
│   │   │
│   │   ├── hooks/
│   │   │   ├── useChatSocket.ts    # WebSocket management
│   │   │   └── useMessageHistory.ts # Message pagination
│   │   │
│   │   ├── services/
│   │   │   └── chatAPI.ts          # Message history API
│   │   │
│   │   └── pages/
│   │       └── ConversationPage.tsx # Chat conversation view
│   │
│   ├── notifications/              # Notification system
│   │   ├── components/
│   │   │   └── NotificationCenter.tsx # Notification inbox
│   │   │
│   │   └── services/
│   │       └── pushService.ts      # Web Push implementation
│   │
│   ├── recommendation/             # Vedic matching system
│   │   ├── components/
│   │   │   └── CompatibilityReport.tsx # Vedic compatibility UI
│   │   │
│   │   └── services/
│   │       └── vedicAPI.ts         # Vedic calculation API
│   │
│   ├── analytics/                  # User analytics
│   │   ├── components/
│   │   │   └── InsightsDashboard.tsx # Analytics visualization
│   │   │
│   │   └── hooks/
│   │       └── useTracking.ts      # Event tracking abstraction
│   │
│   └── settings/                   # User preferences
│       ├── components/
│       │   ├── PreferenceToggles.tsx # Settings toggles
│       │   └── SecuritySettings.tsx # Security controls
│       │
│       └── hooks/
│           └── useSettings.ts      # Settings persistence
│
├── services/                       # Global service infrastructure
│   ├── api/
│   │   ├── apiClient.ts            # Axios instance with interceptors
│   │   └── interceptors.ts         # Auth/error handling
│   │
│   ├── websocket/                  # Real-time communication
│   │   ├── socketManager.ts        # WebSocket connection handler
│   │   └── eventHandlers.ts        # Message/event processors
│   │
│   ├── cache/                      # Data caching
│   │   └── reactQueryConfig.ts     # Query client configuration
│   │
│   └── analytics/                  # Analytics integration
│       └── tracker.ts              # Segment/GA implementation
│
├── store/                          # Redux store configuration
│   ├── index.ts                    # Store configuration and root reducer
│   ├── hooks.ts                    # Typed Redux hooks
│   ├── middleware/                 # Redux middleware
│   │   ├── index.ts               # Middleware configuration
│   │   ├── logger.ts              # Logging middleware
│   │   └── thunk.ts               # Async action middleware
│   │
│   ├── slices/                    # Redux Toolkit slices
│   │   ├── authSlice.ts           # Authentication state
│   │   ├── uiSlice.ts             # UI preferences state
│   │   ├── userSlice.ts           # User data state
│   │   └── matchSlice.ts          # Match discovery state
│   │
│   └── selectors/                 # Memoized selectors
│       ├── authSelectors.ts       # Auth state selectors
│       ├── uiSelectors.ts         # UI state selectors
│       └── userSelectors.ts       # User state selectors
│
├── styles/                         # Global styling system
│   ├── base/                       # Foundational styles
│   │   ├── reset.css               # CSS reset
│   │   └── globals.css             # Global CSS rules
│   │
│   ├── themes/                     # Theme definitions
│   │   ├── lightTheme.ts           # Light theme tokens
│   │   └── darkTheme.ts            # Dark theme tokens
│   │
│   ├── animations/                 # Animation library
│   │   ├── fade.ts                 # Fade animations
│   │   └── slide.ts                # Slide transitions
│   │
│   └── tailwind/                   # Tailwind configuration
│       └── tailwind.config.ts      # Tailwind theme extension
│
├── test/                           # Comprehensive testing suite
│   ├── unit/                       # Unit tests (Vitest)
│   │   └── utils/                  # Utility function tests
│   │
│   ├── integration/                # Integration tests (RTL)
│   │   └── components/             # Component integration tests
│   │
│   └── e2e/                        # End-to-end tests (Playwright)
│       ├── auth/                   # Auth flow tests
│       └── match/                  # Match flow tests
│
├── stories/                        # Component stories (Storybook)
│   ├── atoms/                      # Atom component stories
│   └── organisms/                  # Organism component stories
│
├── lib/                            # Third-party integrations
│   └── vedic-calculations/         # Vedic matching algorithms
│
├── App.tsx                         # Root application component
├── main.tsx                        # Application entry point
└── pwa/                            # Progressive Web App assets
    ├── manifest.json               # Web app manifest
    ├── serviceWorker.ts            # Service worker implementation
    └── offlineFallback.html        # Offline fallback page
```

## Key Highlights of This Structure
1. Atomic Design for UI Components
   Atoms: Basic building blocks like buttons, inputs, avatars, and tags
   Molecules: Compound components like profile headers, filter groups, and action bars
   Organisms: Complex UI sections like profile cards, match grids, and chat windows
   Templates: Page layouts for dashboard, discovery, and profile views
   This promotes reusability and consistency across features
2. Feature-First Organization
   Each feature (auth, profile, matches, etc.) has its own:
   Components (feature-specific)
   Hooks (feature-specific logic)
   Services (API integration)
   Pages (route components)
   Clear separation of concerns
   Easy to maintain and scale
3. Global Services
   Shared services in services/ directory
   Context-agnostic and reusable
   Centralized handling of:
      API calls
      WebSocket connections
      Analytics tracking
      Caching strategies
4.State Management
   Redux for global state
   Clean stores separation
   Feature-specific state management
   Optimistic UI updates
5.Modern Web Features
   PWA support for offline capabilities
   i18n ready for multiple languages
   Real-time features with WebSocket
   Responsive design
6.Comprehensive Testing
   Unit tests with Vitest
   Integration tests with React Testing Library
   E2E tests with Playwright
   Visual regression testing with Storybook
7. Performance Optimization
   Code splitting
   Lazy loading
   Asset optimization
   Caching strategies
8.Security & Error Handling
   Robust error boundaries
   Secure authentication
   Input validation
   XSS protection
9.Analytics & Monitoring
   Built-in tracking
   Performance monitoring
   User behavior analysis
   Error tracking
10. Development Experience
   TypeScript for type safety
   ESLint + Prettier for code quality
   Storybook for component development
   Hot module replacement
   
This structure is designed to be:
🚀 Scalable for future features
⚡ Performant for real-time operations
🎨 Consistent in UI/UX
🔄 Maintainable for long-term development
📱 Mobile-first and responsive
🌐 Internationalization-ready
🛡️ Secure and robust
🔄 Analytics-driven
Would you like me to elaborate on any of these aspects or help you implement a specific part of the structure?

## Tech Stack

| Category | Technology | Purpose | Key Features |
|----------|------------|----------|-------------|
| Framework | React 18 + Vite | Core UI rendering | - Concurrent rendering<br>- Fast refresh<br>- TypeScript support<br>- Build optimization |
| State Management | Redux + Redux Toolkit | Global state management | - Centralized store<br>- Immutable updates<br>- DevTools integration<br>- Middleware support |
| Styling | Tailwind CSS | Utility-first CSS | - Responsive design<br>- Custom theme system<br>- Dark mode support<br>- Component styling |
| Routing | React Router 6 | Navigation | - Route-based code splitting<br>- Protected routes<br>- Nested routing<br>- History management |
| API Client | Axios | HTTP requests | - Request/response interceptors<br>- Error handling<br>- Request cancellation<br>- TypeScript support |
| Real-Time | Socket.IO | WebSocket communication | - Real-time updates<br>- Event-based communication<br>- Fallback mechanisms<br>- Room management |
| Forms | React Hook Form + Zod | Form handling | - Form validation<br>- Schema validation<br>- Performance optimization<br>- Type safety |
| Testing | Vitest + Playwright | Testing framework | - Unit testing<br>- E2E testing<br>- Component testing<br>- Visual regression |
| i18n | i18next | Internationalization | - Multi-language support<br>- RTL support<br>- Dynamic loading<br>- Pluralization |
| PWA | Workbox | Offline support | - Service workers<br>- Offline caching<br>- Push notifications<br>- Background sync |
| Linting | ESLint + Prettier | Code quality | - TypeScript rules<br>- Code formatting<br>- Best practices<br>- Auto-fixing |
| Component Dev | Storybook | UI development | - Component documentation<br>- Visual testing<br>- Accessibility testing<br>- Responsive testing |
| Analytics | PostHog | User tracking | - Event tracking<br>- User analytics<br>- Funnel analysis<br>- A/B testing |

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "redux": "^5.0.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "react-router-dom": "^6.0.0",
    "tailwindcss": "^3.0.0",
    "axios": "^1.0.0",
    "socket.io-client": "^4.0.0",
    "react-hook-form": "^7.0.0",
    "zod": "^3.0.0",
    "i18next": "^23.0.0",
    "workbox-core": "^7.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "playwright": "^1.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "storybook": "^7.0.0",
    "@storybook/react": "^7.0.0",
    "@storybook/testing-library": "^0.2.0"
  }
}
```

### Development Tools

1. **IDE & Editor**
   - VS Code with recommended extensions
   - TypeScript support
   - ESLint integration
   - Prettier formatting

2. **Version Control**
   - Git for source control
   - GitHub for repository hosting
   - Conventional commits
   - Branch protection rules

3. **CI/CD**
   - GitHub Actions for automation
   - Automated testing
   - Build verification
   - Deployment pipelines

4. **Monitoring**
   - Error tracking
   - Performance monitoring
   - User analytics
   - Real-time logging

### Environment Setup

1. **Development**
   ```bash
   npm install
   npm run dev
   ```

2. **Testing**
   ```bash
   npm run test        # Unit tests
   npm run test:e2e    # E2E tests
   npm run storybook   # Component development
   ```

3. **Building**
   ```bash
   npm run build      # Production build
   npm run preview    # Preview production build
   ```

4. **Linting**
   ```bash
   npm run lint       # Check code style
   npm run format     # Format code
   ```

## Implementation Roadmap 

### Phase 1: Design System Foundation (Sprint 1-2)
**Goal**: Establish a robust, accessible, and consistent design system

1. **Design Tokens & Theme System (`src/styles/`)**
   - Color palette with semantic naming
   - Typography scale and font system
   - Spacing and layout tokens
   - Animation presets
   - Responsive breakpoints

2. **Atomic Components (`src/common/components/`)**
   - **Atoms** (30+ components)
     - `Button.tsx` (Primary, Secondary, Icon variants)
     - `Input.tsx` (Text, Select, Checkbox, Radio)
     - `Icon.tsx` (SVG icon system)
     - `Typography.tsx` (Headings, Body, Labels)
     - `Avatar.tsx` (User avatar with fallback)
     - `Tag.tsx` (Filter tags, status indicators)
     - `ProgressBar.tsx` (Loading, completion indicators)
   
   - **Molecules**
     - `ProfileHeader.tsx` (Name + Basic Info)
     - `FilterGroup.tsx` (Collapsible filter sections)
     - `ActionBar.tsx` (Profile action buttons)
     - `PreferenceRow.tsx` (Education/occupation display)
     - `ChatBubble.tsx` (Message bubbles with status)

3. **Storybook Setup (`src/stories/`)**
   - Configure Storybook with accessibility addons
   - Set up Chromatic for visual regression testing
   - Create component documentation
   - Implement component stories for all atoms and molecules

### Phase 2: Core Application Infrastructure (Sprint 3)
**Goal**: Set up robust application infrastructure

1. **Authentication System (`src/features/auth/`)**
   - JWT-based authentication
   - Token rotation mechanism
   - Secure storage implementation
   - Session management

2. **State Management (`src/stores/`)**
   - Zustand store configuration
   - React Query setup
   - Optimistic UI middleware
   - Global state architecture

3. **API Infrastructure (`src/services/`)**
   - Axios instance with interceptors
   - Error handling middleware
   - Request/response transformers
   - Caching strategies

4. **Internationalization (`src/assets/locales/`)**
   - i18next configuration
   - RTL language support
   - Translation management
   - Language detection

5. **Error Tracking (`src/services/error/`)**
   - Sentry integration
   - Error boundary implementation
   - Error logging service
   - Performance monitoring

### Phase 3: Feature Development (Sprint 4-6)
**Goal**: Implement core features following DDD principles

1. **Match Discovery (`src/features/matches/`)**
   - Vedic compatibility scoring
   - Advanced search filters
   - Real-time updates
   - Match recommendations

2. **Real-time Features**
   - Chat system with E2E encryption
   - Connection management
   - Push notifications
   - Presence indicators

3. **Profile Management (`src/features/profile/`)**
   - Image optimization
   - Rich text editor
   - Privacy controls
   - Profile verification

4. **Vedic Integration (`src/lib/vedic-calculations/`)**
   - Horoscope matching
   - Compatibility algorithms
   - Vedic profile analysis
   - Match suggestions

### Phase 4: Performance & Optimization (Sprint 7)
**Goal**: Enhance user experience and performance

1. **Bundle Optimization**
   - Code splitting
   - Tree shaking
   - Dynamic imports
   - Bundle analysis

2. **PWA Implementation (`src/pwa/`)**
   - Service worker setup
   - Offline capabilities
   - Background sync
   - Push notifications

3. **Caching Strategy**
   - API data caching
   - Asset caching
   - State persistence
   - Offline data sync

4. **Asset Optimization**
   - Image optimization
   - Font loading
   - SVG optimization
   - Resource hints

### Phase 5: Quality Assurance & Launch (Sprint 8)
**Goal**: Ensure production readiness

1. **Testing Coverage**
   - Unit tests (90%+ coverage)
   - Integration tests
   - E2E tests for critical paths
   - Visual regression tests

2. **Accessibility**
   - WCAG 2.1 AA compliance
   - Screen reader testing
   - Keyboard navigation
   - Color contrast

3. **Performance**
   - Lighthouse optimization
   - Core Web Vitals
   - Bundle size monitoring
   - Load time optimization

4. **Security**
   - Penetration testing
   - Security audit
   - Dependency scanning
   - CSP implementation

## Key Metrics & Success Criteria

### Performance
- Lighthouse score > 90 for all core pages
- FCP < 1.2s, TTI < 3.5s on 3G networks
- Bundle size < 150kb (gzipped) for main entry

### Stability
- Error rate < 0.1% of sessions
- Automated test coverage > 80%
- Critical bug resolution < 24 hours

### Engagement
- PWA install rate > 15% of MAU
- Notification opt-in > 40% of users
- Average session duration > 8 minutes

### Quality
- WCAG 2.1 AA compliance
- Zero high-severity security vulnerabilities
- < 5% regression rate on releases

## Best Practices & Standards

### 1. Component Development
- Single Responsibility Principle
- Minimal required props with defaults
- Composition over inheritance
- Performance optimization

### 2. State Management
- State colocation
- Derived state computation
- React Query for server state
- Optimistic updates

### 3. Testing Strategy
- 70/20/10 test pyramid
- User-centric testing
- Visual regression testing
- Performance monitoring

### 4. Performance Optimization
- Route-based code splitting
- Lazy loading
- SWR caching pattern
- Bundle analysis

### 5. Security Practices
- Zod schema validation
- XSS protection
- Strict CSP
- Secure authentication

### 6. Accessibility Standards
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
## Continuous Improvement Process

### Bi-Weekly Architecture Reviews
- Technical debt evaluation
- Optimization opportunities
- Technology adoption review

### Performance Monitoring
- Real User Monitoring (RUM)
- Performance budgets
- Automated Lighthouse checks

### Feedback Loops
- User analytics
- Error tracking
- UX research

### Incremental Modernization
- React feature adoption
- PWA enhancement
- Dependency updates

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Run tests: `npm test`
5. Build for production: `npm run build`

## Contributing

1. Follow the folder structure
2. Write tests for new features
3. Update documentation
4. Follow the coding standards
5. Submit PRs with proper descriptions

## Component Organization: Best Practices

### Shared vs. App-level Components

- **`src/common/components/`**
  - **Purpose:** Shared, reusable UI components and design system elements (e.g., buttons, cards, modals, animations).
  - **Usage:** For any component used across multiple features/pages, or as part of the design system/atomic design (atoms, molecules, organisms).
  - **Example:**
    - `src/common/components/Button/`
    - `src/common/components/animations/SwiperCard/`

- **`src/components/`**
  - **Purpose:** App-level, global, or shell components (e.g., AppHeader, AppFooter, layout wrappers, providers).
  - **Usage:** For components that are not feature-specific and are used at the application shell level.
  - **Example:**
    - `src/components/AppHeader/`
    - `src/components/AppFooter/`

- **Feature-specific components:**
  - **Purpose:** Components only used within a single feature/module.
  - **Usage:** Place inside the relevant feature folder.
  - **Example:**
    - `src/features/profile/components/ProfileCard/`

### Best Practice
- **Prefer `common/components` for shared UI and design system elements.**
- **Use `components` only for global/app shell components.**
- **Use `features/featureName/components` for feature-specific UI.**

### How to Create a New Shared Component

Example for a new `Alert` component:
```sh
mkdir -p src/common/components/Alert
# Add files:
touch src/common/components/Alert/Alert.tsx
# (optional) styles and index
```

### Summary Table

| Use case                | Location                                      |
|-------------------------|-----------------------------------------------|
| Shared UI/Design System | `src/common/components/ComponentName/`        |
| Feature-specific        | `src/features/featureName/components/`        |
| App shell/global        | `src/components/ComponentName/`               |

---

**Follow this structure to keep your codebase organized, maintainable, and scalable.**

