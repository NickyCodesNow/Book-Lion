'use client'

import { useState } from 'react'
import UploadPanel from '@/components/UploadPanel'
import CharacterBuilder from '@/components/CharacterBuilder'
import CharacterPreview from '@/components/CharacterPreview'
import BookPreview from '@/components/BookPreview'

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<{
    illustrations: File[]
    writing: File | null
  }>({
    illustrations: [],
    writing: null
  })
  
  const [characterDescription, setCharacterDescription] = useState('')
  const [characterImage, setCharacterImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [book, setBook] = useState<any>(null)
  const [isGeneratingBook, setIsGeneratingBook] = useState(false)

  const readFileContent = async (file: File): Promise<string> => {
    const fileName = file.name.toLowerCase()
    
    // Handle .doc files with mammoth
    if (fileName.endsWith('.doc')) {
      try {
        const mammoth = await import('mammoth')
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer })
        return result.value
      } catch (error) {
        throw new Error('Failed to read .doc file. Please try converting to .txt format.')
      }
    }
    
    // Handle .txt files
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        
        // Check if this looks like a corrupted file (contains binary data)
        if (content.includes('PK') && content.includes('[Content_Types].xml')) {
          reject(new Error('Please upload a plain text (.txt) file, not a Word document (.docx)'))
          return
        }
        
        // Check for other binary indicators
        if (content.includes('\0') || content.length > 0 && content.charCodeAt(0) > 127) {
          reject(new Error('File appears to be binary. Please upload a plain text (.txt) file'))
          return
        }
        
        resolve(content)
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file, 'UTF-8')
    })
  }

  const handleGenerateCharacter = async () => {
    if (!characterDescription.trim()) {
      alert('Please describe your character first!')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: characterDescription,
          style: uploadedFiles.illustrations.length > 0 ? 'childrens book illustration style' : 'childrens book character'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate character')
      }

      const data = await response.json()
      setCharacterImage(data.imageUrl)
    } catch (error) {
      console.error('Error generating character:', error)
      alert('Failed to generate character. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateBook = async () => {
    if (!characterImage) {
      alert('Please generate a character preview first!')
      return
    }

    setIsGeneratingBook(true)
    try {
      const response = await fetch('/api/generate-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterDescription,
          characterImage,
          writingSample: uploadedFiles.writing ? await readFileContent(uploadedFiles.writing) : null
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate book')
      }

      const data = await response.json()
      setBook(data.book)
      
      // Open book in a new tab
      openBookInNewTab(data.book)
    } catch (error) {
      console.error('Error generating book:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate book. Please try again.'
      alert(errorMessage)
    } finally {
      setIsGeneratingBook(false)
    }
  }

  const openBookInNewTab = (book: any) => {
    // Create HTML content for the book
    const bookHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${book.title}</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #F4E4BC 0%, #E6D3A3 100%);
            min-height: 100vh;
        }
        .book-container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(139, 69, 19, 0.2);
            border: 3px solid rgba(139, 69, 19, 0.3);
        }
        .book-title {
            text-align: center;
            font-size: 2.5em;
            color: #8B4513;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .character-image {
            text-align: center;
            margin-bottom: 30px;
        }
        .character-image img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #FF6B35;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .page {
            margin-bottom: 40px;
            padding: 20px;
            background: #FFF8DC;
            border-radius: 15px;
            border-left: 5px solid #8B4513;
        }
        .page-number {
            display: inline-block;
            background: #FF6B35;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .page-text {
            font-size: 1.2em;
            color: #2C3E50;
            margin-bottom: 15px;
        }
        .illustration-prompt {
            font-style: italic;
            color: #666;
            background: #F5F5F5;
            padding: 10px;
            border-radius: 8px;
            font-size: 0.9em;
        }
        .download-btn {
            background: linear-gradient(135deg, #FF6B35 0%, #4A90E2 100%);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 25px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            margin: 20px 0;
            box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
        }
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }
    </style>
</head>
<body>
    <div class="book-container">
        <h1 class="book-title">${book.title}</h1>
        
        <div class="character-image">
            <img src="${book.characterImage}" alt="Character" />
        </div>
        
        ${book.pages.map((page: any) => `
            <div class="page">
                <div class="page-number">Page ${page.pageNumber}</div>
                <div class="page-text">${page.text}</div>
                <div class="illustration-prompt">
                    <strong>Illustration:</strong> ${page.illustrationPrompt}
                </div>
            </div>
        `).join('')}
        
        <div style="text-align: center; margin-top: 40px;">
            <button class="download-btn" onclick="downloadBook()">📖 Download This Book</button>
        </div>
    </div>
    
    <script>
        function downloadBook() {
            const bookContent = \`${book.title}
Generated on ${new Date(book.generatedAt).toLocaleDateString()}

${book.pages.map((page: any) => 
  `Page ${page.pageNumber}:
${page.text}

Illustration: ${page.illustrationPrompt}

---`
).join('\n')}

The End\`;
            
            const blob = new Blob([bookContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '${book.title.replace(/\s+/g, '_')}.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>
    `

    // Create a new window with the book content
    const newWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes')
    if (newWindow) {
      newWindow.document.write(bookHTML)
      newWindow.document.close()
    }
  }

  return (
    <main className="min-h-screen p-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mubasic-style Header */}
        <div className="text-center mb-20">
          <div className="hero-text mb-8">
            <div className="text-sunshine-yellow">Book Lion</div>
            <div className="text-green-600 text-2xl md:text-3xl font-medium">For the ferocious reader.</div>
          </div>
          <div className="grass-bar mb-8"></div>
        </div>
        
        {/* Soft Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <UploadPanel 
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
          
          <CharacterBuilder 
            characterDescription={characterDescription}
            setCharacterDescription={setCharacterDescription}
            onGenerate={handleGenerateCharacter}
            isGenerating={isGenerating}
          />
          
          <div>
            <CharacterPreview 
              characterImage={characterImage}
              isGenerating={isGenerating}
            />
            
            {/* Generate Book Button - Under Character Preview */}
            <div className="mt-6">
              <button
                onClick={handleGenerateBook}
                disabled={isGeneratingBook || !characterImage}
                className={`w-full soft-button text-lg px-8 py-4 ${
                  isGeneratingBook || !characterImage
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isGeneratingBook ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span>Generating Book...</span>
                  </div>
                ) : (
                  '📖 Generate StoryBook'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Book Preview Section */}
        <div className="mb-16">
          <BookPreview 
            book={book}
            isGenerating={isGeneratingBook}
          />
        </div>
      </div>
    </main>
  )
}

