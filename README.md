# Interactive Resume - Tony Tong Wang

A modern, interactive resume website built with Next.js, TypeScript, and Tailwind CSS. Features an elegant single-page design with interactive elements and reliable PDF/DOCX export functionality.

## Features

- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🎯 **Interactive Skills Dashboard** - Filter and explore technical skills by category
- 📈 **Visual Timeline** - Click-to-expand career experience timeline
- 📊 **Skills Visualization** - Data-driven donut chart showing skill distribution
- 📄 **Export Functionality** - Download resume as PDF or DOCX format
- 🎨 **Modern UI** - Built with Tailwind CSS and custom styling
- ⚡ **Performance** - Next.js optimization and fast loading

## Technology Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **PDF Export**: jsPDF with jspdf-autotable
- **DOCX Export**: docx with file-saver
- **Fonts**: Inter (Google Fonts)
- **Deployment**: GitHub Pages with GitHub Actions

## Live Demo

Visit the live site: [https://towatek001.github.io/web-resume/](https://towatek001.github.io/web-resume/)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

- Edit content in `src/lib/resumeData.ts` to update resume information
- Modify styling in `src/app/page.tsx` and Tailwind classes
- Export functions are in `src/lib/exportUtils.ts`
- No build process required for development - hot reload included

## Project Structure

```
web-resume/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main resume page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── lib/
│       ├── resumeData.ts     # Resume content and data structure
│       └── exportUtils.ts    # PDF/DOCX export functionality
├── public/                   # Static assets
├── backup-original/          # Original HTML version (backup)
├── package.json             # Dependencies and scripts
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the main branch.

### Manual Deployment Options:

**Vercel (Recommended):**
```bash
npx vercel --prod
```

**Static Export:**
```bash
npm run build
npm run export
```

## Export Functionality

The resume includes reliable PDF and DOCX export features:

- **PDF Export**: Generates professional PDF with proper formatting
- **DOCX Export**: Creates editable Word document with structured content
- **No External Dependencies**: All libraries bundled as npm packages

## Migration Notes

This project was migrated from a vanilla HTML/CSS/JS implementation to Next.js to:
- ✅ Fix unreliable CDN dependency issues
- ✅ Add TypeScript for better development experience  
- ✅ Implement proper package management
- ✅ Enable modern deployment workflows
- ✅ Improve performance and SEO

Original HTML version is preserved in `backup-original/` directory.

## License

© 2024 Tony Tong Wang. All rights reserved.
