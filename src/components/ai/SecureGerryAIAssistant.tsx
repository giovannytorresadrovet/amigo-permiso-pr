
import { GerryAIAssistantProps } from './types';
import { useSecureGerryAI } from '@/hooks/useSecureGerryAI';
import { SecureGerryFloatingButton } from './SecureGerryFloatingButton';
import { SecureGerryChat } from './SecureGerryChat';

export const SecureGerryAIAssistant = ({ 
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

  // Don't render if no valid user context
  if (isLoading || error || !userProfile) {
    return null;
  }

  if (!isExpanded) {
    return (
      <SecureGerryFloatingButton 
        businessCount={businesses.length}
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
