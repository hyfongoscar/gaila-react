import React, { useEffect, useRef, useState } from 'react';

import {
  AlertCircle,
  BookOpen,
  Bot,
  CheckCircle,
  Lightbulb,
  Send,
  Sparkles,
  Target,
  UserIcon,
} from 'lucide-react';

import Card from 'components/display/Card';
import Button from 'components/input/Button';
import TextInput from 'components/input/TextInput';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type Props = {
  chatName?: string;
  description?: string;
  firstMessage?: string;
  suggestedPrompts?: { icon: any; text: string; category: string }[];
  placeholder?: string;
};

const AIChatBox = ({
  chatName,
  description,
  firstMessage,
  suggestedPrompts,
  placeholder,
}: Props) => {
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    firstMessage
      ? [
          {
            id: '1',
            role: 'assistant',
            content: firstMessage,
            timestamp: new Date(),
          },
        ]
      : [],
  );
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Suggested prompts for the chat

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(
      () => {
        const aiResponse = generateAIResponse(message);
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date(),
        };
        setChatMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const generateAIResponse = (userMessage: string): string => {
    const messageLower = userMessage.toLowerCase();

    if (messageLower.includes('improve') || messageLower.includes('better')) {
      return "I can help improve your writing! Here are some suggestions:\n\n1. **Strengthen your thesis**: Make your main argument more specific and clear.\n\n2. **Add evidence**: Include more data and examples to support your claims about climate change.\n\n3. **Use transitions**: Connect your paragraphs with transitional phrases like 'Furthermore' or 'In addition' for better flow.\n\n4. **Vary sentence structure**: Mix short, impactful sentences with longer, detailed ones.\n\nWould you like me to rewrite a specific section?";
    } else if (
      messageLower.includes('idea') ||
      messageLower.includes('topic')
    ) {
      return 'Here are some ideas to enhance your climate change essay:\n\n• **Economic impacts**: Discuss how climate change affects agriculture, insurance, and global trade\n\n• **Social justice angle**: Explore how climate change disproportionately affects vulnerable communities\n\n• **Technological solutions**: Examine innovations in carbon capture, renewable energy, and sustainable agriculture\n\n• **Policy examples**: Analyze successful climate policies from different countries\n\n• **Future scenarios**: Compare best-case and worst-case climate projections\n\nWhich direction interests you most?';
    } else if (
      messageLower.includes('grammar') ||
      messageLower.includes('check')
    ) {
      return "I've reviewed your essay for grammar and style. Here are the main points:\n\n✓ **Good**: Your sentence structure is clear and your paragraphs flow well.\n\n**Suggestions**:\n1. Consider using more active voice instead of passive constructions\n2. Some sentences could be more concise - watch for redundancy\n3. Vary your vocabulary - you use 'impact' and 'effects' frequently\n\nYour writing is strong overall! Would you like specific examples of where to apply these improvements?";
    } else if (messageLower.includes('outline')) {
      return "Here's a suggested outline for your climate change essay:\n\n**I. Introduction**\n- Hook: Recent climate event or statistic\n- Background on climate science\n- Thesis: Climate change requires urgent action\n\n**II. Causes**\n- Greenhouse gas emissions\n- Deforestation\n- Industrial activities\n\n**III. Environmental Impacts**\n- Temperature rise\n- Extreme weather\n- Ecosystem changes\n\n**IV. Social & Economic Effects**\n- Displacement & migration\n- Economic costs\n- Health impacts\n\n**V. Solutions**\n- Renewable energy\n- Policy changes\n- Individual actions\n\n**VI. Conclusion**\n- Summarize urgency\n- Call to action\n\nDoes this structure work for you?";
    } else if (
      messageLower.includes('argument') ||
      messageLower.includes('strengthen')
    ) {
      return "To strengthen your argument:\n\n1. **Add counterarguments**: Address climate skeptics' points and refute them with evidence\n\n2. **Use specific data**: Replace general statements with concrete statistics (e.g., 'CO2 levels have increased by 50% since 1750')\n\n3. **Include expert quotes**: Cite climate scientists and authoritative sources\n\n4. **Show causation**: Clearly link human activities to specific climate effects\n\n5. **Provide examples**: Use case studies from different regions to show global impact\n\nWould you like help incorporating any of these into your essay?";
    } else {
      return "I'm here to help with your essay! I can:\n\n• **Improve your writing** - Make your text clearer and more impactful\n• **Generate ideas** - Suggest topics and angles for your essay\n• **Check grammar** - Review for errors and style improvements\n• **Create outlines** - Structure your essay effectively\n• **Strengthen arguments** - Help you build more convincing points\n\nWhat would you like to work on?";
    }
  };

  const handlePromptClick = (promptText: string) => {
    setChatInput(promptText);
  };

  return (
    <Card
      classes={{
        root: 'flex flex-col h-[calc(100vh-200px)] !p-4',
        title: 'flex items-center gap-2 text-base',
        children: 'flex flex-col flex-1 p-0 overflow-hidden',
      }}
      description={description}
      title={
        <>
          <Bot className="h-4 w-4 text-primary" />
          {chatName || 'AI Assistant'}
        </>
      }
    >
      <div
        className="flex-1 overflow-y-auto px-4 py-3 space-y-4"
        ref={chatScrollRef}
      >
        {chatMessages.map(message => (
          <div
            className={`flex gap-2 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
            key={message.id}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                <UserIcon className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="bg-muted rounded-lg px-3 py-2">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!!suggestedPrompts?.length && (
        <div className="py-2 border-t">
          <p className="text-xs text-muted-foreground mb-2">Suggested:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <Button
                className="gap-1 text-xs h-auto py-1.5 justify-start"
                key={index}
                onClick={() => handlePromptClick(prompt.text)}
                size="sm"
                variant="outline"
              >
                <prompt.icon className="h-3 w-3 flex-shrink-0" />
                <span className="truncate text-left">{prompt.text}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="py-3 border-t">
        <div className="flex gap-2">
          <TextInput
            className="text-sm"
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(chatInput);
              }
            }}
            placeholder={placeholder || 'Ask anything...'}
            value={chatInput}
          />
          <Button
            disabled={!chatInput.trim() || isTyping}
            onClick={() => handleSendMessage(chatInput)}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChatBox;
