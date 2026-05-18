# Personal Portfolio Website

A modern, multilingual personal portfolio website built with Next.js, showcasing projects, skills, and professional experience. Features include developer mode for enhanced interactivity, Google Calendar integration, and seamless Docker deployment.

## Features

- **Multilingual Support**: English and Chinese (Simplified) with easy language switching
- **Developer Mode**: Interactive developer tools and component information display
- **Project Showcase**: Grid layout displaying featured projects with links and descriptions
- **Skills Display**: Organized skill sets with categories and proficiency levels
- **Contact Integration**: Direct links to social platforms and contact forms
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Server-side rendering, meta tags, and structured data
- **Docker Deployment**: Containerized for easy deployment with CI/CD pipeline

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Docker with GitHub Actions
- **Integrations**: Google Calendar API, Docker Hub

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Docker (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file with required variables (see `.env.example` if available)

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Docker Deployment

Build and run with Docker:
```bash
docker build -t personal-website .
docker run -p 3000:3000 personal-website
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
├── data/               # Static data files
├── dictionaries/       # Internationalization files
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── services/           # API integrations
├── store/              # State management
└── styles/             # CSS stylesheets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
