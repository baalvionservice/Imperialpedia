import { ApiResponse } from '@/types';
import { 
  CommunityData, 
  Comment, 
  Poll, 
  UserReputation, 
  LeaderboardEntry, 
  PredictionContest, 
  ReputationEntry, 
  LeaderboardItem,
  CommunityRankingsData,
  RankedUser,
  ContestLeaderboardEntry,
  UserPrediction,
  AssetSentiment,
  UserSentimentVote,
  DiscussionNode,
  TrendingTopic
} from '@/types/community';

/**
 * @fileOverview Mock service for the Community and Engagement engine.
 */

const mockComments: Comment[] = [
  {
    id: 'c-1',
    comment_id: 1,
    username: 'MarketWatchdog',
    reputation: 1240,
    reputationScore: 1240,
    badge: 'Elite Analyst',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    timestamp: '2h ago',
    content: 'The 2-10 spread inversion is widening. Historical data suggests a 12-18 month lead time to a full fiscal contraction.',
    text: 'The 2-10 spread inversion is widening. Historical data suggests a 12-18 month lead time to a full fiscal contraction.',
    upvotes: 42,
    downvotes: 3,
    bullBearVote: 'Bear',
    bull_bear: 'Bear',
    replies: [
      {
        id: 'c-1-1',
        comment_id: 2,
        parent_id: 1,
        username: 'Julian Wealth',
        reputation: 8500,
        reputationScore: 8500,
        badge: 'Verified Expert',
        avatar: 'https://picsum.photos/seed/wealth/200/200',
        timestamp: '1h ago',
        content: 'Correct, but we should also consider the high consumer cash reserves which might buffer the landing.',
        text: 'Correct, but we should also consider the high consumer cash reserves which might buffer the landing.',
        upvotes: 12,
        downvotes: 1,
        bullBearVote: 'Neutral',
        bull_bear: 'Neutral',
      }
    ]
  },
  {
    id: 'c-3',
    comment_id: 3,
    username: 'AlphaHunter',
    reputation: 3200,
    reputationScore: 3200,
    badge: 'Precision Lead',
    avatar: 'https://picsum.photos/seed/alpha/200/200',
    timestamp: '4h ago',
    content: 'Retail is heavily shorting this level. Liquidity grab to the upside seems inevitable before any real correction.',
    text: 'Retail is heavily shorting this level. Liquidity grab to the upside seems inevitable before any real correction.',
    upvotes: 85,
    downvotes: 12,
    bullBearVote: 'Bull',
    bull_bear: 'Bull',
  }
];

const mockDiscussions: DiscussionNode[] = [
  {
    id: 'd-1',
    title: "Will Bitcoin hit $100k this cycle?",
    category: "Cryptocurrency",
    author: "David Kim",
    authorAvatar: "https://picsum.photos/seed/david/100/100",
    comments: 284,
    likes: 1250,
    views: 18200,
    timestamp: "2h ago",
    trending_score: 98,
    content: "The institutional absorption rate of the Spot ETFs is unprecedented. If we maintain the current daily inflow of $500M, the supply crunch alone could push us past six figures by Q4. What is the community consensus on the next major resistance node?",
    asset_tag: "BTC"
  },
  {
    id: 'd-2',
    title: "Are AI stocks in a technical bubble?",
    category: "Stocks",
    author: "Sophia Martinez",
    authorAvatar: "https://picsum.photos/seed/sophia/100/100",
    comments: 192,
    likes: 840,
    views: 13400,
    timestamp: "5h ago",
    trending_score: 85,
    content: "Valuations for NVDA and the secondary chip cluster are reaching 2000-era dotcom levels on a price-to-sales basis. While revenue growth is real, is the forward guidance pricing in too much perfection? Analyzing the historical exit of late-cycle retail buyers.",
    asset_tag: "NVDA"
  },
  {
    id: 'd-3',
    title: "Impact of interest rate cuts on emerging market stocks",
    category: "Macro",
    author: "Julian Wealth",
    authorAvatar: "https://picsum.photos/seed/wealth/100/100",
    comments: 124,
    likes: 450,
    views: 9800,
    timestamp: "Yesterday",
    trending_score: 72,
    content: "As the Fed pivots, the carry-trade landscape is shifting. We are seeing significant capital rotation into high-yield emerging nodes. Which regions are best positioned for a weaker USD environment?",
    asset_tag: "EEM"
  },
  {
    id: 'd-4',
    title: "Tesla valuation debate: Tech vs Auto",
    category: "Economy",
    author: "Eleanor Vance",
    authorAvatar: "https://picsum.photos/seed/eleanor/100/100",
    comments: 450,
    likes: 2100,
    views: 45000,
    timestamp: "3h ago",
    trending_score: 92,
    content: "The market continues to treat TSLA as an AI/Robotics play, yet core margins are still derived from hardware delivery. If FSD licensing becomes a reality this year, how do we re-calculate the earnings multiple?",
    asset_tag: "TSLA"
  }
];

