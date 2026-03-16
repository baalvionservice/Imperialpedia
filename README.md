# Imperialpedia

Imperialpedia is a next-generation **financial knowledge and analytics platform** combining:

- AI-powered market intelligence
- community-driven analysis
- creator economy
- premium research tools
- financial education engines
- scalable SEO infrastructure

The platform is built to support **millions of financial learning pages and analytical insights** across global markets.

---

# Platform Vision

Imperialpedia aims to become the **global intelligence hub for financial knowledge** by combining:

- AI market analysis
- structured financial education
- investor community collaboration
- creator-driven financial insights

The architecture is designed to scale for **1M+ SEO pages and millions of users**.

---

# Core Platform Modules

### AI Analyst Engine
Automated financial analysis including:

- asset summaries
- bull vs bear analysis
- catalyst detection
- earnings summaries
- macro analysis
- scenario modeling
- risk detection
- social sentiment tracking

Location

```
app/ai-analyst/
```

---

### Community Intelligence

Investor collaboration features:

- debates
- discussions
- contests
- sentiment voting
- leaderboards
- reputation systems

Location

```
app/community/
```

---

### Creator Economy

Allows analysts and writers to publish insights and build audiences.

Features include:

- creator profiles
- followers
- analytics
- revenue tracking
- verification system
- content scheduling

Location

```
app/creator/
app/creators/
```

---

### Editorial System

Full editorial workflow similar to media organizations.

Includes:

- article drafts
- submission system
- review console
- publishing workflow
- moderation tools

Location

```
app/editor/
app/writer/
```

---

### Financial Tools

Interactive calculators and planning tools:

- compound interest
- inflation calculators
- retirement planning
- investment growth projections
- loan analysis

Location

```
app/financial-tools/
```

---

### Premium Research Platform

Advanced features for professional investors.

Includes:

- advanced analytics
- backtesting tools
- market heatmaps
- premium reports
- stock screeners

Location

```
app/premium/
```

---

### Knowledge Graph

Financial knowledge relationships between:

- companies
- concepts
- sectors
- market events
- educational content

Location

```
modules/content-engine/components/KnowledgeGraph
```

---

### SEO Engine

Built for massive SEO scalability with:

- structured data generation
- canonical management
- breadcrumb generation
- automated sitemap systems

Location

```
modules/seo/
modules/seo-engine/
```

---

### Admin Control Center

Full platform administration tools including:

- user management
- permissions
- role systems
- audit logs
- infrastructure monitoring
- feature flags
- CDN management
- localization
- security monitoring

Location

```
app/admin/
```

---

# Tech Stack

Frontend Framework

- Next.js 14
- App Router
- React
- TypeScript

Styling

- TailwindCSS
- Design System Tokens
- Custom UI Component Library

State Management

- Zustand Stores
- React Context

Architecture

- Modular domain-driven structure
- mock API layer for development
- scalable service architecture

SEO Infrastructure

- dynamic metadata generation
- JSON-LD structured data
- canonical services
- sitemap generation

---

# Project Architecture

The project follows a **domain modular architecture** where each major system is isolated into its own module.

```
app/                 → Next.js routes
components/          → shared UI components
config/              → platform configuration
design-system/       → design tokens & themes
hooks/               → reusable hooks
lib/                 → utilities and helpers
modules/             → domain modules
services/            → data services
types/               → global TypeScript types
```

---

# Folder Structure Overview

```
app/
 ├ admin/
 ├ ai-analyst/
 ├ articles/
 ├ calculators/
 ├ community/
 ├ creator/
 ├ creators/
 ├ dashboard/
 ├ editor/
 ├ financial-tools/
 ├ glossary/
 ├ knowledge-map/
 ├ learning-paths/
 ├ premium/
 ├ search/
 ├ tags/
 ├ topics/
 └ writer/
```

Full architecture documentation is available in:

```
docs/PROJECT_STRUCTURE.md
```

---

# Development Setup

Clone the repository

```
git clone https://github.com/your-repo/imperialpedia.git
```

Install dependencies

```
npm install
```

Start development server

```
npm run dev
```

Application runs at

```
http://localhost:3000
```

---

# Environment Configuration

Environment variables are managed in:

```
config/env.ts
```

