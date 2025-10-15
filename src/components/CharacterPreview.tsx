'use client'

interface CharacterPreviewProps {
  characterImage: string | null
  isGenerating: boolean
}

export default function CharacterPreview({ characterImage, isGenerating }: CharacterPreviewProps) {
  return (
    <div className="zebra-panel h-fit">
      <h2 className="text-3xl font-bold mb-8 text-text-dark text-center">
        Character Preview
      </h2>
      
      <div className="aspect-square bg-white flex items-center justify-center overflow-hidden border-2 border-warm-orange/30 rounded-2xl hover:bg-warm-gray transition-all duration-300">
        {isGenerating ? (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-warm-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-medium font-semibold text-lg">Creating...</p>
          </div>
        ) : characterImage ? (
          <img
            src={characterImage}
            alt="Generated character"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="text-center text-text-medium">
            <div className="w-20 h-20 mx-auto mb-4 bg-warm-orange rounded-full flex items-center justify-center floating">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-xl font-semibold mb-2 text-text-dark">No Character Yet</p>
            <p className="text-text-medium font-medium">Describe your character and click "Generate Character" to see them here!</p>
          </div>
        )}
      </div>
      
        {characterImage && (
        <div className="mt-6 p-6 fun-accent">
          <p className="text-white font-semibold text-lg text-center">
            Character Generated Successfully!
          </p>
          <p className="text-white mt-2 font-medium text-center">
            You can now generate your storybook or modify the character description to create a new version.
          </p>
        </div>
      )}
    </div>
  )
}

