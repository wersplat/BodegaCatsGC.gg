# Bodega Cats Gaming Club Website

A production-ready Next.js 15 website for Bodega Cats Gaming Club (BodegaCatsGC.gg) featuring a dark-first UI with neon orange accents, team showcases, rankings, and community features.

## 🚀 Features

- **Next.js 15** with App Router and TypeScript
- **Dark-first UI** with neon orange (#FF4D00) accents
- **Responsive design** with Tailwind CSS and shadcn/ui components
- **Theme toggle** (light/dark mode)
- **SEO optimized** with metadata and OpenGraph tags
- **Accessibility focused** with semantic HTML and ARIA labels
- **Mock data system** ready for API integration

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # All page routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero.tsx          # Home page hero
│   ├── team-card.tsx     # Team display cards
│   ├── event-card.tsx    # Event display cards
│   ├── nav-bar.tsx       # Navigation component
│   ├── site-footer.tsx   # Footer component
│   └── ...               # Other components
└── lib/                  # Utilities and data
    ├── types.ts          # TypeScript interfaces
    ├── mock.ts           # Mock data
    ├── fetchers.ts       # Data fetching functions
    ├── config.ts         # Environment configuration
    └── utils.ts          # Utility functions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + lucide-react
- **Theme**: next-themes
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd BodegaCatsGC.gg
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.local.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   NEXT_PUBLIC_ADMIN_URL=https://admin.bodegacatsgc.gg
   NEXT_PUBLIC_GLOBAL_RANKINGS_URL=https://k.siba.gg
   NEXT_PUBLIC_GLOBAL_RANKINGS_EMBED_URL=https://k.siba.gg/embed/leaderboard
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

## 🎨 Theming

The website uses a custom theme system with CSS variables:

```css
:root {
  --bcg-bg: #ffffff;           /* Light background */
  --bcg-fg: #0f0f0f;          /* Light foreground */
  --bcg-accent: #FF4D00;       /* Primary orange */
  --bcg-accent-2: #00d4ff;     /* Secondary blue */
}

.dark {
  --bcg-bg: #0a0a0a;           /* Dark background */
  --bcg-fg: #ffffff;           /* Dark foreground */
  --bcg-accent: #FF4D00;       /* Primary orange */
  --bcg-accent-2: #00d4ff;     /* Secondary blue */
}
```

### Customizing Colors

1. **Primary Accent**: Update `--bcg-accent` in `src/app/globals.css`
2. **Secondary Accent**: Update `--bcg-accent-2` in `src/app/globals.css`
3. **Background/Foreground**: Update the respective variables for light/dark modes

## 🔄 API Integration

The website currently uses mock data but is designed for easy API integration:

### Current Mock Data Structure

```typescript
// Teams
interface Team {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  logo: string
  color: string
  players: Player[]
  achievements: Achievement[]
}

// Events
interface Event {
  id: string
  title: string
  description: string
  date: string
  image: string
  url?: string
  featured?: boolean
}

// Rankings
interface RankingRow {
  id: string
  rank: number
  player: string
  team: string
  points: number
  wins: number
  losses: number
  winRate: number
}
```

### Replacing Mock Data with Real APIs

1. **Update fetchers**: Modify functions in `src/lib/fetchers.ts`
2. **Example API integration**:

   ```typescript
   export async function getTeams(): Promise<Team[]> {
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`)
     return response.json()
   }
   ```

3. **Environment variables**: Add your API endpoints to `.env.local`

## 📱 Pages & Routes

- **Home** (`/`) - Hero, team highlights, featured events
- **Teams** (`/teams`) - All teams grid
- **Team Details** (`/teams/[slug]`) - Individual team pages
- **Rankings** (`/rankings`) - Leaderboard with external rankings link
- **About** (`/about`) - History timeline, mission, founder info
- **Media** (`/media`) - Video and image galleries
- **Contact** (`/contact`) - Contact information and social links

## 🎯 Key Components

### Navigation

- **NavBar**: Sticky header with logo, navigation, and theme toggle
- **SiteFooter**: Footer with links, socials, and admin portal button

### Content Components

- **Hero**: Home page hero with CTAs
- **TeamCard**: Team display with hover effects
- **EventCard**: Event showcase with featured badges
- **RankingsTeaser**: External rankings integration
- **LeaderboardTable**: Sortable rankings table with search

### Media Components

- **VideoEmbed**: YouTube/Twitch video embeds
- **ImageTile**: Image gallery tiles
- **Timeline**: History timeline for about page

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_ADMIN_URL` | Admin portal URL | `https://admin.bodegacatsgc.gg` |
| `NEXT_PUBLIC_GLOBAL_RANKINGS_URL` | Global rankings site | `https://k.siba.gg` |
| `NEXT_PUBLIC_GLOBAL_RANKINGS_EMBED_URL` | Rankings embed URL | `https://k.siba.gg/embed/leaderboard` |

### Adding New Teams

1. **Update mock data**: Add team to `src/lib/mock.ts`
2. **Create team page**: Team pages are automatically generated from the data
3. **Add team assets**: Place team logos in `public/teams/`

### Adding New Events

1. **Update mock data**: Add event to `src/lib/mock.ts`
2. **Featured events**: Set `featured: true` to show on home page
3. **Event images**: Place event images in `public/events/`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### Other Platforms

1. **Build the project**: `pnpm build`
2. **Start production server**: `pnpm start`
3. **Configure environment variables** on your hosting platform

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email <hello@bodegacatsgc.gg> or join our Discord community.

---

Built with ❤️ by the Bodega Cats Gaming Club team
