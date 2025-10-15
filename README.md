# 🦁 Book Lion - AI Children's Book Creator

**Book Lion** is an AI-powered children's book creator that generates personalized stories by integrating custom characters into uploaded writing samples. Create magical adventures with your own characters!

## ✨ Features

- **🎨 Character Generation**: Create custom characters with AI-generated images
- **📚 Story Integration**: Upload your own stories and integrate your character
- **🗿 Safari-Themed UI**: Beautiful animal-patterned panels (giraffe, zebra, leopard)
- **📄 File Support**: Upload .txt and .doc files for story content
- **📖 Book Generation**: Generate complete 6-page storybooks
- **💾 Download**: Download your generated books as text files
- **🎯 Character Integration**: Smart character replacement throughout your story

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/book-lion.git
cd book-lion
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
```
Add your API keys to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Describe Your Character**: Enter a detailed description of your character
2. **Generate Character Image**: Click "Generate Character" to create an AI image
3. **Upload Your Story** (Optional): Upload a .txt or .doc file with your story
4. **Generate Book**: Click "Generate StoryBook" to create your personalized book
5. **Download**: Download your complete storybook

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API
- **File Processing**: Mammoth.js for .doc files
- **TypeScript**: Full type safety
- **UI Components**: Custom React components

## 🎨 Design Features

- **Safari Theme**: African safari-inspired color palette
- **Animal Panels**: Giraffe, zebra, and leopard-patterned UI elements
- **Responsive Design**: Works on desktop and mobile
- **Accessibility**: High contrast text and proper ARIA labels

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-character/
│   │   └── generate-book/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── BookPreview.tsx
    ├── CharacterBuilder.tsx
    ├── CharacterPreview.tsx
    └── UploadPanel.tsx
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for AI image and text generation
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Mammoth.js for .doc file processing

---

**Made with ❤️ for creating magical children's stories**