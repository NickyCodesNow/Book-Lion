import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { description, style } = await request.json()

    if (!description) {
      return NextResponse.json(
        { error: 'Character description is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Create a detailed prompt for DALL-E
    const prompt = `Create a children's book character illustration: ${description}. 
    Style: ${style || 'childrens book illustration style'}. 
    The character should be friendly, colorful, and suitable for children. 
    Use bright, engaging colors and a clean, simple art style. 
    The character should be the main focus of the image with a simple background.`

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    })

    const imageUrl = response.data[0]?.url

    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI')
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Error generating character:', error)
    return NextResponse.json(
      { error: 'Failed to generate character' },
      { status: 500 }
    )
  }
}

