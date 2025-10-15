import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { characterDescription, characterImage, writingSample } = await request.json()

    if (!characterDescription || !characterImage) {
      return NextResponse.json(
        { error: 'Character description and image are required' },
        { status: 400 }
      )
    }

    // Generate story pages based on writing sample and character
    const storyPages = generateStoryPages(characterDescription, writingSample)
    const characterName = extractCharacterName(characterDescription) || "Your Character"
    
    // Create a dynamic title based on whether writing sample was used
    const bookTitle = writingSample 
      ? `${characterName}'s Story` 
      : `The Adventures of ${characterName}`
    
    // For now, we'll return the story structure
    // In a real implementation, you'd generate images for each page
    const bookData = {
      title: bookTitle,
      pages: storyPages,
      characterImage: characterImage,
      generatedAt: new Date().toISOString()
    }

    return NextResponse.json({ book: bookData })
  } catch (error) {
    console.error('Error generating book:', error)
    return NextResponse.json(
      { error: 'Failed to generate book' },
      { status: 500 }
    )
  }
}

function generateStoryPages(characterDescription: string, writingSample?: string): Array<{
  pageNumber: number
  text: string
  illustrationPrompt: string
}> {
  // Extract character name or create a generic one
  const characterName = extractCharacterName(characterDescription) || "the character"
  
  // If there's a writing sample, integrate the character into it
  if (writingSample) {
    return integrateCharacterIntoStory(characterDescription, characterName, writingSample)
  }
  
  // Fallback to default story if no writing sample
  return [
    {
      pageNumber: 1,
      text: `Once upon a time, there was ${characterName}. ${characterDescription}. This is the beginning of an amazing adventure!`,
      illustrationPrompt: `A children's book illustration of ${characterDescription}, bright and colorful, storybook style`
    },
    {
      pageNumber: 2,
      text: `${characterName} decided to go on a journey through the magical forest. The trees were tall and the path was winding, but ${characterName} was brave and curious.`,
      illustrationPrompt: `A magical forest scene with ${characterDescription} walking along a winding path, children's book illustration style`
    },
    {
      pageNumber: 3,
      text: `Along the way, ${characterName} met a friendly talking rabbit who offered to be a guide. "Follow me!" said the rabbit. "I know all the secret paths in this forest."`,
      illustrationPrompt: `A friendly talking rabbit meeting ${characterDescription} in a magical forest, children's book illustration style`
    },
    {
      pageNumber: 4,
      text: `Together, ${characterName} and the rabbit discovered a hidden treasure chest under an old oak tree. The chest was filled with golden coins and magical gems!`,
      illustrationPrompt: `A treasure chest with golden coins and gems, discovered by ${characterDescription} and a rabbit under an oak tree, children's book illustration style`
    },
    {
      pageNumber: 5,
      text: `"This treasure should be shared with everyone!" said ${characterName}. And so they did, bringing joy and magic to all the creatures in the forest.`,
      illustrationPrompt: `A happy scene of ${characterDescription} sharing treasure with forest creatures, children's book illustration style`
    },
    {
      pageNumber: 6,
      text: `From that day forward, ${characterName} was known as the kindest and most generous character in all the land. And they lived happily ever after!`,
      illustrationPrompt: `A beautiful sunset scene with ${characterDescription} looking happy and content, children's book illustration style`
    }
  ]
}

