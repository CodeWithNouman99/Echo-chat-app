# Create a proper README
echo "# Echo Chat App

A real-time chat application built with React and Tailwind CSS.

## Features
- Real-time messaging
- Clean UI with Tailwind CSS
- Responsive design

## Tech Stack
- React
- Tailwind CSS
- gemini Api

## Installation
\`\`\`bash
npm install
npm run dev
\`\`\`

## Environment Variables
Create a .env file and add:
\`\`\`
VITE_API_KEY=your_api_key_here
\`\`\`
" > README.md

git add README.md
git commit -m "Add comprehensive README"
git push
