import React from 'react';

import dayjs, { type Dayjs } from 'dayjs';
import { Bot, UserIcon } from 'lucide-react';

import type { GptLog } from 'types/gpt';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Dayjs;
}

export const gptResponseToChatMessage = (log: GptLog): ChatMessage => {
  return {
    id: String(log.id),
    role: 'assistant',
    content: log.gpt_answer,
    timestamp: dayjs(log.gpt_response_time),
  };
};

export const gptLogToChatMessages = (log: GptLog): ChatMessage[] => {
  return [
    {
      id: `${log.id}-user`,
      role: 'user',
      content: log.user_question,
      timestamp: dayjs(log.user_ask_time),
    },
    {
      id: `${log.id}-assistant`,
      role: 'assistant',
      content: log.gpt_answer,
      timestamp: dayjs(log.gpt_response_time),
    },
  ];
};

const formatChatMessage = (text: string) => {
  return text.replace(/<br\s*\/?>/gi, '\n');
};

export const renderGptLog = (log: GptLog) => {
  return gptLogToChatMessages(log).map(renderChatMessage);
};

export const renderChatMessage = (message: ChatMessage) => {
  return (
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
        <div className="whitespace-pre-wrap">
          {formatChatMessage(message.content)}
        </div>
      </div>
      {message.role === 'user' && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
          <UserIcon className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};
