export type NewsBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; url: string; caption?: string };

export type Term = {
  slug: string;
  title: string;
  description: string;
  content: NewsBodyBlock[];
};

export const terms: Term[] = [
  // #
  {
    slug: "0x-protocol",
    title: "0x Protocol",
    description: "A decentralized exchange protocol.",
    content: [
      {
        type: "paragraph",
        text: "0x Protocol is a foundational infrastructure for decentralized finance (DeFi) that enables peer-to-peer asset exchange on blockchain networks like Ethereum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
        caption:
          "Blockchain network visualization representing decentralized protocols",
      },
      { type: "heading", text: "How 0x Protocol Works" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. The protocol uses off-chain order books with on-chain settlement, reducing gas costs while maintaining security.",
      },
      {
        type: "callout",
        text: "0x Protocol has facilitated over $100 billion in trading volume since its launch, making it one of the most successful DeFi protocols.",
      },
      {
        type: "list",
        items: [
          "Gasless order cancellation",
          "Flexible fee structures",
          "Modular architecture",
          "Cross-chain compatibility",
        ],
      },
    ],
  },
  {
    slug: "1inch",
    title: "1inch",
    description: "A decentralized exchange aggregator.",
    content: [
      {
        type: "paragraph",
        text: "1inch is a decentralized exchange (DEX) aggregator that sources liquidity from various exchanges to offer users the best possible trading rates. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      { type: "subheading", text: "Key Features" },
      {
        type: "list",
        items: [
          "Aggregates liquidity from 100+ DEXs",
          "Pathfinder algorithm for optimal routing",
          "Gas optimization tools",
          "Limit order functionality",
        ],
      },
      {
        type: "quote",
        text: "1inch has revolutionized DeFi trading by making it accessible and cost-effective for everyone.",
        attribution: "Sergej Kunz, Co-founder of 1inch",
      },
    ],
  },

  // A
  {
    slug: "absolute-advantage",
    title: "Absolute Advantage",
    description: "Ability to produce more efficiently.",
    content: [
      {
        type: "paragraph",
        text: "Absolute advantage is an economic concept that refers to the ability of a country, individual, company, or region to produce a good or service more efficiently than competitors. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        caption:
          "Manufacturing efficiency represents absolute advantage in production",
      },
      {
        type: "heading",
        text: "Understanding Absolute vs Comparative Advantage",
      },
      {
        type: "paragraph",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. While absolute advantage focuses on efficiency, comparative advantage considers opportunity costs.",
      },
      {
        type: "callout",
        text: "A country can have absolute advantage in multiple goods but should still specialize based on comparative advantage for optimal trade benefits.",
      },
    ],
  },
  {
    slug: "aggregate-demand",
    title: "Aggregate Demand",
    description: "Total demand in an economy.",
    content: [
      {
        type: "paragraph",
        text: "Aggregate demand represents the total quantity of goods and services demanded across all levels of an economy at a given overall price level and in a given time period. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      { type: "subheading", text: "Components of Aggregate Demand" },
      {
        type: "list",
        items: [
          "Consumer spending (C)",
          "Investment spending (I)",
          "Government spending (G)",
          "Net exports (X-M)",
        ],
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. The aggregate demand curve slopes downward, showing an inverse relationship between price level and quantity demanded.",
      },
    ],
  },
  {
    slug: "asset",
    title: "Asset",
    description: "Something of value owned.",
    content: [
      {
        type: "paragraph",
        text: "An asset is any resource with economic value that an individual, corporation, or country owns or controls with the expectation that it will provide future benefit. Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
        caption: "Real estate is a common type of tangible asset",
      },
      { type: "heading", text: "Types of Assets" },
      {
        type: "paragraph",
        text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Assets can be classified in various ways depending on their characteristics.",
      },
      { type: "subheading", text: "By Tangibility" },
      {
        type: "list",
        items: [
          "Tangible assets: Real estate, machinery, inventory",
          "Intangible assets: Patents, trademarks, goodwill",
        ],
      },
      { type: "subheading", text: "By Liquidity" },
      {
        type: "list",
        items: [
          "Current assets: Cash, accounts receivable, short-term investments",
          "Non-current assets: Property, equipment, long-term investments",
        ],
      },
    ],
  },
  {
    slug: "amortization",
    title: "Amortization",
    description: "Spreading payments over time.",
    content: [
      {
        type: "paragraph",
        text: "Amortization is the process of gradually paying off a debt through regular payments over time. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Each payment typically includes both principal and interest components.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        caption:
          "Loan amortization schedule showing payment breakdown over time",
      },
      { type: "subheading", text: "How Amortization Works" },
      {
        type: "paragraph",
        text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Early payments consist mostly of interest, while later payments apply more toward the principal balance.",
      },
      {
        type: "callout",
        text: "A 30-year mortgage of $300,000 at 6% interest results in total payments of approximately $647,515 over the life of the loan.",
      },
    ],
  },

  // B
  {
    slug: "bond",
    title: "Bond",
    description: "A fixed income investment.",
    content: [
      {
        type: "paragraph",
        text: "A bond is a fixed-income investment that represents a loan made by an investor to a borrower, typically corporate or governmental. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      { type: "heading", text: "Bond Characteristics" },
      {
        type: "list",
        items: [
          "Face value (par value)",
          "Coupon rate (interest rate)",
          "Maturity date",
          "Credit rating",
        ],
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption: "Government bonds are considered among the safest investments",
      },
      {
        type: "quote",
        text: "Bonds are the ballast in a portfolio - they provide stability when stocks are volatile.",
        attribution: "Warren Buffett",
      },
    ],
  },
  {
    slug: "bear-market",
    title: "Bear Market",
    description: "Market with falling prices.",
    content: [
      {
        type: "paragraph",
        text: "A bear market occurs when securities prices fall 20% or more from recent highs amid widespread pessimism and negative investor sentiment. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      { type: "subheading", text: "Characteristics of Bear Markets" },
      {
        type: "list",
        items: [
          "Declining stock prices",
          "High unemployment",
          "Economic recession",
          "Low investor confidence",
          "Reduced corporate profits",
        ],
      },
      {
        type: "callout",
        text: "The average bear market lasts about 9.6 months, while bull markets typically last much longer at around 2.7 years.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption: "Bear markets test investor patience and risk tolerance",
      },
    ],
  },
  {
    slug: "bull-market",
    title: "Bull Market",
    description: "Market with rising prices.",
    content: [
      {
        type: "paragraph",
        text: "A bull market is characterized by sustained increases in stock prices, typically rising 20% or more from recent lows. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      { type: "heading", text: "Bull Market Indicators" },
      {
        type: "paragraph",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Bull markets are driven by strong economic fundamentals and investor optimism.",
      },
      {
        type: "list",
        items: [
          "Rising GDP",
          "Low unemployment",
          "Strong corporate earnings",
          "High investor confidence",
          "Increased trading volume",
        ],
      },
      {
        type: "quote",
        text: "Bull markets are born on pessimism, grown on skepticism, mature on optimism, and die on euphoria.",
        attribution: "Sir John Templeton",
      },
    ],
  },
  {
    slug: "budget-deficit",
    title: "Budget Deficit",
    description: "Spending exceeds revenue.",
    content: [
      {
        type: "paragraph",
        text: "A budget deficit occurs when government expenses exceed income during a specific period, typically a fiscal year. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        caption:
          "Government spending often exceeds revenue during economic downturns",
      },
      { type: "subheading", text: "Causes of Budget Deficits" },
      {
        type: "list",
        items: [
          "Economic recessions reducing tax revenue",
          "Increased government spending on social programs",
          "Military expenditures",
          "Infrastructure investments",
          "Interest payments on existing debt",
        ],
      },
      {
        type: "callout",
        text: "The U.S. federal budget deficit reached $3.1 trillion in 2020, largely due to COVID-19 pandemic response spending.",
      },
    ],
  },

  // C
  {
    slug: "capital",
    title: "Capital",
    description: "Financial assets or resources.",
    content: [
      {
        type: "paragraph",
        text: "Capital refers to financial assets or resources that can be used to produce goods, provide services, or generate income. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      { type: "heading", text: "Types of Capital" },
      { type: "subheading", text: "Financial Capital" },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. This includes money, stocks, bonds, and other financial instruments.",
      },
      { type: "subheading", text: "Physical Capital" },
      {
        type: "list",
        items: [
          "Machinery and equipment",
          "Buildings and infrastructure",
          "Technology and computers",
          "Vehicles and transportation",
        ],
      },
      {
        type: "quote",
        text: "Capital is that part of wealth which is devoted to obtaining further wealth.",
        attribution: "Alfred Marshall, Economist",
      },
    ],
  },
  {
    slug: "cash-flow",
    title: "Cash Flow",
    description: "Movement of money.",
    content: [
      {
        type: "paragraph",
        text: "Cash flow represents the movement of money into and out of a business, investment, or project over a specific period. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80",
        caption: "Positive cash flow is essential for business sustainability",
      },
      { type: "subheading", text: "Types of Cash Flow" },
      {
        type: "list",
        items: [
          "Operating cash flow: From core business operations",
          "Investing cash flow: From buying/selling assets",
          "Financing cash flow: From debt and equity transactions",
        ],
      },
      {
        type: "callout",
        text: "A company can be profitable on paper but still fail due to poor cash flow management.",
      },
    ],
  },
  {
    slug: "cryptocurrency",
    title: "Cryptocurrency",
    description: "Digital currency secured by cryptography.",
    content: [
      {
        type: "paragraph",
        text: "Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on decentralized blockchain networks. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
        caption:
          "Bitcoin was the first successful cryptocurrency, launched in 2009",
      },
      { type: "heading", text: "Key Characteristics" },
      {
        type: "list",
        items: [
          "Decentralized control",
          "Cryptographic security",
          "Blockchain technology",
          "Peer-to-peer transactions",
          "Limited supply (in most cases)",
        ],
      },
      {
        type: "quote",
        text: "Bitcoin is a remarkable cryptographic achievement and the ability to create something that is not duplicable in the digital world has enormous value.",
        attribution: "Eric Schmidt, Former Google CEO",
      },
      {
        type: "callout",
        text: "The total market capitalization of all cryptocurrencies exceeded $3 trillion at its peak in 2021.",
      },
    ],
  },
  {
    slug: "compound-interest",
    title: "Compound Interest",
    description: "Interest on interest.",
    content: [
      {
        type: "paragraph",
        text: "Compound interest is the addition of interest to the principal sum of a loan or deposit, where interest earned also earns interest. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      { type: "subheading", text: "The Power of Compounding" },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. The effect becomes more pronounced over longer time periods.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80",
        caption: "Compound interest creates exponential growth over time",
      },
      {
        type: "callout",
        text: "An investment of $1,000 at 7% annual compound interest becomes $7,612 after 30 years.",
      },
      {
        type: "quote",
        text: "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.",
        attribution: "Albert Einstein",
      },
    ],
  },

  // D
  {
    slug: "debt",
    title: "Debt",
    description: "Money borrowed.",
    content: [
      {
        type: "paragraph",
        text: "Debt represents money borrowed by one party from another, typically with the agreement to repay the principal amount plus interest over time. Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        caption: "Credit cards are a common form of consumer debt",
      },
      { type: "subheading", text: "Types of Debt" },
      {
        type: "list",
        items: [
          "Secured debt: Backed by collateral (mortgages, auto loans)",
          "Unsecured debt: Not backed by collateral (credit cards, personal loans)",
          "Revolving debt: Credit lines that can be reused",
          "Installment debt: Fixed payments over set periods",
        ],
      },
      {
        type: "callout",
        text: "The average American household carries approximately $6,194 in credit card debt as of 2024.",
      },
    ],
  },
  {
    slug: "dividend",
    title: "Dividend",
    description: "Company profit distribution.",
    content: [
      {
        type: "paragraph",
        text: "A dividend is a payment made by a corporation to its shareholders, usually as a distribution of profits. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      },
      { type: "heading", text: "Dividend Policy" },
      {
        type: "paragraph",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Companies with stable cash flows often pay regular dividends to attract income-focused investors.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption: "Dividend-paying stocks are popular among income investors",
      },
      {
        type: "quote",
        text: "Do you know the only thing that gives me pleasure? It's to see my dividends coming in.",
        attribution: "John D. Rockefeller",
      },
    ],
  },
  {
    slug: "depreciation",
    title: "Depreciation",
    description: "Loss of asset value.",
    content: [
      {
        type: "paragraph",
        text: "Depreciation is the decrease in value of an asset over time due to wear, tear, obsolescence, or other factors. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      { type: "subheading", text: "Methods of Depreciation" },
      {
        type: "list",
        items: [
          "Straight-line: Equal amounts each year",
          "Declining balance: Higher depreciation in early years",
          "Units of production: Based on actual usage",
          "Sum-of-years digits: Accelerated depreciation method",
        ],
      },
      {
        type: "callout",
        text: "A new car typically depreciates 20-30% in its first year and about 60% after five years.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
        caption: "Vehicles are classic examples of depreciating assets",
      },
    ],
  },

  // E
  {
    slug: "equity",
    title: "Equity",
    description: "Ownership in a company.",
    content: [
      {
        type: "paragraph",
        text: "Equity represents ownership interest in a company, typically in the form of stock shares. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption:
          "Stock certificates represent equity ownership in corporations",
      },
      { type: "subheading", text: "Types of Equity" },
      {
        type: "list",
        items: [
          "Common stock: Voting rights and dividends",
          "Preferred stock: Priority dividends, limited voting",
          "Retained earnings: Reinvested company profits",
          "Additional paid-in capital: Premium over par value",
        ],
      },
      {
        type: "callout",
        text: "Equity holders are residual claimants - they get paid after all debts and obligations are satisfied.",
      },
    ],
  },
  {
    slug: "exchange-rate",
    title: "Exchange Rate",
    description: "Currency value comparison.",
    content: [
      {
        type: "paragraph",
        text: "An exchange rate is the price of one currency expressed in terms of another currency. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
      },
      { type: "heading", text: "Factors Affecting Exchange Rates" },
      {
        type: "list",
        items: [
          "Interest rate differentials",
          "Inflation rates",
          "Political stability",
          "Economic performance",
          "Trade balances",
          "Market speculation",
        ],
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption:
          "Foreign exchange markets operate 24/7 across global financial centers",
      },
      {
        type: "quote",
        text: "In the long run, currency values reflect the underlying economic fundamentals of countries.",
        attribution: "Milton Friedman, Economist",
      },
    ],
  },
  {
    slug: "earnings",
    title: "Earnings",
    description: "Company profit.",
    content: [
      {
        type: "paragraph",
        text: "Earnings represent a company's net profit after all expenses, taxes, and costs have been subtracted from total revenue. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
      },
      { type: "subheading", text: "Key Earnings Metrics" },
      {
        type: "list",
        items: [
          "Earnings per share (EPS)",
          "Price-to-earnings ratio (P/E)",
          "Earnings before interest and taxes (EBIT)",
          "Earnings before interest, taxes, depreciation, and amortization (EBITDA)",
        ],
      },
      {
        type: "callout",
        text: "Companies typically report earnings quarterly, and these reports significantly impact stock prices.",
      },
    ],
  },

  // F
  {
    slug: "fiscal-policy",
    title: "Fiscal Policy",
    description: "Government spending strategy.",
    content: [
      {
        type: "paragraph",
        text: "Fiscal policy refers to the use of government spending and taxation to influence economic conditions. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption:
          "Government buildings represent the center of fiscal policy decisions",
      },
      { type: "subheading", text: "Types of Fiscal Policy" },
      {
        type: "list",
        items: [
          "Expansionary: Increased spending or tax cuts to stimulate growth",
          "Contractionary: Reduced spending or tax increases to cool inflation",
          "Automatic stabilizers: Built-in mechanisms like unemployment benefits",
        ],
      },
      {
        type: "callout",
        text: "During the 2008 financial crisis, many governments implemented expansionary fiscal policies to combat recession.",
      },
    ],
  },
  {
    slug: "forex",
    title: "Forex",
    description: "Foreign exchange market.",
    content: [
      {
        type: "paragraph",
        text: "The foreign exchange market (Forex or FX) is the global marketplace for trading national currencies against one another. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
      },
      { type: "heading", text: "Market Characteristics" },
      {
        type: "list",
        items: [
          "Largest financial market globally ($7.5 trillion daily volume)",
          "24/7 trading across different time zones",
          "Highly liquid and volatile",
          "Decentralized over-the-counter market",
        ],
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption: "Currency trading screens showing real-time exchange rates",
      },
      {
        type: "quote",
        text: "The forex market never sleeps - when one major financial center closes, another opens.",
        attribution: "Currency Trading Principle",
      },
    ],
  },

  // G
  {
    slug: "gdp",
    title: "GDP",
    description: "Total economic output.",
    content: [
      {
        type: "paragraph",
        text: "Gross Domestic Product (GDP) is the total monetary value of all finished goods and services produced within a country's borders in a specific time period. Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
      },
      { type: "subheading", text: "GDP Calculation Methods" },
      {
        type: "list",
        items: [
          "Production approach: Sum of value added by all industries",
          "Income approach: Sum of all incomes earned",
          "Expenditure approach: C + I + G + (X-M)",
        ],
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        caption: "Economic activity across industries contributes to GDP",
      },
      {
        type: "callout",
        text: "The U.S. GDP was approximately $26.9 trillion in 2023, making it the world's largest economy.",
      },
    ],
  },
  {
    slug: "gross-profit",
    title: "Gross Profit",
    description: "Revenue minus cost.",
    content: [
      {
        type: "paragraph",
        text: "Gross profit is a company's revenue minus its cost of goods sold (COGS), representing the profit earned from core business operations before operating expenses. Qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      },
      { type: "subheading", text: "Gross Profit Margin" },
      {
        type: "paragraph",
        text: "Et harum quidem rerum facilis est et expedita distinctio. Gross profit margin is calculated as (Gross Profit ÷ Revenue) × 100, showing the percentage of revenue retained after direct costs.",
      },
      {
        type: "list",
        items: [
          "High margin indicates efficient production",
          "Varies significantly by industry",
          "Key metric for operational efficiency",
          "Used to compare companies within same sector",
        ],
      },
      {
        type: "callout",
        text: "Technology companies often have gross margins above 70%, while retail companies typically see margins of 20-40%.",
      },
    ],
  },

  // H
  {
    slug: "hedge-fund",
    title: "Hedge Fund",
    description: "Alternative investment fund.",
    content: [
      {
        type: "paragraph",
        text: "A hedge fund is an alternative investment vehicle that pools capital from accredited investors and employs sophisticated strategies to generate returns. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption:
          "Hedge funds employ complex trading strategies and risk management",
      },
      { type: "subheading", text: "Common Hedge Fund Strategies" },
      {
        type: "list",
        items: [
          "Long/short equity",
          "Market neutral",
          "Event-driven",
          "Global macro",
          "Quantitative strategies",
          "Distressed securities",
        ],
      },
      {
        type: "callout",
        text: "Hedge funds typically charge a '2 and 20' fee structure: 2% management fee plus 20% of profits.",
      },
      {
        type: "quote",
        text: "The best hedge fund managers are like great athletes - they combine skill, discipline, and the ability to perform under pressure.",
        attribution: "Ray Dalio, Bridgewater Associates",
      },
    ],
  },

  // I
  {
    slug: "inflation",
    title: "Inflation",
    description: "Rising prices.",
    content: [
      {
        type: "paragraph",
        text: "Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power over time. Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80",
        caption:
          "Rising prices affect everyday purchases from groceries to gasoline",
      },
      { type: "heading", text: "Causes of Inflation" },
      {
        type: "list",
        items: [
          "Demand-pull: Increased consumer demand",
          "Cost-push: Rising production costs",
          "Built-in: Wage-price spirals",
          "Monetary: Excessive money supply growth",
        ],
      },
      {
        type: "callout",
        text: "The Federal Reserve targets 2% annual inflation as optimal for economic growth and stability.",
      },
    ],
  },
  {
    slug: "interest-rate",
    title: "Interest Rate",
    description: "Cost of borrowing.",
    content: [
      {
        type: "paragraph",
        text: "An interest rate is the percentage charged on borrowed money or paid on deposited funds, representing the cost of capital over time. Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      },
      { type: "subheading", text: "Types of Interest Rates" },
      {
        type: "list",
        items: [
          "Fixed rates: Remain constant throughout loan term",
          "Variable rates: Fluctuate with market conditions",
          "Prime rate: Base rate for creditworthy borrowers",
          "Federal funds rate: Overnight lending rate between banks",
        ],
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        caption:
          "Interest rates influence everything from mortgages to savings accounts",
      },
      {
        type: "quote",
        text: "Interest rates are to asset prices what gravity is to the apple. When there are low interest rates, there is a very low gravitational pull on asset prices.",
        attribution: "Warren Buffett",
      },
    ],
  },

  // J
  {
    slug: "junk-bond",
    title: "Junk Bond",
    description: "High-risk bond.",
    content: [
      {
        type: "paragraph",
        text: "Junk bonds, also known as high-yield bonds, are debt securities with credit ratings below investment grade, offering higher returns to compensate for increased default risk. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.",
      },
      { type: "subheading", text: "Risk vs. Return Profile" },
      {
        type: "paragraph",
        text: "Aut perferendis doloribus asperiores repellat. These bonds typically yield 3-6 percentage points more than comparable Treasury securities.",
      },
      {
        type: "callout",
        text: "Junk bonds are rated BB+ or lower by Standard & Poor's, or Ba1 or lower by Moody's.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption:
          "High-yield bonds offer attractive returns but carry significant credit risk",
      },
    ],
  },

  // K
  {
    slug: "keynesian-economics",
    title: "Keynesian Economics",
    description: "Demand-driven economics theory.",
    content: [
      {
        type: "paragraph",
        text: "Keynesian economics is a macroeconomic theory that emphasizes the role of aggregate demand in driving economic activity and supports government intervention during economic downturns. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        caption:
          "Government intervention in markets is a key principle of Keynesian economics",
      },
      { type: "subheading", text: "Core Principles" },
      {
        type: "list",
        items: [
          "Aggregate demand drives economic growth",
          "Markets can fail and remain in disequilibrium",
          "Government spending can stimulate economic activity",
          "Monetary policy affects real economic variables",
        ],
      },
      {
        type: "quote",
        text: "In the long run we are all dead. Economists set themselves too easy, too useless a task if they can only tell us that when the storm is long past the ocean is flat again.",
        attribution: "John Maynard Keynes",
      },
    ],
  },

  // L
  {
    slug: "liquidity",
    title: "Liquidity",
    description: "Ease of converting to cash.",
    content: [
      {
        type: "paragraph",
        text: "Liquidity refers to how quickly and easily an asset can be converted into cash without significantly affecting its market price. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80",
        caption:
          "Cash is the most liquid asset, while real estate is typically less liquid",
      },
      { type: "subheading", text: "Liquidity Spectrum" },
      {
        type: "list",
        items: [
          "Most liquid: Cash, money market funds",
          "Highly liquid: Stocks, government bonds",
          "Moderately liquid: Corporate bonds, mutual funds",
          "Less liquid: Real estate, private equity",
          "Illiquid: Art, collectibles, private businesses",
        ],
      },
      {
        type: "callout",
        text: "During financial crises, even typically liquid assets can become illiquid as markets freeze up.",
      },
    ],
  },
  {
    slug: "leverage",
    title: "Leverage",
    description: "Using debt to invest.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // I
  {
    slug: "inflation",
    title: "Inflation",
    description: "Rising prices.",
    content: [
      {
        type: "paragraph",
        text: "Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power over time. Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80",
        caption:
          "Rising prices affect everyday purchases from groceries to gasoline",
      },
      { type: "heading", text: "Causes of Inflation" },
      {
        type: "list",
        items: [
          "Demand-pull: Increased consumer demand",
          "Cost-push: Rising production costs",
          "Built-in: Wage-price spirals",
          "Monetary: Excessive money supply growth",
        ],
      },
      {
        type: "callout",
        text: "The Federal Reserve targets 2% annual inflation as optimal for economic growth and stability.",
      },
    ],
  },
  {
    slug: "interest-rate",
    title: "Interest Rate",
    description: "Cost of borrowing.",
    content: [
      {
        type: "paragraph",
        text: "An interest rate is the percentage charged on borrowed money or paid on deposited funds, representing the cost of capital over time. Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      },
      { type: "subheading", text: "Types of Interest Rates" },
      {
        type: "list",
        items: [
          "Fixed rates: Remain constant throughout loan term",
          "Variable rates: Fluctuate with market conditions",
          "Prime rate: Base rate for creditworthy borrowers",
          "Federal funds rate: Overnight lending rate between banks",
        ],
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        caption:
          "Interest rates influence everything from mortgages to savings accounts",
      },
      {
        type: "quote",
        text: "Interest rates are to asset prices what gravity is to the apple. When there are low interest rates, there is a very low gravitational pull on asset prices.",
        attribution: "Warren Buffett",
      },
    ],
  },

  // J
  {
    slug: "junk-bond",
    title: "Junk Bond",
    description: "High-risk bond.",
    content: [
      {
        type: "paragraph",
        text: "Junk bonds, also known as high-yield bonds, are debt securities with credit ratings below investment grade, offering higher returns to compensate for increased default risk. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.",
      },
      { type: "subheading", text: "Risk vs. Return Profile" },
      {
        type: "paragraph",
        text: "Aut perferendis doloribus asperiores repellat. These bonds typically yield 3-6 percentage points more than comparable Treasury securities.",
      },
      {
        type: "callout",
        text: "Junk bonds are rated BB+ or lower by Standard & Poor's, or Ba1 or lower by Moody's.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        caption:
          "High-yield bonds offer attractive returns but carry significant credit risk",
      },
    ],
  },

  // K
  {
    slug: "keynesian-economics",
    title: "Keynesian Economics",
    description: "Demand-driven economics theory.",
    content: [
      {
        type: "paragraph",
        text: "Keynesian economics is a macroeconomic theory that emphasizes the role of aggregate demand in driving economic activity and supports government intervention during economic downturns. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        caption:
          "Government intervention in markets is a key principle of Keynesian economics",
      },
      { type: "subheading", text: "Core Principles" },
      {
        type: "list",
        items: [
          "Aggregate demand drives economic growth",
          "Markets can fail and remain in disequilibrium",
          "Government spending can stimulate economic activity",
          "Monetary policy affects real economic variables",
        ],
      },
      {
        type: "quote",
        text: "In the long run we are all dead. Economists set themselves too easy, too useless a task if they can only tell us that when the storm is long past the ocean is flat again.",
        attribution: "John Maynard Keynes",
      },
    ],
  },

  // L
  {
    slug: "liquidity",
    title: "Liquidity",
    description: "Ease of converting to cash.",
    content: [
      {
        type: "paragraph",
        text: "Liquidity refers to how quickly and easily an asset can be converted into cash without significantly affecting its market price. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80",
        caption:
          "Cash is the most liquid asset, while real estate is typically less liquid",
      },
      { type: "subheading", text: "Liquidity Spectrum" },
      {
        type: "list",
        items: [
          "Most liquid: Cash, money market funds",
          "Highly liquid: Stocks, government bonds",
          "Moderately liquid: Corporate bonds, mutual funds",
          "Less liquid: Real estate, private equity",
          "Illiquid: Art, collectibles, private businesses",
        ],
      },
      {
        type: "callout",
        text: "During financial crises, even typically liquid assets can become illiquid as markets freeze up.",
      },
    ],
  },
  {
    slug: "leverage",
    title: "Leverage",
    description: "Using debt to invest.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // M
  {
    slug: "market-cap",
    title: "Market Capitalization",
    description: "Company value.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },
  {
    slug: "mutual-fund",
    title: "Mutual Fund",
    description: "Pooled investment.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // N
  {
    slug: "net-income",
    title: "Net Income",
    description: "Final profit.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // O
  {
    slug: "option",
    title: "Option",
    description: "Right to buy/sell asset.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // P
  {
    slug: "portfolio",
    title: "Portfolio",
    description: "Collection of investments.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },
  {
    slug: "profit-margin",
    title: "Profit Margin",
    description: "Profit ratio.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // Q
  {
    slug: "quantitative-easing",
    title: "Quantitative Easing",
    description: "Central bank stimulus.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // R
  {
    slug: "revenue",
    title: "Revenue",
    description: "Total income.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },
  {
    slug: "roi",
    title: "Return on Investment",
    description: "Profit ratio.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // S
  {
    slug: "stock",
    title: "Stock",
    description: "Ownership share.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },
  {
    slug: "supply-demand",
    title: "Supply and Demand",
    description: "Market principle.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // T
  {
    slug: "tax",
    title: "Tax",
    description: "Government charge.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // U
  {
    slug: "utility",
    title: "Utility",
    description: "Satisfaction from goods.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // V
  {
    slug: "volatility",
    title: "Volatility",
    description: "Price fluctuation.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // W
  {
    slug: "wealth",
    title: "Wealth",
    description: "Accumulated assets.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // X
  {
    slug: "x-efficiency",
    title: "X-Efficiency",
    description: "Operational efficiency.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // Y
  {
    slug: "yield",
    title: "Yield",
    description: "Return on investment.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },

  // Z
  {
    slug: "zero-sum-game",
    title: "Zero-Sum Game",
    description: "One wins, one loses.",
    content: [
      {
        type: "paragraph",
        text: "Leverage involves using borrowed capital to increase the potential return on an investment, though it also amplifies potential losses. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
      { type: "heading", text: "Types of Leverage" },
      {
        type: "list",
        items: [
          "Financial leverage: Using debt to finance assets",
          "Operating leverage: Fixed costs in business operations",
          "Combined leverage: Both financial and operating leverage",
        ],
      },
      {
        type: "callout",
        text: "A 2:1 leverage ratio means for every $1 of equity, there's $2 of total assets (including $1 of debt).",
      },
      {
        type: "quote",
        text: "Leverage is a double-edged sword - it can magnify gains but also amplify losses.",
        attribution: "Investment Principle",
      },
    ],
  },
];
