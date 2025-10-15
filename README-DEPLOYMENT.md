# 🚀 Book Lion - Deployment Guide

## Quick Start (Any PC)

### Prerequisites
- Node.js 18+ installed
- Git installed
- OpenAI API key

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/NickyCodesNow/Book-Lion.git
   cd Book-Lion
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Go to `http://localhost:3000`

## Production Deployment

### Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Book-Lion" repository
5. Add environment variable: `OPENAI_API_KEY`
6. Click "Deploy"

### Docker
1. **Build and run with Docker:**
   ```bash
   docker-compose up --build
   ```

2. **Or build manually:**
   ```bash
   docker build -t book-lion .
   docker run -p 3000:3000 -e OPENAI_API_KEY=your_key book-lion
   ```

## Features
- ✅ AI Character Generation
- ✅ Story Integration
- ✅ Book Preview
- ✅ File Upload (.txt, .doc)
- ✅ Responsive Design
- ✅ Safari Theme with Animal Patterns

## Troubleshooting
- Make sure you have a valid OpenAI API key
- Check that all dependencies are installed
- Ensure port 3000 is available
