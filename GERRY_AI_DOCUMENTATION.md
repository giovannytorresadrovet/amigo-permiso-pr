
# Gerry AI Assistant - Technical Documentation

**Current Date:** 2025-06-15

## 1. Overview

**Gerry** is an advanced, secure, and module-aware AI assistant integrated into the Permitoria platform. Its primary role is to provide personalized, context-aware support to users regarding their business permits, documents, and compliance status. Gerry is designed with a "security-first" principle, ensuring that all interactions are private and user data is handled with strict access controls.

There are two main implementations of Gerry:
1.  **`SecureGerryAIAssistant`**: The standard, secure implementation.
2.  **`ModuleAwareSecureGerryAIAssistant`**: An enhanced version that leverages the application's module system to provide more powerful and context-specific capabilities.

A simpler, non-contextual AI is also used in the public-facing `PermitDiscoveryAI` component, but this document focuses on the authenticated "Gerry" assistant.

---

## 2. System Architecture & Key Components

The Gerry AI system is built on a decoupled, component-based architecture. The logic is separated from the UI, and security is a core layer that wraps all data handling.

### Key Files:
-   **UI Components**:
    -   `src/components/ai/SecureGerryAIAssistant.tsx`: The primary entry point and container for the standard secure AI.
    -   `src/components/ai/ModuleAwareSecureGerryAIAssistant.tsx`: The entry point for the module-aware AI.
    -   `src/components/ai/SecureGerryChat.tsx`: The main chat interface component.
    -   `src/components/ai/SecureGerryFloatingButton.tsx`: The floating action button to open the chat.
-   **Core Logic (Hooks)**:
    -   `src/hooks/useSecureGerryAI.tsx`: The central hook that manages the AI's state, including messages, user input, typing status, and communication with the response generation logic.
-   **Response Generation**:
    -   `src/components/ai/secureResponseGenerator.ts`: The main function that orchestrates secure response generation.
    -   `src/components/ai/moduleAwareSecureResponseGenerator.ts`: The enhanced generator for the module-aware assistant.
    -   `src/components/ai/responses/responseCoordinator.ts`: A key class that analyzes the user's message and delegates the response generation to the appropriate specialized generator.
-   **Security**:
    -   `src/components/ai/security/userDataValidator.ts`: A critical security class responsible for validating the user's context and fetching user-specific data securely.
    -   `src/lib/security/auditLogger.ts`: Logs all significant AI interactions for security and auditing purposes.
-   **Module Integration**:
    -   `src/services/modules/aiModuleAwarenessService.ts`: A service that enables the AI to understand the capabilities of installed modules, recommend new ones, and suggest module-specific actions.

---

## 3. Security and Data Handling

Security is the most critical aspect of the Gerry AI assistant. The entire system is designed to prevent data leakage and ensure that the AI only accesses data it is explicitly permitted to.

1.  **Strict Context Validation**:
    -   The `UserDataValidator.validateUserContext` method is called at the beginning of every request to ensure a valid and secure user session.
    -   It throws a security violation error if the context is invalid, immediately halting the process.

2.  **Scoped Data Fetching**:
    -   The `UserDataValidator.getUserDataContext` method fetches data (like permits and documents) and then **filters it** to ensure it only contains information related to the businesses owned by the current user. This prevents any possibility of cross-user data access.

3.  **Audit Logging**:
    -   The `AuditLogger` is used to log all important events, such as AI initialization, query submission, and security errors. This provides a clear trail of all AI activities.

4.  **No Direct Data Access from UI**:
    -   The UI components and the `useSecureGerryAI` hook do not fetch data directly. They pass a secure `userContext` to the backend logic, which is then responsible for all data handling.

---

## 4. Response Generation Flow

The response generation is a multi-step process designed to be both intelligent and secure.

**For `ModuleAwareSecureGerryAIAssistant`:**

1.  **User Input**: The user sends a message through the `SecureGerryChat` UI.
2.  **Hook Handling**: `useSecureGerryAI` captures the message, updates the state, and calls `generateModuleAwareSecureGerryResponse`.
3.  **Security Validation**: `UserDataValidator` validates the context and logs the interaction.
4.  **Module-Aware Analysis**:
    -   `AIModuleAwarenessService` is invoked to analyze the user's query against the capabilities of installed modules.
    -   It identifies potential actions the AI can perform using modules and also recommends new modules if applicable.
5.  **Knowledge Base Search**: The system performs a parallel search of the public `knowledgeBaseData` to find relevant articles.
6.  **Core Response Coordination**:
    -   `ResponseCoordinator.generateResponse` is called. It analyzes the user's intent (e.g., asking about "permits," "documents," "security").
    -   It delegates to a specialized generator (`PermitsResponseGenerator`, `DocumentsResponseGenerator`, etc.) to create a base response using the securely-fetched `userDataContext`.
7.  **Response Enhancement**: The base response is combined with the insights from the `AIModuleAwarenessService`. Suggestions and actions from both are merged.
8.  **Final Message**: The final, enhanced response is packaged into a `Message` object and sent back to the UI.

---

## 5. Module Integration

The `ModuleAwareSecureGerryAIAssistant` represents the most advanced version of the AI.

-   **`aiModuleAwarenessService.ts`**: This service is the brain behind the module integration.
    -   It maintains a map of module capabilities (e.g., 'advanced-analytics' can 'generate_report').
    -   `canPerformAction`: Checks if an action requested by the user can be performed by any of the installed and enabled modules.
    -   `generateModuleAwareResponse`: Analyzes the user's query to detect keywords related to specific actions (e.g., "report," "fill form").
    -   `recommendModuleForAction`: If an action is requested but the corresponding module is not installed, it generates a recommendation for the user to install it.

This allows Gerry to be dynamically enhanced. As new modules are installed, Gerry's capabilities automatically expand without needing changes to the core AI logic.

---

## 6. UI Components

-   **`SecureGerryAIAssistant.tsx` / `ModuleAwareSecureGerryAIAssistant.tsx`**: These are the top-level wrappers. They manage the `isExpanded` state and render either the `SecureGerryFloatingButton` or the `SecureGerryChat`. They are responsible for gathering the necessary context (user, business, module) to pass to the `useSecureGerryAI` hook.

-   **`SecureGerryChat.tsx`**: This component renders the full chat window, including the header, messages area (`ChatMessages`), and input bar (`ChatInput`). It displays the user's security context (name and business count) in the header.

-   **`ChatMessages.tsx`**: Renders the list of messages, handling different senders ('user' or 'gerry'), message types (text, articles), and suggestions.

-   **`ChatInput.tsx`**: The text input field and send button for the user.

---

## 7. How to Extend Gerry

### Adding a New Response Topic

1.  **Create a New Generator**: Create a new file in `src/components/ai/responses/`, for example, `yourTopicResponseGenerator.ts`. It should have a static method that takes `userDataContext`, `userContext`, and `language` and returns a string response.
2.  **Update the Coordinator**: In `src/components/ai/responses/responseCoordinator.ts`, add a new `else if` condition to detect keywords for your new topic and call your new generator.
3.  **Add Suggestions**: Add relevant follow-up suggestions to be returned alongside your response.

### Adding New Module Capabilities

1.  **Define Capability**: In `src/services/modules/aiModuleAwarenessService.ts`, add a new entry to the `moduleCapabilities` map or `actionKeywords` map.
2.  **Implement Logic**: Ensure the module itself has the service or component to perform the advertised action.
3.  **Test**: Ask Gerry a question that should trigger the new capability.

