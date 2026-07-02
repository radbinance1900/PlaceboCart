'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hey there! 👋 I\'m your Placebo Assistant. How can I help you fulfill your shopping cravings today?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })).concat([userMessage]),
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('[v0] Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Oops! I encountered an issue. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-[#FDFBF7] border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-[#1A4454] border-b-4 border-black px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-[#00FF87] rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <h3 className="font-black text-white uppercase text-sm">Placebo Assistant AI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-black hover:bg-opacity-10 rounded transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FDFBF7]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg border-2 border-black ${
                    message.role === 'user'
                      ? 'bg-[#FDFBF7] border-black text-[#1A1A1A] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-[#1A4454] border-black text-[#FDFBF7] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <p className="text-sm font-medium">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1A4454] border-2 border-black text-[#FDFBF7] px-4 py-3 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#00FF87] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#00FF87] rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-[#00FF87] rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="border-t-4 border-black bg-[#FDFBF7] p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 border-2 border-black font-medium text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF87] focus:ring-offset-2 focus:ring-offset-[#FDFBF7] bg-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-[#00FF87] border-2 border-black font-black text-xs uppercase text-[#1A1A1A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-[#00FF87] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center"
      >
        <MessageCircle className="w-8 h-8 text-[#1A1A1A]" />
      </button>

      {/* Idle Bubble */}
      {!isOpen && (
        <div className="absolute bottom-20 right-0 bg-[#1A4454] border-2 border-black rounded-full px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap text-[#FDFBF7] font-black text-sm animate-pulse">
          Need help?
        </div>
      )}
    </div>
  )
}
