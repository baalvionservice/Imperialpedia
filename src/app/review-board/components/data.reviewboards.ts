import { NewsArticle } from "@/lib/data.news";

export type ReviewBoardMember = {
  name: string;
  role: string;
  image: string;
  slug: string;
  shortBio: string;
};

export const reviewBoardMembers: ReviewBoardMember[] = [
  {
    name: "Anthony Battle",
    role: "Financial Review Board Member",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format",
    slug: "anthony-battle",
    shortBio:
      "Anthony Battle is a financial planning expert, entrepreneur, dedicated life long learner and a recovering Wall Street professional. He has been working in the finance industry for 15+ years and is a fierce advocate for including financial literacy as a basic educational requirement in public education. Anthony is a CERTIFIED FINANCIAL PLANNER™ professional. He has earned the Chartered Financial Consultant® designation for advanced financial planning, the Chartered Life Underwriter® designation for advanced insurance specialization, the Accredited Financial Counselor® for Financial Counseling and both the Retirement Income Certified Professional®, and Certified Retirement Counselor designations for advance retirement planning.",
  },
  {
    name: "Sarah Johnson",
    role: "Senior Investment Analyst",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format",
    slug: "sarah-johnson",
    shortBio:
      "Dr. Melody Bell is a personal finance expert, entrepreneur, educator, and researcher. Melody founded Financial Beginnings in 2005 after a career in finance, during which she repeatedly encountered individuals who were forced to delay life goals such as higher education, homeownership, and retirement after failing to navigate the increasingly complex and predatory financial system. Financial Beginnings is now a national nonprofit that serves tens of thousands each year. For over a decade, Melody has taught at her alma mater, Portland State University. Courses taught have included personal finance, managerial finance, and entrepreneurship. Special projects at Portland State University have included new course development and piloting new teaching modalities. In 2016, Melody was recognized as Adjunct Professor of the Year.",
  },
  {
    name: "David Kim",
    role: "Trading Specialist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format",
    slug: "david-kim",
    shortBio:
      "Thomas J. Brock is a Chartered Financial Analyst and a Certified Public Accountant with more than two decades of experience in a variety of corporate and individual settings. In a corporate setting, he oversees a $4 billion insurance portfolio that includes $650 million in life insurance assets, facilitates investment risk assessments, formulates asset allocation recommendations, manages relationships with external advisors and money managers, and ensures compliance. In personal settings, Thomas has provided financial planning and investment management services to individuals. In those roles, he's offered retirement plans, investment policies, and in-depth education on asset classes, investment strategies, personal finance topics, insurance, and annuities.",
  },
];

export const reviewBoardProfiles: NewsArticle[] = [
  {
    id: "anthony-battle",
    title: "Anthony Battle",
    excerpt:
      "Anthony Battle is a financial expert with deep experience in investment strategies, portfolio management, and market analysis.",

    category: "Editorial",
    author: {
      name: "Investopedia Team",
      avatarUrl:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80&auto=format",
    },

    publishedAt: "2026-03-01",
    readTimeMinutes: 5,

    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80&auto=format",
    imageCaption: "Anthony Battle, Financial Expert",

    slug: "anthony-battle",

    tags: ["finance", "expert", "review-board"],

    keyTakeaways: [
      "Experienced in investment strategies",
      "Specializes in portfolio management",
      "Provides financial education insights",
    ],

    body: [
      {
        type: "heading",
        text: "About Anthony Battle",
      },
      {
        type: "paragraph",
        text: "Anthony Battle is a financial expert with years of experience in investment strategy, wealth management, and financial education.",
      },

      {
        type: "heading",
        text: "Professional Background",
      },
      {
        type: "paragraph",
        text: "Anthony has worked with multiple financial institutions, helping clients optimize their portfolios and manage risk effectively.",
      },

      {
        type: "list",
        items: [
          "10+ years in financial markets",
          "Expert in portfolio diversification",
          "Advisor for high-net-worth individuals",
        ],
      },

      {
        type: "heading",
        text: "Areas of Expertise",
      },
      {
        type: "list",
        items: [
          "Investment Strategy",
          "Risk Management",
          "Wealth Planning",
          "Market Analysis",
        ],
      },

      {
        type: "quote",
        text: "Successful investing is about managing risk, not avoiding it.",
        attribution: "Anthony Battle",
      },

      {
        type: "callout",
        text: "Anthony focuses on long-term wealth building rather than short-term speculation.",
      },
    ],
  },
];
