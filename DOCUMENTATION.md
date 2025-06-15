
# Permitoria - Project Documentation

**Current Date:** 2025-06-15

## 1. Project Overview

Permitoria is a comprehensive web application designed to simplify the complex process of obtaining and managing business permits in Puerto Rico. It acts as a "knowledgeable friend" for entrepreneurs, helping them navigate government bureaucracy with confidence.

### Value Proposition
- **Discover Before Investing:** Identify potential zoning issues, required permits, and associated costs *before* significant financial commitment.
- **Centralized Management:** A single dashboard to manage business profiles, track permit applications, and handle compliance.
- **AI-Powered Guidance:** A smart assistant provides personalized recommendations and answers questions about the permitting process.
- **Modular & Extensible:** A robust module system allows for the integration of specific permit types (like the "Permiso Único") and other business services.
- **Bilingual Support:** Fully functional in both Spanish and English to cater to the local business community.

---

## 2. System Architecture

The application is a modern single-page application (SPA) built with React, Vite, and TypeScript. It follows a component-based architecture with a clear separation of concerns.

- **Frontend:** Built with React and TypeScript. UI is crafted using Tailwind CSS and the `shadcn/ui` component library.
- **Routing:** Handled by `react-router-dom`, with different routes for the landing page, authentication, dashboard, and wizards.
- **State Management:** A combination of React's built-in state (`useState`, `useEffect`), context providers (`UserContextProvider`, `ModuleContextProvider`), and `@tanstack/react-query` for server state and caching.
- **Business Logic & Services:** Core logic is encapsulated in the `src/services` directory. This includes the `PermitDiscoveryEngine` for analyzing business requirements and the `ModuleRegistryCore` for managing extensible modules.
- **Data:** Static data (e.g., government agencies, municipalities) is stored in `src/data`. User and business data is managed through hooks and contexts, simulating a backend interaction.
- **Styling:** Primarily utility-first CSS with Tailwind CSS, ensuring a consistent and responsive design.

---

## 3. Key Components & Modules

The codebase is organized into several key directories within `src/`.

### `src/pages`
This directory contains the top-level components for each route in the application.
- `Index.tsx`: The main landing page, which includes the hero section, feature cards, and the entry point to the `EnhancedPermitDiscoveryWizard`.
- `Dashboard.tsx`: The main dashboard view for authenticated users. The logic in `PermitoriaApp.tsx` handles rendering different views like the dashboard, wizard, etc.
- `Login.tsx`, `Signup.tsx`, etc.: Pages related to the authentication flow.

### `src/components`
Contains reusable UI components. This is the largest and most diverse directory.
- **`wizard/` & `permit-wizard/`**: Components for the business setup and permit discovery wizards. These guide the user through a series of steps to collect information.
    - `PermitWizardContainer.tsx`: The main container that manages the state and flow of the permit discovery wizard.
- **`dashboard/`**: Components that make up the user's main dashboard after logging in.
- **`modules/`**: A critical directory for the application's extensibility.
    - `permiso-unico/`: A complete implementation of a module for the "Permiso Único". It includes its own forms, status trackers, and logic.
- **`app/`**: High-level application shell components like `AppHeader.tsx` and `WelcomeSection.tsx`.
- **`auth/`**: Components for the authentication flow, including login forms and buttons.
- **`ui/`**: The `shadcn/ui` components, which form the design system's foundation.

### `src/services`
This is where the core business logic resides, decoupled from the UI.
- **`permitDiscovery/`**: Contains the `PermitDiscoveryEngine` and its analyzers (`PermitAnalyzer`, `ComplianceAnalyzer`, etc.). This engine takes a business profile and determines required permits, potential issues, costs, and timelines.
- **`modules/`**: Manages the application's module system.
    - `moduleRegistryCore.ts`: The central registry for all modules.
    - `permisoUnicoModule.ts`: Defines the metadata and creation logic for the "Permiso Único" module.
    - `permisoUnicoBusinessLogic.ts`: Contains validation and other business rules specific to the Permiso Único application.

### `src/hooks`
Contains custom React hooks for shared, stateful logic.
- `usePermitoriaState.ts`: A central hook that manages the main application state, such as the current user, active view, and business data.
- `useModuleSystem.ts`: Hook to initialize and interact with the module system.

### `src/contexts`
Provides state to component trees using React's Context API.
- `UserContextProvider.tsx`: Provides user-specific data throughout the application.
- `ModuleContextProvider.tsx`: Makes the module system's state and functions available to components.

---

## 4. User Flows

### A. New User - Permit Discovery
1.  A new user lands on the `Index.tsx` page.
2.  They click "Start Free Analysis" which launches the `EnhancedPermitDiscoveryWizard` (`PermitWizardContainer.tsx`).
3.  The wizard guides them through several steps, collecting information about their business (`BusinessWizardStep1`, `BusinessWizardStep2`).
4.  The `PermitDiscoveryEngine` is invoked with the collected `BusinessProfile`.
5.  The engine analyzes requirements and produces a `PermitDiscoveryResult`.
6.  The user is shown a detailed results page with required permits, estimated costs, and potential compliance issues.

### B. Registered User - Business & Permit Management
1.  A user logs in via the `AuthenticationFlow`.
2.  `PermitoriaApp.tsx` handles the authenticated state and displays the main dashboard view.
3.  If the user has no businesses, they are prompted to start the `EnhancedBusinessWizard` to create one.
4.  Once a business is created, it appears in the `BusinessesSection` on the dashboard.
5.  The user can click to view business details, which will render a view with module-driven components. For instance, if the "Permiso Único" is relevant, the `PermisoUnicoComponent` will be rendered, allowing the user to fill out the application, upload documents, and track its status.

---

## 5. Development Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    The project uses `bun` as the package manager.
    ```bash
    bun install
    ```

3.  **Run the development server:**
    ```bash
    bun run dev
    ```

4.  **Open the application:**
    Navigate to `http://localhost:5173` (or the port specified in the console) in your web browser.

---

## 6. Key Dependencies

- **React & Vite:** Core framework and build tool.
- **TypeScript:** For static typing and improved code quality.
- **Tailwind CSS:** For utility-first styling.
- **`shadcn/ui`:** A collection of beautifully designed, accessible UI components.
- **`@tanstack/react-query`:** For managing server state, caching, and data fetching.
- **`react-router-dom`:** For client-side routing.
- **`lucide-react`:** For icons.
- **`zod`:** For schema validation.

