# 🏔️ Sunaray Gown / Seemana Gaon — Complete Project Documentation

> **A digital platform documenting and empowering a small village in Lamahatta, Darjeeling**

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Features & Pages](#-features--pages)
5. [UI/UX Design System](#-uiux-design-system)
6. [Multi-Language Support](#-multi-language-support)
7. [Authentication System](#-authentication-system)
8. [Component Library](#-component-library)
9. [Areas for Improvement](#-areas-for-improvement)
10. [Recommendations](#-recommendations)

---

## 🌍 Project Overview

**Seemana Gaon** is a living digital platform for a small village of 22 houses and ~93 residents in Lamahatta, Darjeeling. The platform serves as:

| Purpose | Description |
|---------|-------------|
| 🏠 **Village Portal** | One platform for all village services, schemes, and opportunities |
| 🗻 **Tourism Hub** | A gateway destination showcasing authentic Himalayan life |
| 🤝 **Skills Network** | Connecting village talent with opportunities locally and beyond |

### Key Stats
- **Location:** Lamahatta, Darjeeling District, West Bengal
- **Coordinates:** 27°04'28.9"N 88°21'03.6"E
- **Altitude:** ~1,800m above sea level

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 15.5.11 |
| **UI Library** | React | 19.1.0 |
| **Styling** | Tailwind CSS | 4.x |
| **Animations** | Framer Motion | 12.31.0 |
| **Icons** | Lucide React | 0.563.0 |
| **Backend/Auth** | Supabase | 2.94.0 |
| **Language** | TypeScript | 5.x |
| **Build Tool** | Turbopack | (via Next.js) |

---

## 📂 Project Structure

```
lamahatta-os/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Homepage
│   │   ├── globals.css              # Complete design system (739 lines)
│   │   │
│   │   ├── auth/                    # Authentication
│   │   │   ├── page.tsx            # Login/Signup
│   │   │   ├── callback/           # OAuth callback
│   │   │   └── auth-code-error/    # Error handling
│   │   │
│   │   ├── hub/                     # Sunlight Hub (Community Center)
│   │   │   ├── page.tsx            # Main hub dashboard
│   │   │   ├── creators/           # Content creators section
│   │   │   ├── youth/              # Young voices section
│   │   │   ├── mothers/            # Ama's Circle
│   │   │   ├── fathers/            # Bua's Guild
│   │   │   ├── updates/            # Development notes
│   │   │   ├── praises/            # Achievements & celebrations
│   │   │   └── personality/        # Personality quiz feature
│   │   │
│   │   ├── economy/                 # Village economy & services
│   │   ├── challenges/              # Known challenges & issues
│   │   ├── voices/                  # People & stories
│   │   ├── partners/                # Partner organizations
│   │   ├── updates/                 # News & announcements
│   │   ├── generations/             # From land to skill
│   │   ├── why/                     # Why this exists
│   │   ├── village/                 # Village showcase
│   │   └── dashboard/               # User dashboard
│   │
│   ├── components/                  # 21 Components + 4 subdirs
│   │   ├── Hero.tsx                # Main landing hero
│   │   ├── Navbar.tsx              # Desktop navigation
│   │   ├── MobileMenu.tsx          # Mobile navigation
│   │   ├── LanguageToggle.tsx      # Language switcher (10 languages)
│   │   ├── AuthButton.tsx          # Authentication button
│   │   ├── Footer.tsx              # Site footer
│   │   ├── Newsletter.tsx          # Email subscription
│   │   ├── Survey.tsx              # Community surveys
│   │   ├── ProblemTracker.tsx      # Issue tracking
│   │   ├── ServiceDirectory.tsx    # Services listing
│   │   ├── FeaturedTalents.tsx     # Showcase talents
│   │   ├── CommunityHub.tsx        # Community features
│   │   ├── StatsBar.tsx            # Statistics display
│   │   ├── Gallery.tsx             # Image gallery
│   │   ├── WhatsNew.tsx            # Updates section
│   │   ├── CollectionGrid.tsx      # Grid layouts
│   │   ├── InteractiveTools.tsx    # Interactive elements
│   │   ├── PortfolioCard.tsx       # Portfolio display
│   │   ├── PortfolioEditor.tsx     # Portfolio management
│   │   ├── BackToTop.tsx           # Scroll to top
│   │   ├── ScrollProgress.tsx      # Scroll indicator
│   │   │
│   │   ├── home/                   # Homepage-specific components
│   │   ├── hub/                    # Hub-specific components
│   │   ├── layout/                 # Layout components
│   │   │   ├── RecordNav.tsx      # Main navigation
│   │   │   └── RecordFooter.tsx   # Main footer
│   │   └── shared/                 # Shared components
│   │       ├── PageHeader.tsx     # Page headers
│   │       └── PullQuote.tsx      # Quote styling
│   │
│   ├── context/
│   │   └── LanguageContext.tsx     # Multi-language support (852 lines)
│   │
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client
│   │   └── supabase/              # SSR support
│   │
│   └── types/
│       └── (type definitions)
│
├── public/
│   ├── sunlight-hero.jpg          # Hero background
│   ├── sunlight-forest.jpg        # Forest imagery
│   ├── village-satellite.jpg      # Satellite view
│   └── images/                    # Additional images
│
└── Configuration Files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts (via @theme)
    ├── vercel.json
    └── .env.local
```

---

## ✨ Features & Pages

### 1. Homepage (`/`)
- **Hero Section** with parallax scrolling
- Village statistics (22 houses, 93 residents)
- Call-to-action buttons
- Animated scroll indicator

### 2. Sunlight Hub (`/hub`) — Community Dashboard
| Section | Description | Route |
|---------|-------------|-------|
| 🎯 **Personality Quiz** | Fun quiz to find your village personality | `/hub/personality` |
| 🎬 **Creators Corner** | Video makers & content creators | `/hub/creators` |
| 👦 **Young Voices** | Kids' artwork & school achievements | `/hub/youth` |
| 👩 **Ama's Circle** | Recipes, traditions & mothers' wisdom | `/hub/mothers` |
| 👨 **Bua's Guild** | Construction, farming & mentorship | `/hub/fathers` |
| 📢 **Development Notes** | Village announcements & schemes | `/hub/updates` |
| 🏆 **Praises & Pride** | Achievements & celebrations | `/hub/praises` |

### 3. Economy Page (`/economy`)
- Six service categories displayed in grid
- Food & Hospitality, Agriculture, Construction, Digital Services
- Pull quote component for emphasis

### 4. Challenges Page (`/challenges`)
- Status-coded cards (Critical, Ongoing, Improving)
- Current challenges: Internet, Road Access, Walking Paths, Community Hub

### 5. Additional Pages
- `/why` — Why This Exists
- `/generations` — From Land to Skill
- `/voices` — People & Voices
- `/partners` — Partner Organizations
- `/updates` — News & Updates
- `/village` — Village Showcase
- `/dashboard` — User Dashboard
- `/auth` — Login/Signup

---

## 🎨 UI/UX Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#d97706` | Primary amber |
| `--color-accent-hover` | `#b45309` | Darker amber |
| `--color-accent-light` | `#fef3c7` | Light amber bg |
| `--color-text` | `#111827` | Near black text |
| `--color-muted` | `#6b7280` | Secondary text |
| `--color-border` | `#e5e7eb` | Borders |
| `--color-card` | `#ffffff` | Card backgrounds |
| `--color-earth` | `#1f2937` | Dark sections |

### Typography
| Element | Font | Size |
|---------|------|------|
| **Headings** | Playfair Display | Responsive clamp() |
| **Body** | Inter | 16px base |
| **Labels** | Inter | 0.7-0.8rem uppercase |

### Component Classes
```css
.record-card      /* Standard cards with hover effects */
.glass-card       /* Glassmorphism cards */
.btn-primary      /* Gradient amber buttons */
.btn-secondary    /* Outlined buttons */
.pull-quote       /* Highlighted quotes */
.problem-card     /* Status indicator cards */
.section-label    /* Category labels */
```

### Animations
- **Framer Motion** for all page transitions
- Parallax scrolling on hero
- Staggered reveal animations
- Hover scale effects on buttons
- Custom keyframes for fade-in, slide-up

---

## 🌐 Multi-Language Support

**10 Languages Supported:**

| Category | Languages |
|----------|-----------|
| **Primary** | 🇬🇧 English (EN), 🇳🇵 Nepali (NE) |
| **Regional** | 🇮🇳 Hindi (HI), 🇧🇩 Bengali (BN) |
| **Himalayan** | 🇧🇹 Dzongkha (DZ), བོད་སྐད Tibetan (TB), Sherpa (SH) |
| **International** | 🇨🇳 Chinese (ZH), 🇹🇭 Thai (TH), 🇫🇷 French (FR) |

### Implementation
- Context-based (`LanguageContext.tsx`)
- Translation function `t(key)`
- ~160 translation keys per language
- Toggle component with glassmorphism design

---

## 🔐 Authentication System

### Current Implementation
- **Provider:** Supabase Auth
- **Flow:** Standard email/password + OAuth
- **Routes:**
  - `/auth` — Login page
  - `/auth/callback` — OAuth callback handler
  - `/auth/auth-code-error` — Error handling

### Components
- `AuthButton.tsx` — Handles login/logout state
- SSR support via `@supabase/ssr`

---

## 🧩 Component Library

### Core Components (21)
| Component | Lines | Purpose |
|-----------|-------|---------|
| `Survey.tsx` | ~300 | Community feedback forms |
| `LanguageToggle.tsx` | ~280 | Language selector |
| `ProblemTracker.tsx` | ~260 | Issue tracking |
| `Hero.tsx` | 161 | Landing hero section |
| `PortfolioEditor.tsx` | ~220 | User portfolio management |
| `FeaturedTalents.tsx` | ~240 | Showcase village talents |
| `AuthButton.tsx` | ~200 | Auth state management |
| `Newsletter.tsx` | ~180 | Email subscriptions |
| `ServiceDirectory.tsx` | ~190 | Services listing |
| `MobileMenu.tsx` | ~190 | Mobile navigation |

---

## ⚠️ Areas for Improvement

### 🔴 Critical Issues

| Issue | Location | Impact |
|-------|----------|--------|
| **Hardcoded English text** | `Hero.tsx`, `Navbar.tsx` | Translation keys not used for some strings |
| **Missing translation keys** | `Hero.tsx:82` | `hero.welcome` key doesn't exist |
| **Placeholder policy link** | `challenges/page.tsx:104` | Links to non-existent `/policy` |
| **Mixed naming** | Throughout | "Sunaray Gown" vs "Seemana Gaon" inconsistency |

### 🟡 Medium Priority

| Issue | Location | Recommendation |
|-------|----------|----------------|
| **No loading states** | Various pages | Add skeleton loaders |
| **No error boundaries** | Global | Implement error handling |
| **Missing SEO** | Most pages | Add metadata exports |
| **No image optimization** | Hero, Gallery | Use Next.js Image component |
| **External image URL** | `Hero.tsx:50` | Use local images |
| **No form validation** | Auth, Newsletter | Add Zod/React Hook Form |
| **No unit tests** | Project-wide | Add testing infrastructure |

### 🟢 Nice to Have

| Improvement | Description |
|-------------|-------------|
| **Dark mode toggle** | Add theme switching |
| **PWA support** | Offline functionality |
| **Analytics** | Add tracking |
| **CMS integration** | Dynamic content management |
| **Sitemap generation** | SEO improvement |
| **OpenGraph images** | Social sharing |

---

## 📋 Recommendations

### Immediate Actions

1. **Fix Translation Keys**
   - Add missing `hero.welcome` key
   - Replace hardcoded strings in Navbar with `t()` function
   - Create `/policy` page or update link

2. **Image Optimization**
   ```tsx
   // Replace this:
   <div className="bg-[url('https://...')]" />
   
   // With this:
   import Image from 'next/image'
   <Image src="/sunlight-hero.jpg" alt="..." fill priority />
   ```

3. **Add Missing Pages**
   - `/policy` — Access & Policy information
   - `/404` — Custom error page

### Short-term (1-2 weeks)

4. **Component Consistency**
   - Standardize all forms with validation
   - Add loading states for async operations
   - Implement error boundaries

5. **SEO Enhancement**
   ```tsx
   // Add to each page:
   export const metadata: Metadata = {
     title: 'Page Title — Seemana Gaon',
     description: 'Page description...',
   }
   ```

6. **Testing Setup**
   - Add Jest + React Testing Library
   - Write unit tests for critical components
   - Add Playwright for E2E tests

### Long-term (1+ month)

7. **Performance**
   - Implement code splitting
   - Add service worker for offline support
   - Optimize bundle size

8. **Features**
   - User dashboard with real data
   - Booking/appointment system
   - Event calendar
   - Community forums

---

## 📊 Project Health Summary

| Metric | Status | Score |
|--------|--------|-------|
| **Code Organization** | ✅ Excellent | 9/10 |
| **UI/UX Design** | ✅ Excellent | 9/10 |
| **Multi-language** | ✅ Good | 8/10 |
| **Component Reusability** | ✅ Good | 8/10 |
| **Accessibility** | ⚠️ Needs Work | 6/10 |
| **SEO** | ⚠️ Needs Work | 5/10 |
| **Testing** | ❌ Missing | 2/10 |
| **Error Handling** | ⚠️ Basic | 5/10 |
| **Documentation** | ⚠️ Basic | 6/10 |

**Overall Score: 7.5/10**

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/ripplewave2025/Lamahatta.git
cd Lamahatta
npm install

# Configure environment
cp .env.local.example .env.local
# Add Supabase credentials

# Run development
npm run dev

# Build for production
npm run build
```

---

*Last Updated: February 5, 2026*
*Documentation generated by project analysis*
