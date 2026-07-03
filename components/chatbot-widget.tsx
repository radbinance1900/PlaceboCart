'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m the Placebo Assistant AI. How can I help you with your shopping today?',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = { role: 'user' as const, content: inputValue }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages((prev) => [...prev, data])
    } catch (error) {
      console.error('[v0] Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-[#FDFBF7] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none flex flex-col">
          {/* Header */}
          <div className="bg-[#1A4454] border-b-4 border-black px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#00FF87] rounded-full border-2 border-black animate-pulse" />
              <span className="font-black text-[#FDFBF7] uppercase text-sm">
                Placebo Assistant AI
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-[#00FF87] hover:text-[#1A4454] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80 bg-[#FDFBF7]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 border-2 border-black rounded-none ${
                    msg.role === 'user'
                      ? 'bg-[#FDFBF7] text-[#1A1A1A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-[#1A4454] text-[#FDFBF7] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <p className="text-sm font-sans">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1A4454] text-[#FDFBF7] px-4 py-2 border-2 border-black rounded-none">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-black p-3 bg-[#FDFBF7] flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
className="flex-1 px-3 py-2 bg-white text-black border-2 border-black font-sans text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#1A4454]"              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="px-3 py-2 bg-[#00FF87] border-2 border-black font-black text-[#1A1A1A] text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button with Speech Bubble */}
      <div className="flex items-center gap-3">
        {/* Speech Bubble */}
        {!isOpen && (
          <div className="bg-[#FDFBF7] border-2 border-black px-4 py-2 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
            <p className="font-black text-[#1A1A1A] text-sm uppercase">Need help?</p>
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#00FF87] border-2 border-black rounded-full flex items-center justify-center font-black text-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  )
}
