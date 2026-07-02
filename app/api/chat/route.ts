import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const completion = await groq.chat.completions.create({
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      model: 'mixtral-8x7b-32768',
      max_tokens: 1024,
      temperature: 0.7,
      system: `You are the Placebo Assistant, a helpful shopping assistant for PlaceboCart - a premium e-commerce platform offering luxury items at ₹0 prices. You help customers with:
- Product recommendations
- Shopping cart assistance
- Order tracking
- General shopping questions
- Information about our placebo pricing model

Be friendly, concise, and helpful. Keep responses short (1-2 sentences when possible). You have access to our product catalog including iPhones, Rolexes, luxury sneakers, gaming consoles, and more. Always maintain the fun, playful tone of PlaceboCart.`,
    })

    const assistantMessage = completion.choices[0]?.message?.content || 'I apologize, I could not process that request.'

    return NextResponse.json({
      role: 'assistant',
      content: assistantMessage,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
