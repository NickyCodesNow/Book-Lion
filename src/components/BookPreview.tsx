'use client'

interface BookPage {
  pageNumber: number
  text: string
  illustrationPrompt: string
}

interface Book {
  title: string
  pages: BookPage[]
  characterImage: string
  generatedAt: string
}

interface BookPreviewProps {
  book: Book | null
  isGenerating: boolean
}

export default function BookPreview({ book, isGenerating }: BookPreviewProps) {
  if (isGenerating) {
    return (
      <div className="giraffe-panel h-fit">
        <h2 className="text-3xl font-bold mb-8 text-text-dark text-center">
          Generating Your Book
        </h2>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-warm-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-medium font-semibold text-lg">Creating your story...</p>
          <p className="text-text-light text-sm mt-2">This may take a moment</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="giraffe-panel h-fit">
        <h2 className="text-3xl font-bold mb-8 text-text-dark text-center">
          Your Book
        </h2>
        <div className="text-center text-text-medium">
          <div className="w-20 h-20 mx-auto mb-4 bg-warm-orange rounded-full flex items-center justify-center floating">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-xl font-semibold mb-2 text-text-dark">No Book Yet</p>
          <p className="text-text-medium font-medium">Generate a character and create your storybook!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="giraffe-panel h-fit">
      <h2 className="text-3xl font-bold mb-8 text-text-dark text-center">
        {book.title}
      </h2>
      
      <div className="space-y-6">
        {/* Character Image */}
        <div className="text-center">
          <img
            src={book.characterImage}
            alt="Character"
            className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-warm-orange"
          />
        </div>

        {/* Book Pages Preview */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {book.pages.map((page) => (
            <div key={page.pageNumber} className="bg-white/80 p-4 rounded-lg border border-warm-orange/30">
              <div className="flex items-start space-x-3">
                <div className="bg-warm-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {page.pageNumber}
                </div>
                <div className="flex-1">
                  <p className="text-text-dark font-medium leading-relaxed">
                    {page.text}
                  </p>
                  <div className="mt-2 p-2 bg-warm-gray rounded text-xs text-text-light">
                    <strong>Illustration:</strong> {page.illustrationPrompt}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => downloadBook(book)}
            className="soft-button text-lg px-6 py-3"
          >
            📖 Download Book
          </button>
        </div>
      </div>
    </div>
  )
}

function downloadBook(book: Book) {
  // Create a simple text version of the book
  const bookContent = `
${book.title}
Generated on ${new Date(book.generatedAt).toLocaleDateString()}

${book.pages.map(page => 
  `Page ${page.pageNumber}:
${page.text}

Illustration: ${page.illustrationPrompt}

---`
).join('\n')}

The End
  `.trim()

  // Create and download the file
  const blob = new Blob([bookContent], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${book.title.replace(/\s+/g, '_')}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
