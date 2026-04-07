import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, User, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  'What are the best pig breeds for small farms?',
  'How do I manage crop rotation effectively?',
  'What vaccines do piglets need?',
  'How to reduce livestock feed costs?',
];

const responses: Record<string, string> = {
  default: "I'm the AgriHerd AI Assistant. I can help with questions about livestock management, crop planning, disease prevention, and farm operations. This is a demo — full AI responses will be available in the production version.",
  pig: "For pig farming, consider breeds like Large White, Landrace, or Duroc depending on your goals. Ensure proper housing with adequate ventilation, maintain vaccination schedules, and track breeding cycles for optimal productivity.",
  crop: "Effective crop rotation improves soil health and reduces pest pressure. Alternate between nitrogen-fixing legumes and cereals. Plan 3-4 year rotation cycles and keep detailed records of each field's history.",
  vaccine: "Piglets typically need vaccines for Erysipelas, Parvovirus, and Mycoplasma. Consult your local veterinarian for a vaccination schedule tailored to diseases prevalent in your region.",
  feed: "To reduce feed costs: buy in bulk during harvest season, grow your own supplementary feeds like sweet potatoes or Napier grass, and optimize feed conversion ratios through proper nutrition balancing.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('pig') || lower.includes('breed')) return responses.pig;
  if (lower.includes('crop') || lower.includes('rotation')) return responses.crop;
  if (lower.includes('vaccine') || lower.includes('vaccin')) return responses.vaccine;
  if (lower.includes('feed') || lower.includes('cost')) return responses.feed;
  return responses.default;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: "Hello! I'm your AgriHerd AI Assistant. Ask me anything about farming, livestock, crops, or farm management." },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msg };
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: getResponse(msg) };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <h2 className="text-2xl font-bold text-foreground mb-4">AI Assistant</h2>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2"><Lightbulb className="h-3 w-3" /> Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(s => (
                <Button key={s} variant="outline" size="sm" className="text-xs" onClick={() => handleSend(s)}>{s}</Button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t flex gap-2">
          <Input placeholder="Ask about farming, livestock, crops..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1" />
          <Button onClick={() => handleSend()} disabled={!input.trim()}><Send className="h-4 w-4" /></Button>
        </div>
      </Card>
    </div>
  );
}
