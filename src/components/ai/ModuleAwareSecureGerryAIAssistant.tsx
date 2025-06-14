
import { GerryAIAssistantProps } from './types';
import { useSecureGerryAI } from '@/hooks/useSecureGerryAI';
import { useModuleContext } from '@/contexts/ModuleContext';
import { SecureGerryFloatingButton } from './SecureGerryFloatingButton';
import { SecureGerryChat } from './SecureGerryChat';

export const ModuleAwareSecureGerryAIAssistant = ({ 
  language, 
  businessContext, 
  onFormAutofill, 
  onDocumentRequest 
}: GerryAIAssistantProps) => {
  const {
    messages,
    inputText,
    setInputText,
    isTyping,
    isExpanded,
    setIsExpanded,
    messagesEndRef,
    userProfile,
    businesses,
    isLoading,
    error,
    handleSendMessage,
    handleSuggestionClick
  } = useSecureGerryAI({ language, businessContext });

  const { 
    installedModules, 
    userSubscription, 
    isLoading: modulesLoading 
  } = useModuleContext();

  // Don't render if no valid user context or modules are loading
  if (isLoading || modulesLoading || error || !userProfile) {
    return null;
  }

  const enhancedBusinessCount = businesses.length;
  const moduleCount = installedModules.filter(m => m.config.enabled).length;

  if (!isExpanded) {
    return (
      <SecureGerryFloatingButton 
        businessCount={enhancedBusinessCount}
        onExpand={() => setIsExpanded(true)}
      />
    );
  }

  return (
    <SecureGerryChat
      language={language}
      messages={messages}
      inputText={inputText}
      isTyping={isTyping}
      userProfile={userProfile}
      businesses={businesses}
      messagesEndRef={messagesEndRef}
      onClose={() => setIsExpanded(false)}
      onSendMessage={handleSendMessage}
      onInputChange={setInputText}
      onSuggestionClick={handleSuggestionClick}
    />
  );
};
