import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  HelpCircle, 
  Bug, 
  FileCode2, 
  CheckCircle, 
  Copy, 
  Check, 
  RefreshCw,
  Terminal,
  Mic,
  MicOff,
  Volume2,
  AlertCircle,
  Radio
} from 'lucide-react';
import { AIMessage } from '../types';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface AITutorWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  initialTopicContext?: string;
}

export const AITutorWidget: React.FC<AITutorWidgetProps> = ({
  isOpen,
  onClose,
  darkMode,
  initialTopicContext,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: initialTopicContext 
        ? `Hello! I'm CodeMaster AI Tutor. I see you're working on "${initialTopicContext}". How can I explain or help you code this topic? You can type or tap the microphone to dictate your question!`
        : 'Hello! I\'m your Gemini 3.6 Flash powered AI Tutor. Ask me any programming question, dictate your prompt aloud, request code debugging, or ask for a custom quiz!',
      timestamp: 'Just now',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [activeMode, setActiveMode] = useState<'chat' | 'explain' | 'debug' | 'quiz' | 'review'>('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check SpeechRecognition browser availability
    const SpeechRecognitionClass =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognitionClass) {
      setSpeechSupported(false);
    }
  }, []);

  // Stop listening when widget is closed
  useEffect(() => {
    if (!isOpen && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
    }
  }, [isOpen]);

  const toggleSpeechRecognition = () => {
    setSpeechError(null);

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechSupported(false);
      setSpeechError('Speech recognition is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      let basePrompt = inputPrompt ? inputPrompt + ' ' : '';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputPrompt(basePrompt + transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setSpeechError('Microphone permission denied. Please allow microphone access in browser settings.');
        } else if (event.error === 'no-speech') {
          setSpeechError('No speech detected. Please speak into your microphone.');
        } else {
          setSpeechError(`Voice input error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setSpeechError('Could not access microphone.');
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  const handleSendMessage = async () => {
    if (!inputPrompt.trim() || isLoading) return;

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
    }

    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: inputPrompt,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const promptToSend = inputPrompt;
    setInputPrompt('');
    setIsLoading(true);

    try {
      let endpoint = '/api/ai/tutor';
      let payload: any = { prompt: promptToSend, contextTopic: initialTopicContext };

      if (activeMode === 'explain') {
        endpoint = '/api/ai/explain';
        payload = { code: promptToSend };
      } else if (activeMode === 'debug') {
        endpoint = '/api/ai/debug';
        payload = { code: promptToSend };
      } else if (activeMode === 'quiz') {
        endpoint = '/api/ai/quiz';
        payload = { topic: promptToSend };
      } else if (activeMode === 'review') {
        endpoint = '/api/ai/code-review';
        payload = { code: promptToSend };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      let replyText = data.reply || data.explanation || data.debugResult || data.review || 'Response generated successfully.';

      if (activeMode === 'quiz' && data.questions) {
        replyText = `### Generated 3-Question Quiz:\n\n` +
          data.questions.map((q: any, i: number) => 
            `**${i + 1}. ${q.question}**\n` +
            q.options.map((opt: string, o: number) => ` - [ ] ${opt}`).join('\n') +
            `\n*Explanation: ${q.explanation}*\n`
          ).join('\n');
      }

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: 'I encountered an issue connecting to the Gemini server. Please try again.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center space-x-1.5">
              <span>CodeMaster AI Tutor</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">Gemini 3.6</span>
            </h3>
            <p className="text-[10px] text-slate-400">Server-side AI Software Engineering Coach</p>
          </div>
        </div>

        <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 p-2 gap-1 overflow-x-auto text-[11px] font-bold">
        {[
          { id: 'chat', label: 'Ask Q&A', icon: HelpCircle },
          { id: 'explain', label: 'Explain Code', icon: FileCode2 },
          { id: 'debug', label: 'Debug Bug', icon: Bug },
          { id: 'quiz', label: 'Quiz Me', icon: CheckCircle },
          { id: 'review', label: 'Code Review', icon: Terminal },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id as any)}
            className={`px-2.5 py-1.5 rounded-lg flex items-center space-x-1 whitespace-nowrap transition-all ${
              activeMode === mode.id
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <mode.icon className="w-3.5 h-3.5" />
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div key={m.id} className={`flex space-x-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-purple-600/30 text-purple-300 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed relative group ${
                isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
              }`}>
                <div className="whitespace-pre-wrap">{m.text}</div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-800/40">
                  <span>{m.timestamp}</span>
                  <button
                    onClick={() => handleCopyMessage(m.id, m.text)}
                    className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
                  >
                    {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-purple-400 p-2 font-mono">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Gemini AI is analyzing code...</span>
          </div>
        )}
      </div>

      {/* Prompt Input Footer with Speech Recognition */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
        
        {/* Active Speech Listening Indicator Banner */}
        {isListening && (
          <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/50 text-purple-200 text-xs flex items-center justify-between animate-pulse">
            <div className="flex items-center space-x-2 font-bold">
              <Radio className="w-4 h-4 text-rose-400 animate-ping" />
              <span>Listening to voice dictation... Speak your question.</span>
            </div>
            <button
              onClick={toggleSpeechRecognition}
              className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-500 text-white"
            >
              STOP
            </button>
          </div>
        )}

        {/* Speech Error Banner */}
        {speechError && (
          <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-[11px] flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{speechError}</span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <textarea
            rows={2}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={
              isListening ? 'Dictating live from microphone...' :
              activeMode === 'explain' ? 'Paste code snippet or dictate to explain...' :
              activeMode === 'debug' ? 'Paste bugged code snippet...' :
              activeMode === 'quiz' ? 'Enter topic for quiz (e.g. React 19 hooks)...' :
              activeMode === 'review' ? 'Paste code for security review...' :
              'Ask or dictate any programming question...'
            }
            className={`flex-1 p-2.5 rounded-xl bg-slate-950 border text-slate-200 text-xs outline-none transition-all resize-none ${
              isListening
                ? 'border-purple-500 ring-2 ring-purple-500/30 bg-purple-950/20'
                : 'border-slate-800 focus:border-purple-500'
            }`}
          />

          {/* Speech Dictation Toggle Button */}
          <button
            onClick={toggleSpeechRecognition}
            type="button"
            title={isListening ? 'Stop voice dictation' : 'Dictate question with voice'}
            className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
              isListening
                ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30 animate-pulse'
                : speechSupported
                ? 'bg-slate-800 hover:bg-slate-700 text-purple-300 border-slate-700 hover:text-white'
                : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          {/* Send Prompt Button */}
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputPrompt.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-50 hover:opacity-90 transition-all shrink-0"
            title="Send prompt to AI Tutor"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
          <span>{speechSupported ? '🎙️ Tap mic icon to dictate questions' : 'Speech recognition unavailable in browser'}</span>
          <span>Press Enter to send</span>
        </div>
      </div>

    </div>
  );
};