function integrateCharacterIntoStory(characterDescription: string, characterName: string, writingSample: string): Array<{
  pageNumber: number
  text: string
  illustrationPrompt: string
}> {
  console.log('Integrating character into story:')
  console.log('Character name:', characterName)
  console.log('Character description:', characterDescription)
  console.log('Writing sample length:', writingSample.length)
  console.log('Writing sample preview:', writingSample.substring(0, 200) + '...')
  
  // Split the writing sample into sentences
  const sentences = writingSample.split(/[.!?]+/).filter(s => s.trim().length > 0)
  console.log('Number of sentences:', sentences.length)
  
  // Create pages by grouping sentences and integrating the character
  const pages: Array<{ pageNumber: number; text: string; illustrationPrompt: string }> = []
  
  // If we have enough content, create pages from the writing sample
  if (sentences.length >= 3) {
    const sentencesPerPage = Math.ceil(sentences.length / 6) // Aim for 6 pages
    console.log('Sentences per page:', sentencesPerPage)
    
    for (let i = 0; i < 6; i++) {
      const startIndex = i * sentencesPerPage
      const endIndex = Math.min(startIndex + sentencesPerPage, sentences.length)
      const pageSentences = sentences.slice(startIndex, endIndex)
      
      if (pageSentences.length > 0) {
        // Integrate character into the story
        let pageText = pageSentences.join('. ').trim()
        if (!pageText.endsWith('.')) pageText += '.'
        
        console.log(`Page ${i + 1} original text:`, pageText.substring(0, 100) + '...')
        
        // Replace generic characters with our specific character
        pageText = replaceGenericCharacters(pageText, characterName, characterDescription)
        
        console.log(`Page ${i + 1} after character integration:`, pageText.substring(0, 100) + '...')
        
        pages.push({
          pageNumber: i + 1,
          text: pageText,
          illustrationPrompt: `A children's book illustration showing ${characterDescription} in the scene: ${pageText.substring(0, 100)}..., storybook style`
        })
      }
    }
  } else {
    console.log('Not enough sentences, creating hybrid story')
    // If not enough content, create a hybrid story
    pages.push({
      pageNumber: 1,
      text: `Once upon a time, there was ${characterName}. ${characterDescription}. ${writingSample}`,
      illustrationPrompt: `A children's book illustration of ${characterDescription}, bright and colorful, storybook style`
    })
    
    // Add continuation pages
    for (let i = 2; i <= 6; i++) {
      pages.push({
        pageNumber: i,
        text: `As the story continued, ${characterName} found themselves in new adventures. ${characterDescription} faced challenges with courage and kindness, making friends along the way.`,
        illustrationPrompt: `A children's book illustration of ${characterDescription} in an adventure scene, storybook style`
      })
    }
  }
  
  console.log('Final pages created:', pages.length)
  return pages
}

function replaceGenericCharacters(text: string, characterName: string, characterDescription: string): string {
  console.log('Original text:', text.substring(0, 200) + '...')
  console.log('Character name:', characterName)
  
  // More comprehensive patterns to replace with our character
  const replacements = [
    // Pronouns
    { pattern: /\b(he|she|they)\b/gi, replacement: characterName },
    { pattern: /\b(him|her|them)\b/gi, replacement: characterName },
    { pattern: /\b(his|hers|theirs)\b/gi, replacement: `${characterName}'s` },
    
    // Generic character references
    { pattern: /\b(the boy|the girl|the child|the kid)\b/gi, replacement: characterName },
    { pattern: /\b(a boy|a girl|a child|a kid)\b/gi, replacement: characterName },
    { pattern: /\b(the main character|the protagonist|the hero|the heroine)\b/gi, replacement: characterName },
    { pattern: /\b(someone|somebody|a person|a character)\b/gi, replacement: characterName },
    { pattern: /\b(a young person|a child|a kid|a youngster)\b/gi, replacement: characterName },
    
    // Story-specific patterns
    { pattern: /\b(the young one|the little one|the brave one)\b/gi, replacement: characterName },
    { pattern: /\b(our hero|our protagonist|our character)\b/gi, replacement: characterName },
    { pattern: /\b(the adventurer|the explorer|the traveler)\b/gi, replacement: characterName },
    
    // Common story starters
    { pattern: /^Once upon a time, there was a ([^,]+),/gi, replacement: `Once upon a time, there was ${characterName},` },
    { pattern: /^There once was a ([^,]+),/gi, replacement: `There once was ${characterName},` },
    { pattern: /^In a land far away, lived a ([^,]+),/gi, replacement: `In a land far away, lived ${characterName},` },
  ]
  
  let result = text
  
  // Apply all replacements
  replacements.forEach(({ pattern, replacement }) => {
    const beforeReplace = result
    result = result.replace(pattern, replacement)
    if (beforeReplace !== result) {
      console.log('Replacement made:', pattern.toString(), '->', replacement)
    }
  })
  
  // If no replacements were made, try to add character to the beginning
  if (result === text && !result.toLowerCase().includes(characterName.toLowerCase())) {
    console.log('No replacements made, adding character to beginning')
    result = `${characterName} was the main character of this story. ${characterDescription}. ${text}`
  }
  
  console.log('Final text:', result.substring(0, 200) + '...')
  return result
}

function extractCharacterName(description: string): string | null {
  console.log('Extracting character name from:', description)
  
  // More comprehensive patterns to extract character names
  const patterns = [
    // "A [Name]" or "The [Name]"
    /(?:A|The)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
    // "[Name] with/has/is/was"
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:with|has|is|was|named|called)/,
    // "named [Name]" or "called [Name]"
    /(?:named|called)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
    // "[Name] is a" or "[Name] was a"
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:is|was)\s+a/,
    // "Meet [Name]" or "This is [Name]"
    /(?:Meet|This is|Here is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
    // "[Name], who" or "[Name] who"
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),?\s+who/,
  ]
  
  for (const pattern of patterns) {
    const match = description.match(pattern)
    if (match) {
      const name = match[1].trim()
      console.log('Extracted character name:', name)
      return name
    }
  }
  
  console.log('No character name found, using default')
  return null
}
