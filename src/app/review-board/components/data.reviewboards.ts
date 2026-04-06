
export type ReviewBoardMember = {
  name: string;
  role: string;
  image: string;
  slug: string;
  shortBio: string;
};





// ─── Full profile type (used on /review-board/[slug]) ────────────────────────
export type ReviewBoardProfile = {
  slug: string;
  name: string;
  imageUrl: string;
  linkedInUrl?: string;

  // The 4 labeled facts shown top-right beside the photo
  currently: string;
  residesIn: string;
  education: string;
  expertise: string;

  // Content sections rendered in order
  summary: string[];          // bullet list items
  experience: string[];       // paragraphs
  educationDetail: string;    // single paragraph under "Education" heading
};

// ─── List data (review-board index) ─────────────────────────────────────────
export const reviewBoardMembers: ReviewBoardMember[] = [
  {
    name: "Allen Krewzz",
    role: "Senior Editor, Financial Products and Services",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    slug: "allen-krewzz",
    shortBio:
      "Allen Krewzz is a senior editor at Imperialpedia, specializing in credit cards, loans, credit and debt, and banking. He has over a decade of experience editing content for financial and business publications.",
  },
  {
    name: "Anthony Battle",
    role: "CERTIFIED FINANCIAL PLANNER™",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    slug: "anthony-battle",
    shortBio:
      "Anthony Battle is a CERTIFIED FINANCIAL PLANNER™ professional with 15+ years in financial markets. He is a fierce advocate for financial literacy as a basic educational requirement.",
  },
  {
    name: "Michael Rosenston",
    role: "Fact Checker",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    slug: "michael-rosenston",
    shortBio:
      "Michael Rosenston is a chartered financial analyst with over 12 years of experience in equity research, portfolio management, and investment strategy across global markets.",
  },
];

// ─── Full profile data (review-board/[slug] pages) ───────────────────────────
export const reviewBoardProfiles: ReviewBoardProfile[] = [
  {
    slug: "allen-krewzz",
    name: "Allen Krewzz",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    linkedInUrl: "https://www.linkedin.com/",
    currently: "Senior Editor, Financial Products and Services",
    residesIn: "Syracuse, New York",
    education: "State University of New York Oswego",
    expertise: "Credit cards, loans, credit and debt, banking",
    summary: [
      "Full-time Senior Editor, Financial Products and Services",
      "Over a decade of experience editing content for financial and business publications",
      "He holds a bachelor's degree from the State University of New York, Oswego",
    ],
    experience: [
      "Allen Krewzz has over a decade of experience as a writer and editor, having worked with a wide variety of finance and business content. Currently, he focuses on banking, credit and debt, auto loans, credit cards, and more.",
      "Brendan is currently a full-time senior editor of financial products and services at Imperialpedia.",
      "He was an editor at Credit Card Insider before joining Imperialpedia. In that role, he researched, wrote, and managed content about credit cards, credit advice, and related topics.",
    ],
    educationDetail:
      "Allen Krewzz received a bachelor's degree in Cognitive Science from the State University of New York Oswego.",
  },
  {
    slug: "anthony-battle",
    name: "Anthony Battle",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    linkedInUrl: "https://www.linkedin.com/",
    currently: "CERTIFIED FINANCIAL PLANNER™ Professional",
    residesIn: "Atlanta, Georgia",
    education: "Clark Atlanta University",
    expertise: "Investment strategy, portfolio management, wealth planning, financial literacy",
    summary: [
      "CERTIFIED FINANCIAL PLANNER™ professional with 15+ years in financial markets",
      "Holds the Chartered Financial Consultant® and Chartered Life Underwriter® designations",
      "Fierce advocate for including financial literacy as a core educational requirement",
    ],
    experience: [
      "Anthony Battle is a financial planning expert, entrepreneur, and recovering Wall Street professional with more than 15 years of experience in the finance industry.",
      "He has worked with multiple financial institutions, helping clients optimize their portfolios and manage risk effectively. He advises high-net-worth individuals on investment strategy, retirement planning, and wealth preservation.",
      "Anthony holds the Accredited Financial Counselor® designation and both the Retirement Income Certified Professional® and Certified Retirement Counselor designations for advanced retirement planning.",
    ],
    educationDetail:
      "Anthony Battle earned his degree in Business Administration from Clark Atlanta University, where he developed the foundation for his career in financial planning and wealth management.",
  },
  {
    slug: "michael-rosenston",
    name: "Michael Rosenston",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    linkedInUrl: "https://www.linkedin.com/",
    currently: "Fact Checker",
    residesIn:"Austin, TX",
    education: "Columbia Business School",
    expertise: "Equity research, portfolio management, global markets, ETFs",
    summary: [
      "CFA Charterholder with 12+ years in equity research and portfolio management",
      "Covers global equity markets including US, European, and emerging market securities",
      "Previously held roles at leading asset management firms in New York",
    ],
    experience: [
      "Michael Rosenston is a Chartered Financial Analyst with over 12 years of experience in equity research and investment strategy. She has covered global markets across a range of sectors including technology, financials, and consumer staples.",
      "Prior to joining Imperialpedia's Financial Review Board, Sarah worked as a senior equity research analyst at a top-tier asset management firm, where she managed a $2 billion global equity portfolio.",
      "Sarah brings deep expertise in fundamental analysis, valuation modeling, and macroeconomic research to her role reviewing investment and market content.",
    ],
    educationDetail:
      "Michael Rosenston holds an MBA with a concentration in Finance from Columbia Business School and a Bachelor of Science in Economics from the University of Michigan.",
  },
];

// ─── Keep the old NewsArticle-based export for backwards compatibility ─────────
// (the /review-board index page imports reviewBoardMembers which still works)