Example:

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ANALYTICS_ID=
```

---

# Platform Features

AI Market Intelligence

- automated financial summaries
- risk detection
- catalyst identification

Community Finance Platform

- debates
- investor discussions
- sentiment tracking

Creator Platform

- analyst profiles
- monetization tools
- trust verification

SEO Engine

- automated metadata
- dynamic schema generation
- massive scalable indexing

Premium Investment Tools

- research dashboards
- market analytics
- backtesting tools

---

# Future Roadmap

Planned platform expansion includes:

- AI portfolio assistant
- real-time market data integrations
- financial course marketplace
- institutional analytics tools
- multi-language financial knowledge base

---

# Contribution

Contributions are welcome.

If you want to improve the platform:

1. Fork the repository
2. Create a new feature branch
3. Submit a pull request

---

# License

This project is licensed under the MIT License.

---

# Author



Folder 

|   |   |       page.tsx
|   |   |
|   |   +---audit-logs
|   |   |       page.tsx
|   |   |
|   |   +---backup
|   |   |       page.tsx
|   |   |
|   |   +---categories
|   |   |       page.tsx
|   |   |
|   |   +---control
|   |   |   +---access
|   |   |   |       AccessManagementClient.tsx
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---activity-log
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---alerts
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---alerts-system
|   |   |   |       AdvancedAlertsClient.tsx
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---audit-trail
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---backups
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---branding
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---cdn
|   |   |   |       CdnManagementClient.tsx
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---edge
|   |   |   |       EdgeComputingClient.tsx
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---experiments
|   |   |   |       ExperimentConsoleClient.tsx
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---features
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---health
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---home
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---incidents
|   |   |   |       IncidentResponseClient.tsx
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---infrastructure
|   |   |   |       InfrastructureClient.tsx
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---localization
|   |   |   |       LocalizationClient.tsx
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---moderation
|   |   |   |   |   page.tsx
|   |   |   |   |
|   |   |   |   +---ai-hub
|   |   |   |   |       page.tsx
|   |   |   |   |
|   |   |   |   \---approvals
|   |   |   |           page.tsx
|   |   |   |
|   |   |   +---notifications
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---permissions
|   |   |   |   |   page.tsx
|   |   |   |   |
|   |   |   |   \---assign
|   |   |   |           page.tsx
|   |   |   |
|   |   |   +---roles
|   |   |   |   |   page.tsx
|   |   |   |   |
|   |   |   |   \---manage
|   |   |   |           page.tsx
|   |   |   |
|   |   |   +---security
|   |   |   |       page.tsx
|   |   |   |       SecurityMonitor.tsx
|   |   |   |
|   |   |   +---security-showcase
|   |   |   |       AuthFlowMock.tsx
|   |   |   |       page.tsx
|   |   |   |       SecurityFlags.tsx
|   |   |   |
|   |   |   +---seo
|   |   |   |       page.tsx
|   |   |   |       SeoManagementClient.tsx
|   |   |   |
|   |   |   +---sessions
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---settings
|   |   |   |       page.tsx
|   |   |   |
|   |   |   \---users
|   |   |       |   page.tsx
|   |   |       |
|   |   |       \---activation
|   |   |               page.tsx
|   |   |
|   |   +---creators
|   |   |   \---verification
|   |   |           page.tsx
|   |   |
|   |   +---dashboard
|   |   |       page.tsx
|   |   |
|   |   +---errors
|   |   |       page.tsx
|   |   |
|   |   +---feature-flags
|   |   |       page.tsx
|   |   |
|   |   +---health
|   |   |       page.tsx
|   |   |
|   |   +---media
|   |   |       page.tsx
|   |   |
|   |   +---moderation
|   |   |       page.tsx
|   |   |
|   |   +---notification-logs
|   |   |       page.tsx
|   |   |
|   |   +---notifications
|   |   |       page.tsx
|   |   |
|   |   +---roles
|   |   |       page.tsx
|   |   |
|   |   +---scheduler
|   |   |       page.tsx
|   |   |
|   |   +---seo-audit
|   |   |       page.tsx
|   |   |
|   |   +---settings
|   |   |       page.tsx
|   |   |
|   |   +---system-hub
|   |   |       page.tsx
|   |   |
|   |   +---tags
|   |   |       page.tsx
|   |   |
|   |   \---users
|   |           page.tsx
|   |
|   +---ai-analyst
|   |   |   page.tsx
|   |   |
|   |   +---asset-summary
|   |   |       AssetSummaryClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---automated-recap
|   |   |       page.tsx
|   |   |
|   |   +---bear-case
|   |   |       page.tsx
|   |   |
|   |   +---bull-case
|   |   |       page.tsx
|   |   |
|   |   +---catalyst-detection
|   |   |       page.tsx
|   |   |
|   |   +---compare
|   |   |       page.tsx
|   |   |
|   |   +---daily-briefing
|   |   |       page.tsx
|   |   |
|   |   +---earnings-summary
|   |   |       page.tsx
|   |   |
|   |   +---event-intelligence
|   |   |       EventIntelligenceClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---macro-summary
|   |   |       page.tsx
|   |   |
|   |   +---model-performance
|   |   |       page.tsx
|   |   |
|   |   +---multi-compare
|   |   |       page.tsx
|   |   |
|   |   +---news-summary
|   |   |       page.tsx
|   |   |
|   |   +---risk-detection
|   |   |       page.tsx
|   |   |
|   |   +---scenario-modeling
|   |   |       page.tsx
|   |   |       ScenarioModelingClient.tsx
|   |   |
|   |   +---sector-overview
|   |   |       page.tsx
|   |   |
|   |   +---social-sentiment
|   |   |       page.tsx
|   |   |
|   |   +---trend-explanation
|   |   |       page.tsx
|   |   |
|   |   \---weekly-digest
|   |           page.tsx
|   |
|   +---articles
|   |   |   page.tsx
|   |   |
|   |   \---[slug]
|   |           page.tsx
|   |
|   +---calculators
|   |   \---[slug]
|   |           page.tsx
|   |
|   +---categories
|   |   \---[slug]
|   |           page.tsx
|   |
|   +---community
|   |   |   page.tsx
|   |   |
|   |   +---contests
|   |   |   |   ContestsClient.tsx
|   |   |   |   page.tsx
|   |   |   |
|   |   |   \---[id]
|   |   |           page.tsx
|   |   |
|   |   +---debates
|   |   |   |   DebatesClient.tsx
|   |   |   |   page.tsx
|   |   |   |
|   |   |   \---[id]
|   |   |           DebateRoomClient.tsx
|   |   |           page.tsx
|   |   |
|   |   +---discussions
|   |   |   |   page.tsx
|   |   |   |
|   |   |   \---[id]
|   |   |           page.tsx
|   |   |
|   |   +---leaderboard
|   |   |       LeaderboardClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---profile
|   |   |   \---predictions
|   |   |           page.tsx
|   |   |
|   |   +---rankings
|   |   |       page.tsx
|   |   |       RankingsClient.tsx
|   |   |
|   |   +---reputation
|   |   |       page.tsx
|   |   |       ReputationClient.tsx
|   |   |
|   |   \---sentiment
|   |           page.tsx
|   |           SentimentClient.tsx
|   |
|   +---creator
|   |   +---dashboard
|   |   |   |   page.tsx
|   |   |   |
|   |   |   +---analytics
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---create
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---editor
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---notifications
|   |   |   |       CreatorNotificationsClient.tsx
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---revenue
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---schedule
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---settings
|   |   |   |       page.tsx
|   |   |   |       SettingsClient.tsx
|   |   |   |
|   |   |   \---verification
|   |   |           page.tsx
|   |   |           VerificationClient.tsx
|   |   |
|   |   \---[id]
|   |       |   CreatorProfileClient.tsx
|   |       |   page.tsx
|   |       |
|   |       +---content
|   |       |       CreatorContentClient.tsx
|   |       |       page.tsx
|   |       |
|   |       \---followers
|   |               FollowersClient.tsx
|   |               page.tsx
|   |
|   +---creators
|   |   |   CreatorDiscoveryClient.tsx
|   |   |   page.tsx
|   |   |
|   |   +---leaderboards
|   |   |       LeaderboardClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---profile
|   |   |       page.tsx
|   |   |
|   |   \---trust
|   |           page.tsx
|   |           TrustDirectoryClient.tsx
|   |
|   +---dashboard
|   |   |   DashboardClient.tsx
|   |   |   page.tsx
|   |   |
|   |   +---alerts
|   |   |       AlertsNotificationsClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---portfolio
|   |   |       page.tsx
|   |   |       PortfolioTrackerClient.tsx
|   |   |
|   |   \---recommendations
|   |           page.tsx
|   |           RecommendationsClient.tsx
|   |
|   +---editor
|   |   |   layout.tsx
|   |   |   page.tsx
|   |   |
|   |   +---activity-log
|   |   |       page.tsx
|   |   |
|   |   +---approved
|   |   |       page.tsx
|   |   |
|   |   +---assignments
|   |   |       page.tsx
|   |   |
|   |   +---dashboard
|   |   |       page.tsx
|   |   |
|   |   +---history
|   |   |       page.tsx
|   |   |
|   |   +---pending
|   |   |       page.tsx
|   |   |
|   |   +---queue
|   |   |       page.tsx
|   |   |
|   |   +---review
|   |   |   \---[id]
|   |   |       |   page.tsx
|   |   |       |   ReviewConsole.tsx
|   |   |       |
|   |   |       \---history
|   |   |               page.tsx
|   |   |
|   |   \---workflow
|   |           page.tsx
|   |
|   +---financial-tools
|   |   |   page.tsx
|   |   |
|   |   +---compound-interest
|   |   |       CompoundInterestClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---inflation
|   |   |       InflationClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---investment
|   |   |       InvestmentClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---loan
|   |   |       LoanClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---portfolio
|   |   |       page.tsx
|   |   |       PortfolioClient.tsx
|   |   |
|   |   \---retirement
|   |           page.tsx
|   |           RetirementClient.tsx
|   |
|   +---glossary
|   |   |   page.tsx
|   |   |
|   |   \---[slug]
|   |           page.tsx
|   |
|   +---knowledge-map
|   |       page.tsx
|   |
|   +---learning-paths
|   |       page.tsx
|   |
|   +---maintenance
|   |       page.tsx
|   |
|   +---market
|   |       page.tsx
|   |
|   +---outline
|   |       page.tsx
|   |
|   +---premium
|   |   +---analytics
|   |   |       page.tsx
|   |   |       PremiumAnalyticsClient.tsx
|   |   |
|   |   +---backtesting
|   |   |       BacktestingClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---dashboard
|   |   |       page.tsx
|   |   |       PremiumDashboardClient.tsx
|   |   |
|   |   +---deep-dive
|   |   |       page.tsx
|   |   |       PremiumDeepDiveClient.tsx
|   |   |
|   |   +---market-heatmap
|   |   |       MarketHeatmapClient.tsx
|   |   |       page.tsx
|   |   |
|   |   +---reports
|   |   |       page.tsx
|   |   |       PremiumReportsClient.tsx
|   |   |
|   |   +---screener
|   |   |       page.tsx
|   |   |       ScreenerClient.tsx
|   |   |
|   |   \---subscribe
|   |           page.tsx
|   |           PremiumClient.tsx
|   |
|   +---search
|   |       page.tsx
|   |
|   +---sitemap.xml
|   |       route.ts
|   |
|   +---tags
|   |   \---[slug]
|   |           page.tsx
|   |
|   +---topics
|   |       page.tsx
|   |       TopicIndexClient.tsx
|   |
|   +---transparency
|   |       page.tsx
|   |       TransparencyClient.tsx
|   |
|   \---writer
|       |   layout.tsx
|       |   page.tsx
|       |
|       +---drafts
|       |       page.tsx
|       |
|       +---new
|       |       page.tsx
|       |
|       +---notifications
|       |       page.tsx
|       |
|       \---submissions
|               page.tsx
|
+---components
|   +---layout
|   |       Footer.tsx
|   |       Header.tsx
|   |       MobileMenu.tsx
|   |       Navigation.tsx
|   |       Sidebar.tsx
|   |
|   \---ui
|           accordion.tsx
|           alert-dialog.tsx
|           alert.tsx
|           avatar.tsx
|           badge.tsx
|           button.tsx
|           calendar.tsx
|           card.tsx
|           carousel.tsx
|           chart.tsx
|           checkbox.tsx
|           collapsible.tsx
|           dialog.tsx
|           dropdown-menu.tsx
|           form.tsx
|           input.tsx
|           label.tsx
|           menubar.tsx
|           pagination.tsx
|           popover.tsx
|           progress.tsx
|           radio-group.tsx
|           scroll-area.tsx
|           select.tsx
|           separator.tsx
|           sheet.tsx
|           sidebar.tsx
|           skeleton.tsx
|           slider.tsx
|           switch.tsx
|           table.tsx
|           tabs.tsx
|           textarea.tsx
|           toast.tsx
|           toaster.tsx
|           tooltip.tsx
|
+---config
|       env.ts
|       index.ts
|       platform.ts
|       routes.ts
|       seo.ts
|
+---design-system
|   |   index.ts
|   |
|   +---layout
|   |       container.tsx
|   |       grid.tsx
|   |       layout-tokens.ts
|   |       section.tsx
|   |       stack.tsx
|   |
|   +---themes
|   |       dark-theme.ts
|   |       light-theme.ts
|   |       theme-provider.tsx
|   |
|   +---tokens
|   |       colors.ts
|   |       radius.ts
|   |       shadows.ts
|   |       spacing.ts
|   |
|   \---typography
|           font-scale.ts
|           fonts.ts
|           text.tsx
|           typography.ts
|
+---hooks
|       use-mobile.tsx
|       use-toast.ts
|
+---lib
|   |   placeholder-images.json
|   |   placeholder-images.ts
|   |   utils.ts
|   |
|   +---errors
|   |       AppError.ts
|   |       error-handler.ts
|   |       logger.ts
|   |
|   +---seo
|   |       index.ts
|   |       metadata-builder.ts
|   |       structured-data.ts
|   |
|   \---state
|           app-store.tsx
|           calculator-store.tsx
|           index.ts
|           store.tsx
|           ui-store.tsx
|
+---modules
|   +---admin
|   |   +---components
|   |   |       index.ts
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |
|   +---analytics
|   |   +---components
|   |   |       index.ts
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |
|   +---calculators
|   |   +---components
|   |   |       CalculatorCard.tsx
|   |   |       CalculatorResultModal.tsx
|   |   |       index.ts
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           calculations.test.ts
|   |           calculations.ts
|   |           index.ts
|   |
|   +---cms
|   |   +---components
|   |   |       index.ts
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |
|   +---community
|   |   \---components
|   |           ArgumentCard.tsx
|   |           AssetSentimentCard.tsx
|   |           ContestCard.tsx
|   |           ContestLeaderboard.tsx
|   |           DebateCard.tsx
|   |           DebateTimeline.tsx
|   |           DiscussionCard.tsx
|   |           DiscussionSidebar.tsx
|   |           NewDiscussionForm.tsx
|   |           PredictionForm.tsx
|   |           PredictionHistory.tsx
|   |           SentimentVoteHistory.tsx
|   |
|   +---content-engine
|   |   +---components
|   |   |   |   ArticleBody.tsx
|   |   |   |   ArticleCard.tsx
|   |   |   |   ArticleEditor.tsx
|   |   |   |   ArticleHeader.tsx
|   |   |   |   ArticleList.tsx
|   |   |   |   ArticlePage.tsx
|   |   |   |   ArticleSection.tsx
|   |   |   |   CategoryHeader.tsx
|   |   |   |   CommentCard.tsx
|   |   |   |   CommunitySection.tsx
|   |   |   |   ContentBlockRenderer.tsx
|   |   |   |   index.ts
|   |   |   |   OutlineGenerator.tsx
|   |   |   |   PollCard.tsx
|   |   |   |   RelatedArticles.tsx
|   |   |   |   SearchResults.tsx
|   |   |   |   TableOfContents.tsx
|   |   |   |   TagList.tsx
|   |   |   |   TrendingDiscussions.tsx
|   |   |   |
|   |   |   +---CommentIntelligence
|   |   |   |       CommentAnalytics.tsx
|   |   |   |       CommentHighlights.tsx
|   |   |   |       CommentIntelligenceHub.tsx
|   |   |   |
|   |   |   +---KnowledgeGraph
|   |   |   |       ArticleConnectionDisplay.tsx
|   |   |   |       ExplorerSidebar.tsx
|   |   |   |       GraphVisualizer.tsx
|   |   |   |       KnowledgeGraphHub.tsx
|   |   |   |       NodeDetailPanel.tsx
|   |   |   |
|   |   |   +---QualityScoring
|   |   |   |       ImprovementPanel.tsx
|   |   |   |       QualityFactorsPanel.tsx
|   |   |   |       QualityScoreGauge.tsx
|   |   |   |
|   |   |   \---VersionControl
|   |   |           EditTimeline.tsx
|   |   |           VersionComparator.tsx
|   |   |           VersionMetadata.tsx
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---models
|   |   |       article.ts
|   |   |       block.ts
|   |   |       category.ts
|   |   |       section.ts
|   |   |       tag.ts
|   |   |
|   |   +---services
|   |   |       category-service.ts
|   |   |       content-service.ts
|   |   |       index.ts
|   |   |       search-service.ts
|   |   |       tag-service.ts
|   |   |
|   |   +---types
|   |   |       article.ts
|   |   |       block.ts
|   |   |       category.ts
|   |   |       index.ts
|   |   |       section.ts
|   |   |       tag.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |           slugify.ts
|   |
|   +---core
|   |   |   index.ts
|   |   |   types.ts
|   |   |
|   |   +---components
|   |   |       index.ts
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |
|   +---creators
|   |   +---components
|   |   |       AnalystPerformanceDashboard.tsx
|   |   |       CreatorCard.tsx
|   |   |       CredibilityTimeline.tsx
|   |   |       FollowerCard.tsx
|   |   |       index.ts
|   |   |       TrustScoreGauge.tsx
|   |   |       TrustVerificationPanel.tsx
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |
|   +---design-system
|   |   +---components
|   |   |       index.ts
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |
|   +---glossary-engine
|   |   +---components
|   |   |       index.ts
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |
|   +---layout-system
|   |   +---components
|   |   |       index.ts
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |
|   +---search
|   |   +---components
|   |   |       index.ts
|   |   |
|   |   +---hooks
|   |   |       index.ts
|   |   |
|   |   +---mock-api
|   |   |       index.ts
|   |   |
|   |   +---services
|   |   |       index.ts
|   |   |
|   |   +---types
|   |   |       index.ts
|   |   |
|   |   \---utils
|   |           index.ts
|   |
|   +---seo
|   |   +---components
|   |   |       AlphabetNav.tsx
|   |   |
|   |   +---models
|   |   |       faq.ts
|   |   |       glossary-term.ts
|   |   |
|   |   +---services
|   |   |       canonical-service.ts
|   |   |       glossary-service.ts
|   |   |       link-service.ts
|   |   |       schema-service.ts
|   |   |       seo-audit-service.ts
|   |   |       sitemap-service.ts
|   |   |
|   |   \---types
|   |           glossary-types.ts
|   |
|   \---seo-engine
|       +---components
|       |       Breadcrumbs.tsx
|       |       index.ts
|       |       JsonLd.tsx
|       |
|       +---hooks
|       |       index.ts
|       |
|       +---mock-api
|       |       index.ts
|       |
|       +---services
|       |       breadcrumb-service.ts
|       |       index.ts
|       |       seo-service.ts
|       |
|       +---types
|       |       index.ts
|       |
|       \---utils
|               index.ts
|
+---services
|   |   mock-api.ts
|   |
|   +---api-client
|   |       client.ts
|   |       index.ts
|   |
|   +---data
|   |       analytics-service.ts
|   |       articles-service.ts
|   |       calculators-service.ts
|   |       community-service.ts
|   |       creators-service.ts
|   |       dashboard-service.ts
|   |       glossary-service.ts
|   |       index.ts
|   |       knowledge-graph-service.ts
|   |       moderation-service.ts
|   |       premium-service.ts
|   |       search-service.ts
|   |       system-service.ts
|   |       users-service.ts
|   |
|   \---mock-api
|           admin-cms.ts
|           analytics.ts
|           articles.ts
|           audit.ts
|           calculators.ts
|           comments.ts
|           community.ts
|           content-quality.ts
|           creators.ts
|           editorial.ts
|           glossary.ts
|           index.ts
|           knowledge-graph.ts
|           media.ts
|           moderation.ts
|           premium.ts
|           roles.ts
|           scheduler.ts
|           search.ts
|           system.ts
|           topics.ts
|           transparency.ts
|           user-dashboard.ts
|           users.ts
|           version-control.ts
|
\---types
        analytics.ts
        api.ts
        common.ts
        community.ts
        content-quality.ts
        content.ts
        creator.ts
        editorial.ts
        financial-tools.ts
        glossary.ts
        index.ts
        knowledge-graph.ts
        moderation.ts
        platform.ts
        premium.ts
        search.ts
        seo.ts
        system.ts
        topics.ts
        trust.ts
        user-system.ts
        version-control.ts

Imperialpedia Development Team
