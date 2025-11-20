# 🥤 Coca-Cola Uganda - Corporate Website

A professional, dynamic, and visually stunning corporate website for Coca-Cola Uganda, built with cutting-edge web technologies. This project showcases advanced 3D rendering, custom animation physics, and a lively user experience across all screens.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 🎨 Design & UX
- **Modern UI/UX**: Premium design with vibrant colors, glassmorphism, and dynamic animations
- **Dark Mode**: Seamless light/dark theme switching with `next-themes`
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Custom Cursor**: Dynamic cursor with magnifying glass effect on desktop
- **Smooth Animations**: Framer Motion and GSAP for buttery-smooth transitions

### 🚀 Technical Highlights
- **Next.js 15**: Latest App Router with server-side rendering
- **3D Graphics**: React Three Fiber for interactive 3D bottle models and globes
- **Advanced Animations**: GSAP ScrollTrigger for scroll-linked animations
- **Real-time Backend**: Convex for instant data synchronization
- **Authentication**: Clerk for secure user authentication and admin access
- **Type Safety**: Full TypeScript implementation

### 📄 Pages & Sections

#### Home Page
- Hero section with 3D animated Coca-Cola bottle
- Scroll-telling narrative with dynamic background shifts
- Vertical timeline showcasing company history
- Brands showcase with category filtering and color splash effects
- Careers section with expandable job cards
- Media center with news ticker and featured articles
- Investors section with animated financial charts
- Contact form with animated Earth GIF

#### Our Company
- Mission statement with reveal text animation
- Interactive company history timeline
- Core values showcase

#### Brands
- Product showcase with 3D flip cards
- Category filtering (All, Sparkling, Juice, Water)
- Dynamic background color based on hovered brand
- Nutritional information on card flip

#### Careers
- Job listings fetched from Convex
- Expandable job cards with accordion animation
- Clerk authentication for job applications
- Real-time job status updates

#### Media Center
- Infinite scrolling news ticker
- Featured articles with 3D parallax effect
- Latest press releases grid

#### Investors
- Stock price display
- Animated financial performance charts
- Downloadable documents section

#### Contact
- Interactive contact form with Convex integration
- Animated Earth GIF visualization
- Contact information cards

#### Admin Dashboard
- Protected routes with Clerk authentication
- Job postings management
- Leads and form submissions tracking
- User authentication with sign-in/sign-out

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/) - React animation library
  - [GSAP](https://greensock.com/gsap/) with ScrollTrigger - Advanced scroll animations
- **3D Graphics**: 
  - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js
  - [@react-three/drei](https://github.com/pmndrs/drei) - Useful helpers for R3F

### Backend & Services
- **Database**: [Convex](https://www.convex.dev/) - Real-time backend platform
- **Authentication**: [Clerk](https://clerk.com/) - User authentication and management
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) - Theme switching

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Version Control**: Git & GitHub

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- Convex account (for backend)
- Clerk account (for authentication)

### Clone the Repository
```bash
git clone https://github.com/khanblair/coca-cola.git
cd coca-cola
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin

# Convex
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### Run Development Server
```bash
# Start Convex backend
npx convex dev

# In another terminal, start Next.js
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 🗂️ Project Structure

```
coca-cola/
├── app/                      # Next.js App Router pages
│   ├── admin/               # Admin dashboard
│   ├── brands/              # Brands page
│   ├── careers/             # Careers page
│   ├── company/             # Company page
│   ├── contact/             # Contact page
│   ├── investors/           # Investors page
│   ├── media/               # Media center page
│   ├── sign-in/             # Sign-in page
│   ├── sign-up/             # Sign-up page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── admin/               # Admin components
│   ├── auth/                # Authentication components
│   ├── canvas/              # 3D canvas components
│   ├── sections/            # Page sections
│   └── ui/                  # Reusable UI components
├── convex/                  # Convex backend schema & functions
├── lib/                     # Utility functions
├── public/                  # Static assets
└── tailwind.config.ts       # Tailwind configuration
```

## 🎯 Key Components

### Custom Components
- **RevealText**: Word-by-word text reveal animation
- **CustomCursor**: Dynamic cursor with hover effects
- **BottleModel**: 3D Coca-Cola bottle with Three.js
- **ProductCard**: 3D flip card for product showcase
- **JobCard**: Expandable accordion card for job listings
- **FinancialChart**: SVG-based animated charts
- **FeaturedArticle**: 3D parallax article cards
- **NewsTicker**: Infinite scrolling headline ticker

### Sections
- **HeroSection**: Landing section with 3D bottle
- **ScrollTimeline**: Narrative scroll-telling
- **CompanyHistory**: Vertical timeline with animations
- **BrandsShowcase**: Product grid with filtering
- **CareersSection**: Job listings
- **MediaCenter**: News and articles
- **InvestorsSection**: Financial data
- **ContactSection**: Contact form

## 🎨 Design System

### Colors
- **Primary Brand**: `#E6242B` (Coca-Cola Red)
- **Dark Variant**: `#c01e25`
- **Light Variant**: `#ff4d55`

### Typography
- **Sans**: Geist Sans (variable font)
- **Mono**: Geist Mono (variable font)

### Animations
- **Scroll Animations**: GSAP ScrollTrigger
- **UI Animations**: Framer Motion
- **3D Animations**: React Three Fiber

## 🔒 Authentication & Authorization

The project uses Clerk for authentication with the following features:
- Custom sign-in/sign-up pages
- Protected admin routes
- Role-based access control
- Session management
- User profile management

## 📊 Backend (Convex)

### Collections
- **history**: Company milestones
- **jobs**: Job postings
- **forms**: Contact form submissions

### Mutations
- `submitContact`: Handle contact form submissions
- `subscribeNewsletter`: Newsletter subscriptions
- `createJob`: Create new job posting
- `updateJob`: Update job details
- `toggleJobActive`: Activate/deactivate jobs

### Queries
- `history.get`: Fetch company history
- `jobs.list`: Get active job listings
- `jobs.listAll`: Get all jobs (admin)
- `forms.list`: Get form submissions (admin)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
Make sure to set all environment variables in your deployment platform:
- Clerk keys
- Convex deployment URL

## 📝 License

This project is created for demonstration purposes. All Coca-Cola branding and trademarks belong to The Coca-Cola Company.

## 👨‍💻 Developer

**Khan Blair**
- GitHub: [@khanblair](https://github.com/khanblair)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Clerk for authentication
- Convex for the real-time backend
- Framer Motion & GSAP for animation libraries
- React Three Fiber community

---

**Note**: This is a demonstration project showcasing modern web development techniques. It is not affiliated with The Coca-Cola Company. It's something like a clone of the Coca-Cola Uganda website.
