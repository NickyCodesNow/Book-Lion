'use client'

import { useState, useRef } from 'react'

interface UploadedFiles {
  illustrations: File[]
  writing: File | null
}

interface UploadPanelProps {
  uploadedFiles: UploadedFiles
  setUploadedFiles: (files: UploadedFiles) => void
}

export default function UploadPanel({ uploadedFiles, setUploadedFiles }: UploadPanelProps) {
  const [dragOver, setDragOver] = useState(false)
  const illustrationInputRef = useRef<HTMLInputElement>(null)
  const writingInputRef = useRef<HTMLInputElement>(null)

  const handleIllustrationUpload = (files: FileList | null) => {
    if (files) {
      const imageFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/')
      )
      setUploadedFiles({
        ...uploadedFiles,
        illustrations: [...uploadedFiles.illustrations, ...imageFiles]
      })
    }
  }

  const handleWritingUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0]
      
      // Validate file type
      const fileName = file.name.toLowerCase()
      if (!fileName.endsWith('.txt') && !fileName.endsWith('.doc')) {
        alert('Please upload a .txt or .doc file only. .docx files are not supported.')
        return
      }
      
      // Check file size
      if (file.size > 10 * 1024 * 1024) { // 10MB
        alert('File is too large. Please upload a file smaller than 10MB.')
        return
      }
      
      setUploadedFiles({
        ...uploadedFiles,
        writing: file
      })
    }
  }

  const removeIllustration = (index: number) => {
    const newIllustrations = uploadedFiles.illustrations.filter((_, i) => i !== index)
    setUploadedFiles({
      ...uploadedFiles,
      illustrations: newIllustrations
    })
  }

  const removeWriting = () => {
    setUploadedFiles({
      ...uploadedFiles,
      writing: null
    })
  }

  return (
    <div className="leopard-panel h-fit">
      <h2 className="text-3xl font-bold mb-8 text-text-dark text-center">
        Upload Your Style
      </h2>
      
      {/* Illustration Upload */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-text-medium text-center">Style References</h3>
        <div
          className={`border-2 border-dashed border-warm-orange/30 rounded-2xl p-8 text-center transition-all duration-300 ${
            dragOver ? 'bg-warm-gray scale-105 border-warm-orange' : 'bg-white hover:bg-warm-gray hover:border-warm-orange'
          }`}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleIllustrationUpload(e.dataTransfer.files)
          }}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-warm-orange rounded-full flex items-center justify-center bounce-gentle">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-text-dark font-semibold text-lg">
              Drag & Drop Images Here
            </p>
            <p className="text-text-medium">
              or{' '}
              <button
                onClick={() => illustrationInputRef.current?.click()}
                className="text-warm-orange hover:text-primary-blue font-semibold underline"
              >
                Browse Files
              </button>
            </p>
            <p className="text-sm text-text-light">PNG, JPG, GIF up to 10MB each</p>
          </div>
          <input
            ref={illustrationInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleIllustrationUpload(e.target.files)}
            className="hidden"
          />
        </div>
        
        {/* Display uploaded illustrations */}
        {uploadedFiles.illustrations.length > 0 && (
          <div className="mt-6 space-y-3">
            {uploadedFiles.illustrations.map((file, index) => (
              <div key={index} className="flex items-center justify-between fun-accent p-4 rounded-lg">
                <span className="text-white font-medium truncate">{file.name}</span>
                <button
                  onClick={() => removeIllustration(index)}
                  className="bg-primary-blue text-white px-3 py-1 font-medium rounded-lg hover:bg-warm-orange transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Writing Sample Upload */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-text-medium text-center">Writing Sample</h3>
        <div className="border-2 border-dashed border-warm-orange/30 rounded-2xl p-8 text-center bg-white hover:bg-warm-gray hover:border-warm-orange transition-all duration-300">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary-blue rounded-full flex items-center justify-center bounce-gentle">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-text-dark font-semibold text-lg">
              {uploadedFiles.writing ? (
                <span className="text-warm-orange">{uploadedFiles.writing.name}</span>
              ) : (
                <>
                  Upload Text or PDF
                  <br />
                  or{' '}
                  <button
                    onClick={() => writingInputRef.current?.click()}
                    className="text-warm-orange hover:text-primary-blue font-semibold underline"
                  >
                    Browse Files
                  </button>
                </>
              )}
            </p>
            <p className="text-sm text-text-light">TXT, DOC files (up to 10MB)</p>
            <p className="text-xs text-text-light mt-1">Supports plain text (.txt) and Word documents (.doc)</p>
          </div>
          <input
            ref={writingInputRef}
            type="file"
            accept=".txt,.doc"
            onChange={(e) => handleWritingUpload(e.target.files)}
            className="hidden"
          />
          {uploadedFiles.writing && (
            <button
              onClick={removeWriting}
              className="mt-4 bg-warm-orange text-white px-4 py-2 font-medium rounded-lg hover:bg-sunshine-yellow transition-colors duration-200"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

