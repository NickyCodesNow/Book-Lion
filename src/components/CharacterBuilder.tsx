'use client'

interface CharacterBuilderProps {
  characterDescription: string
  setCharacterDescription: (description: string) => void
  onGenerate: () => void
  isGenerating: boolean
}

export default function CharacterBuilder({ 
  characterDescription, 
  setCharacterDescription, 
  onGenerate, 
  isGenerating 
}: CharacterBuilderProps) {
  return (
    <div className="giraffe-panel h-fit">
      <h2 className="text-3xl font-bold mb-8 text-text-dark text-center">
        Create Your Character
      </h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="character-description" className="block text-lg font-semibold text-text-medium mb-4 text-center">
            Describe Your Character
          </label>
          <textarea
            id="character-description"
            value={characterDescription}
            onChange={(e) => setCharacterDescription(e.target.value)}
            placeholder="Describe your character's appearance, personality, and behavior. For example: 'A friendly dragon with purple scales, big green eyes, and a gentle smile. He loves to help children and has a small golden crown on his head.'"
            className="soft-input w-full h-48 resize-none"
            disabled={isGenerating}
          />
        </div>
        
        <div className="fun-accent p-6">
          <p className="font-semibold text-white mb-3 text-center text-lg">Include Details About:</p>
          <ul className="space-y-2 text-white font-medium">
            <li>• Physical appearance (colors, size, clothing)</li>
            <li>• Personality traits</li>
            <li>• Special features or accessories</li>
            <li>• Facial expressions or mood</li>
          </ul>
        </div>
        
        <button
          onClick={onGenerate}
          disabled={isGenerating || !characterDescription.trim()}
          className={`w-full soft-button text-xl py-4 ${
            isGenerating || !characterDescription.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : ''
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
              <span>Creating...</span>
            </div>
          ) : (
            <span>Generate Character</span>
          )}
        </button>
      </div>
    </div>
  )
}