const mockTopics: TrendingTopic[] = [
  { name: "Bitcoin ETFs", engagement: 8200, count: 12 },
  { name: "AI Stocks", engagement: 7600, count: 8 },
  { name: "Federal Reserve Policy", engagement: 6900, count: 15 },
  { name: "Recession Risk", engagement: 5400, count: 6 },
  { name: "Tech Earnings Season", engagement: 4200, count: 9 },
];

const mockContests: PredictionContest[] = [
  {
    id: 'con-1',
    title: "Bitcoin Weekly Close Prediction",
    asset: "BTC",
    question: "Where will Bitcoin close this Sunday?",
    description: "Forecast the exact closing price of BTC/USD on Coinbase. Precision is measured to 2 decimal places.",
    participants: 842,
    status: "Active",
    startDate: "2026-03-10",
    endDate: "2026-03-17",
    prize: "500 Reputation Nodes"
  },
  {
    id: 'con-2',
    title: "S&P 500 Monthly Direction",
    asset: "SPX",
    question: "Will the S&P 500 close higher this month?",
    description: "Predict the directional trajectory of the SPX index relative to the opening bell of the first trading day.",
    participants: 1250,
    status: "Upcoming",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    prize: "Exclusive 'Oracle' Badge"
  },
  {
    id: 'con-3',
    title: "NVIDIA Earnings Target",
    asset: "NVDA",
    question: "What will be NVDA reported revenue for Q1?",
    description: "Audit the fiscal reports. Predict the reported revenue beats/misses.",
    participants: 2100,
    status: "Completed",
    startDate: "2026-02-15",
    endDate: "2026-02-22",
    outcome: "$26.4B (Beat)",
    winnerList: ["MarketMaven", "AlphaTracker", "ValueHunter"]
  }
];

const mockContestLeaderboard: ContestLeaderboardEntry[] = [
  { rank: 1, user: "Alex Carter", prediction: "BTC $64,250", accuracy: "94%", points: 420, avatar: "https://picsum.photos/seed/alex/100/100" },
  { rank: 2, user: "Emma Wilson", prediction: "BTC $63,800", accuracy: "91%", points: 395, avatar: "https://picsum.photos/seed/emma/100/100" },
  { rank: 3, user: "Julian Wealth", prediction: "BTC $65,100", accuracy: "88%", points: 350, avatar: "https://picsum.photos/seed/julian/100/100" },
  { rank: 4, user: "Sarah Crypto", prediction: "BTC $62,900", accuracy: "85%", points: 310, avatar: "https://picsum.photos/seed/sarah/100/100" },
  { rank: 5, user: "NodeExplorer", prediction: "BTC $66,000", accuracy: "82%", points: 280, avatar: "https://picsum.photos/seed/node/100/100" },
];

const mockUserPredictions: UserPrediction[] = [
  { id: 'p-1', contestName: "Bitcoin Weekly Close", asset: "BTC", prediction: "$64,200", result: "Pending", points: 0, date: "2026-03-12" },
  { id: 'p-2', contestName: "NVIDIA Earnings Target", asset: "NVDA", prediction: "$25.8B", result: "Correct", points: 450, rank: 12, date: "2026-02-20" },
  { id: 'p-3', contestName: "Fed Interest Rate Hike", asset: "FED", prediction: "25bps", result: "Incorrect", points: 10, date: "2026-01-15" },
];

/**
 * Prompt 63: Community Sentiment Data
 */
const generateHistory = () => Array.from({ length: 7 }, (_, i) => ({
  date: `2026-03-0${i + 9}`,
  bullish: Math.floor(Math.random() * 30) + 50,
  price_proxy: 100 + Math.random() * 20
}));

const mockAssetSentiment: AssetSentiment[] = [
  { id: 's-1', name: "Apple", ticker: "AAPL", bullish: 68, bearish: 32, votes: 4200, trend: 'Up', history: generateHistory() },
  { id: 's-2', name: "Bitcoin", ticker: "BTC", bullish: 74, bearish: 26, votes: 8200, trend: 'Up', history: generateHistory() },
  { id: 's-3', name: "Tesla", ticker: "TSLA", bullish: 55, bearish: 45, votes: 3100, trend: 'Down', history: generateHistory() },
  { id: 's-4', name: "Ethereum", ticker: "ETH", bullish: 62, bearish: 38, votes: 5400, trend: 'Stable', history: generateHistory() },
  { id: 's-5', name: "S&P 500 Index", ticker: "SPX", bullish: 51, bearish: 49, votes: 12500, trend: 'Down', history: generateHistory() },
  { id: 's-6', name: "Gold", ticker: "XAU", bullish: 45, bearish: 55, votes: 2100, trend: 'Up', history: generateHistory() },
];

