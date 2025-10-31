import React from 'react';

import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Lightbulb,
  Sparkles,
  Target,
} from 'lucide-react';

import AIChatBox from 'containers/common/AIChatBox.tsx';

const EssayEditorAIChat = () => {
  return (
    <AIChatBox
      firstMessage="Hi! I'm your AI writing assistant. I can help you improve your essay, check grammar, generate ideas, or create an outline. What would you like help with?"
      suggestedPrompts={[
        {
          icon: Sparkles,
          text: 'Help me improve this paragraph',
          category: 'improve',
        },
        {
          icon: Lightbulb,
          text: 'Give me ideas for my next paragraph',
          category: 'ideas',
        },
        {
          icon: CheckCircle,
          text: 'Check my grammar and style',
          category: 'grammar',
        },
        {
          icon: BookOpen,
          text: 'Create an outline for this essay',
          category: 'outline',
        },
        {
          icon: Target,
          text: 'How can I strengthen my argument?',
          category: 'argument',
        },
        {
          icon: AlertCircle,
          text: 'What should I focus on to improve?',
          category: 'feedback',
        },
      ]}
    />
  );
};

export default EssayEditorAIChat;
