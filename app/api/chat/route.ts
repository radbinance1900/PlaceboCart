import { Groq } from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    // Add system context for shopping assistant
    const systemMessage = {
      role: 'system',
      content: `You are a helpful shopping assistant for PlaceboCart, a premium neobrutalist e-commerce platform. 
      You help customers with product information, shopping cart assistance, checkout questions, and general inquiries.
      Keep your responses concise and friendly. Use a conversational tone.
      Current products available: iPhone 16 Pro Max, Rolex Submariner, Nike Air Jordan 1 Retro High, PlayStation 5 Pro, MacBook Pro 16, AirPods Pro Max, Canon EOS R5, DJI Air 3S.
      Remember: All items are priced at ₹0 with a 100% PlaceboCart Coupon!`,
    }

    const allMessages = [
      systemMessage,
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    ]

    const completion = await groq.chat.completions.create({
      messages: allMessages as any,
      model: 'mixtral-8x7b-32768',
      max_tokens: 500,
      temperature: 0.7,
    })

    const aiResponse =
      completion.choices[0]?.message?.content || 'Unable to generate response'

    return NextResponse.json({
      role: 'assistant',
      content: aiResponse,
    })
  } catch (error) {
    console.error('[v0] Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