const mockUserSentimentHistory: UserSentimentVote[] = [
  { id: 'uv-1', asset: 'Bitcoin', ticker: 'BTC', vote: 'Bull', date: '2026-03-15', currentBullish: 74 },
  { id: 'uv-2', asset: 'Tesla', ticker: 'TSLA', vote: 'Bear', date: '2026-03-14', currentBullish: 55 },
  { id: 'uv-3', asset: 'Apple', ticker: 'AAPL', vote: 'Bull', date: '2026-03-12', currentBullish: 68 },
];

export const getAssetSentiment = async (): Promise<ApiResponse<AssetSentiment[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { data: mockAssetSentiment, status: 200 };
};

export const getUserSentimentHistory = async (): Promise<ApiResponse<UserSentimentVote[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { data: mockUserSentimentHistory, status: 200 };
};

export const getPredictionContests = async (): Promise<ApiResponse<PredictionContest[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { data: mockContests, status: 200 };
};

export const getContestLeaderboard = async (id: string): Promise<ApiResponse<ContestLeaderboardEntry[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { data: mockContestLeaderboard, status: 200 };
};

export const getUserPredictions = async (): Promise<ApiResponse<UserPrediction[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { data: mockUserPredictions, status: 200 };
};

const mockReputationList: ReputationEntry[] = [
  { 
    username: "User123", 
    avatar: "https://picsum.photos/seed/u123/200/200", 
    reputation_points: 120, 
    badges: ["Expert", "Top Contributor"], 
    contributions: { posts: 25, comments: 40, polls: 5 } 
  },
  { 
    username: "User456", 
    avatar: "https://picsum.photos/seed/u456/200/200", 
    reputation_points: 85, 
    badges: ["Contributor"], 
    contributions: { posts: 15, comments: 20, polls: 2 } 
  }
];

const mockLeaderboardsFull: LeaderboardItem[] = [
  { rank: 1, username: "User123", avatar: "https://picsum.photos/seed/u123/200/200", total_points: 120, badges: ["Expert", "Top Contributor"], trend: 'up' },
  { rank: 2, username: "AlphaHunter", avatar: "https://picsum.photos/seed/alpha/200/200", total_points: 110, badges: ["Oracle"], trend: 'stable' },
];

const mockRankedUsers: RankedUser[] = [
  { rank: 1, id: 'u-1', name: "Daniel Foster", username: "dfoster", avatar: "https://picsum.photos/seed/daniel/200/200", role: "Analyst", articles: 54, followers: 18200, engagement_score: 96, badge: "Top Contributor", reputation: 12450, trend: 'up' },
  { rank: 2, id: 'u-2', name: "Sophia Lee", username: "slee_invest", avatar: "https://picsum.photos/seed/sophia/200/200", role: "Author", articles: 38, followers: 14100, engagement_score: 91, badge: "Rising Star", reputation: 8200, trend: 'up' },
  { rank: 3, id: 'u-3', name: "Marcus Wealth", username: "mwealth", avatar: "https://picsum.photos/seed/marcus/200/200", role: "Analyst", articles: 24, followers: 12500, engagement_score: 88, badge: "Expert Analyst", reputation: 7500, trend: 'stable' },
  { rank: 4, id: 'u-4', name: "Elena Garcia", username: "egarcia", avatar: "https://picsum.photos/seed/elena/200/200", role: "Author", articles: 45, followers: 9800, engagement_score: 85, badge: "Community Mentor", reputation: 6800, trend: 'up' },
  { rank: 5, id: 'u-5', name: "Julian P.", username: "j_wealth", avatar: "https://picsum.photos/seed/julian/200/200", role: "Member", articles: 12, followers: 5400, engagement_score: 78, badge: "Most Helpful", reputation: 4200, trend: 'down' },
];

const mockCommunityRankings: CommunityRankingsData = {
  leaderboard: mockRankedUsers,
  categories: [
    "Global Rankings",
    "Top Authors",
    "Most Accurate Analysts",
    "Most Active Commenters",
    "Top Community Helpers",
    "Rising Contributors"
  ]
};

export const getCommunityRankings = async (): Promise<ApiResponse<CommunityRankingsData>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: mockCommunityRankings,
    status: 200,
  };
};

export const getCommunityData = async (): Promise<ApiResponse<CommunityData>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: {
      comments: mockComments,
      trendingDiscussions: ['Yield Curve 2026', 'Fed Liquidity', 'AI Chip Wars'],
      polls: [],
      userReputation: {
        username: 'User123',
        reputationScore: 120,
        level: 14,
        nextLevelProgress: 65,
        activityPoints: 120,
        badges: []
      },
      leaderboard: [],
      predictionContests: mockContests as any[],
      reputation_list: mockReputationList,
      leaderboards_full: mockLeaderboardsFull,
      discussions: mockDiscussions,
      topics: mockTopics
    },
    status: 200,
  };
};
