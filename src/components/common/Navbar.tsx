"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/design-system/layout/container";
import { Text } from "@/design-system/typography/text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SearchModal } from "@/components/search/SearchModal";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { logEvent } from "@/lib/utils/analytics";
import { useAppStore } from "@/lib/state/app-store";

/**
 * Global Platform Navigation.
 * Orchestrates discovery hub access, search triggers, and administrative handshakes.
 */
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const { t } = useTranslation("common");
  const { currentUser } = useAppStore();

  // Check if current route should show scroll progress
  const shouldShowScrollProgress = () => {
    // Match /[slug] pattern (single slug at root)
    const rootSlugPattern = /^\/[^\/]+$/;
    // Match /terms/[letter]/[slug] pattern
    const termsPattern = /^\/terms\/[^\/]+\/[^\/]+$/;

    return rootSlugPattern.test(pathname) || termsPattern.test(pathname);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress only for specific routes
      if (shouldShowScrollProgress()) {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollTop / docHeight, 1);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const mainNavLinks = [
    {
      id: "news",
      label: t("nav.news"),
      href: "/news",
    },
    {
      id: "investing",
      label: t("nav.investing"),
      href: "/investing",
    },
    {
      id: "banking",
      label: t("nav.banking"),
      href: "/banking",
    },
    {
      id: "personal-finance",
      label: t("nav.personal_finance"),
      href: "/personal-finance",
    },
    {
      id: "economy",
      label: t("nav.economy"),
      href: "/economy",
    },
    {
      id: "reviews",
      label: t("nav.reviews"),
      href: "/reviews",
    },
  ];

  const newsLinks = [
    {
      label: t("nav.market_news"),
      href: "/market-news",
    },
    {
      label: t("nav.company_news"),
      href: "/company-news",
    },
    {
      label: t("nav.earnings"),
      href: "/earnings",
    },
    {
      label: t("nav.cd_rates"),
      href: "/cd-rates",
    },
    {
      label: t("nav.moratage_gates"),
      href: "/moratage-gates",
    },
    {
      label: t("nav.economy"),
      href: "/economy",
    },
    {
      label: t("nav.government"),
      href: "/government",
    },
    {
      label: t("nav.crypto"),
      href: "/crypto",
    },
    {
      label: t("nav.live_market_news"),
      href: "/live-market-news",
    },
    {
      label: t("nav.personal_finance"),
      href: "/personal-finance",
    },
    {
      label: t("nav.view_all"),
      href: "/news",
    },
  ];

  const investingLinks = [
    {
      label: t("nav.stocks"),
      href: "/stocks",
    },
    {
      label: t("nav.bonds"),
      href: "/bonds",
    },
    {
      label: t("nav.etfs"),
      href: "/etfs",
    },
    {
      label: t("nav.mutual_funds"),
      href: "/mutual-funds",
    },
    {
      label: t("nav.options"),
      href: "/options",
    },
    {
      label: t("nav.commodities"),
      href: "/commodities",
    },
    {
      label: t("nav.cryptocurrency"),
      href: "/cryptocurrency",
    },
    {
      label: t("nav.real_estate"),
      href: "/real-estate",
    },
    {
      label: t("nav.retirement_planning"),
      href: "/retirement",
    },
    {
      label: t("nav.portfolio_management"),
      href: "/portfolio",
    },
    {
      label: t("nav.view_all_investing"),
      href: "/investing",
    },
  ];

  const bankingLinks = [
    {
      label: t("nav.savings_accounts"),
      href: "/savings",
    },
    {
      label: t("nav.checking_accounts"),
      href: "/checking",
    },
    {
      label: t("nav.cd_rates"),
      href: "/cd-rates",
    },
    {
      label: t("nav.money_market"),
      href: "/money-market",
    },
    {
      label: t("nav.credit_cards"),
      href: "/credit-cards",
    },
    {
      label: t("nav.personal_loans"),
      href: "/loans",
    },
    {
      label: t("nav.mortgages"),
      href: "/mortgages",
    },
    {
      label: t("nav.auto_loans"),
      href: "/auto-loans",
    },
    {
      label: t("nav.student_loans"),
      href: "/student-loans",
    },
    {
      label: t("nav.banking_reviews"),
      href: "/banking-reviews",
    },
    {
      label: t("nav.view_all_banking"),
      href: "/banking",
    },
  ];

  const personalFinanceLinks = [
    {
      label: t("nav.budgeting"),
      href: "/budgeting",
    },
    {
      label: t("nav.debt_management"),
      href: "/debt",
    },
    {
      label: t("nav.credit_scores"),
      href: "/credit",
    },
    {
      label: t("nav.insurance"),
      href: "/insurance",
    },
    {
      label: t("nav.taxes"),
      href: "/taxes",
    },
    {
      label: t("nav.estate_planning"),
      href: "/estate-planning",
    },
    {
      label: t("nav.financial_planning"),
      href: "/planning",
    },
    {
      label: t("nav.emergency_fund"),
      href: "/emergency-fund",
    },
    {
      label: t("nav.side_hustles"),
      href: "/income",
    },
    {
      label: t("nav.financial_calculators"),
      href: "/financial-calculators",
    },
    {
      label: t("nav.view_all_personal_finance"),
      href: "/personal-finance",
    },
  ];

  const economyLinks = [
    {
      label: t("nav.economic_indicators"),
      href: "/indicators",
    },
    {
      label: t("nav.federal_reserve"),
      href: "/fed",
    },
    {
      label: t("nav.inflation"),
      href: "/inflation",
    },
    {
      label: t("nav.gdp"),
      href: "/gdp",
    },
    {
      label: t("nav.unemployment"),
      href: "/unemployment",
    },
    {
      label: t("nav.interest_rates"),
      href: "/interest-rates",
    },
    {
      label: t("nav.fiscal_policy"),
      href: "/fiscal-policy",
    },
    {
      label: t("nav.monetary_policy"),
      href: "/monetary-policy",
    },
    {
      label: t("nav.global_economy"),
      href: "/global",
    },
    {
      label: t("nav.economic_calendar"),
      href: "/calendar",
    },
    {
      label: t("nav.view_all_economy"),
      href: "/economy",
    },
  ];

  const reviewLinks = [
    {
      label: t("nav.broker_reviews"),
      href: "/broker-reviews",
    },
    {
      label: t("nav.robo_advisor_reviews"),
      href: "/robo-advisors",
    },
    {
      label: t("nav.bank_reviews"),
      href: "/bank-reviews",
    },
    {
      label: t("nav.credit_card_reviews"),
      href: "/credit-card-reviews",
    },
    {
      label: t("nav.insurance_reviews"),
      href: "/insurance-reviews",
    },
    {
      label: t("nav.loan_reviews"),
      href: "/loan-reviews",
    },
    {
      label: t("nav.investment_app_reviews"),
      href: "/app-reviews",
    },
    {
      label: t("nav.financial_advisor_reviews"),
      href: "/advisor-reviews",
    },
    {
      label: t("nav.tax_software_reviews"),
      href: "/tax-software",
    },
    {
      label: t("nav.budgeting_app_reviews"),
      href: "/budgeting-apps",
    },
    {
      label: t("nav.view_all_reviews"),
      href: "/reviews",
    },
  ];

  // const discoveryLinks = [
  //   {
  //     label: t("nav.countries"),
  //     href: "/countries",
  //     icon: Globe,
  //     color: "text-blue-500",
  //   },
  //   {
  //     label: t("nav.companies"),
  //     href: "/companies",
  //     icon: Building,
  //     color: "text-green-500",
  //   },
  //   {
  //     label: t("nav.industries"),
  //     href: "/industries",
  //     icon: Factory,
  //     color: "text-purple-500",
  //   },
  //   {
  //     label: t("nav.technologies"),
  //     href: "/technologies",
  //     icon: Cpu,
  //     color: "text-orange-500",
  //   },
  //   {
  //     label: t("nav.stocks"),
  //     href: "/stocks",
  //     icon: TrendingUp,
  //     color: "text-emerald-500",
  //   },
  //   {
  //     label: t("nav.brokers"),
  //     href: "/brokers",
  //     icon: DollarSign,
  //     color: "text-yellow-500",
  //   },
  // ];

  // const toolsLinks = [
  //   {
  //     label: t("nav.financial_tools"),
  //     href: "/financial-tools",
  //     icon: Calculator,
  //     color: "text-indigo-500",
  //   },
  //   {
  //     label: t("nav.ai_analyst"),
  //     href: "/ai-analyst",
  //     icon: Brain,
  //     color: "text-pink-500",
  //   },
  //   {
  //     label: t("nav.research_ai"),
  //     href: "/research-ai",
  //     icon: Lightbulb,
  //     color: "text-cyan-500",
  //   },
  //   {
  //     label: t("nav.calculators"),
  //     href: "/calculators",
  //     icon: Calculator,
  //     color: "text-teal-500",
  //   },
  //   {
  //     label: t("nav.datasets"),
  //     href: "/datasets",
  //     icon: FileText,
  //     color: "text-red-500",
  //   },
  //   {
  //     label: t("nav.glossary"),
  //     href: "/glossary",
  //     icon: BookOpen,
  //     color: "text-violet-500",
  //   },
  // ];

  // const communityLinks = [
  //   {
  //     label: t("nav.community"),
  //     href: "/community",
  //     icon: Users,
  //     color: "text-blue-600",
  //   },
  //   {
  //     label: t("nav.creators"),
  //     href: "/creators",
  //     icon: Star,
  //     color: "text-yellow-600",
  //   },
  //   {
  //     label: t("nav.learning_paths"),
  //     href: "/learning-paths",
  //     icon: Map,
  //     color: "text-green-600",
  //   },
  //   {
  //     label: t("nav.knowledge_map"),
  //     href: "/knowledge-map",
  //     icon: Brain,
  //     color: "text-purple-600",
  //   },
  //   {
  //     label: t("nav.articles"),
  //     href: "/articles",
  //     icon: Newspaper,
  //     color: "text-orange-600",
  //   },
  //   {
  //     label: t("nav.topics"),
  //     href: "/topics",
  //     icon: FileText,
  //     color: "text-red-600",
  //   },
  // ];

  // const companyLinks = [
  //   {
  //     label: t("nav.experts"),
  //     href: "/review-board",
  //     icon: Users,
  //     color: "text-purple-500",
  //   },
  //   {
  //     label: t("nav.pricing"),
  //     href: "/pricing",
  //     icon: DollarSign,
  //     color: "text-green-500",
  //   },
  //   {
  //     label: t("nav.contact"),
  //     href: "/contact",
  //     icon: Phone,
  //     color: "text-blue-500",
  //   },
  //   {
  //     label: t("nav.transparency"),
  //     href: "/transparency",
  //     icon: Shield,
  //     color: "text-purple-500",
  //   },
  //   {
  //     label: t("nav.privacy_policy"),
  //     href: "/privacy-policy",
  //     icon: Shield,
  //     color: "text-gray-500",
  //   },
  //   {
  //     label: t("nav.terms_of_service"),
  //     href: "/terms-of-service",
  //     icon: FileText,
  //     color: "text-gray-600",
  //   },
  // ];

  const handleNavClick = (label: string) => {
    logEvent("Navigation Click", "Discovery", label);
    setIsOpen(false);
  };

  const isAdmin = currentUser?.role === "admin";

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main Platform Navigation"
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-white/10 py-3 shadow-2xl "
            : "bg-transparent border-transparent py-5"
        )}
      >
        {/* Dynamic scroll progress border */}
        {shouldShowScrollProgress() && (
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-300 ease-out"
            style={{
              width: `${scrollProgress * 100}%`,
              boxShadow:
                scrollProgress > 0
                  ? "0 0 8px rgba(var(--primary), 0.5)"
                  : "none",
            }}
          />
        )}
        <Container>
          <div
            className={cn(
              "flex flex-col items-start justify-start gap-4",
              isScrolled && "flex-row items-center"
            )}
          >
            <div
              className={cn(
                "flex w-full items-center justify-between",
                isScrolled && "w-fit"
              )}
            >
              <Link
                href="/"
                className="shrink-0 w-fit group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-lg outline-none"
                aria-label="Imperialpedia Home"
              >
                <Text
                  variant="h3"
                  className="font-bold tracking-tighter text-2xl group-hover:text-primary transition-colors"
                >
                  Imperial
                  <span className="text-foreground/60 group-hover:text-foreground">
                    pedia
                  </span>
                </Text>
              </Link>
              <div
                className={cn(
                  "flex items-center gap-4 shrink-0",
                  isScrolled && "hidden"
                )}
              >
                <div className="w-52 ml-auto">
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="w-full relative group outline-none"
                    aria-label="Open global search index"
                  >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <div className="w-full h-10 pl-10 pr-12 rounded-xl bg-background/40 border border-white/5 text-sm text-muted-foreground flex items-center text-left hover:border-primary/20 transition-all">
                      Search
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <span className="hidden xl:inline text-[9px] font-bold text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded border border-white/5">
                        ⌘K
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[8px] font-bold border-primary/20 bg-primary/5 text-primary"
                      >
                        AI
                      </Badge>
                    </div>
                  </button>
                </div>
                <div className={cn("hidden md:flex items-center gap-3")}>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-2 rounded-xl border-primary/30 text-primary hover:bg-primary/5 font-bold text-[10px] uppercase tracking-widest"
                      asChild
                    >
                      <Link href="/admin/dashboard">
                        <LayoutDashboard className="h-3.5 w-3.5" /> Mission
                        Control
                      </Link>
                    </Button>
                  )}
                  <div className="hidden lg:flex items-center gap-3">
                    <ThemeToggle />
                    <LanguageSelector />
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(!isOpen)}
                  variant="ghost"
                  size="icon"
                  className="lg:hidden p-2 rounded-xl bg-card/30 border border-white/5 text-muted-foreground hover:text-primary transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
                  aria-label={
                    isOpen ? "Close navigation menu" : "Open navigation menu"
                  }
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>

            <div className="hidden w-full lg:flex items-center gap-6 ">
              <div className="flex items-center gap-8">
                {/* News Dropdown */}
                <div className="relative group">
                  <Link
                    href="/news"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all flex items-center gap-1"
                  >
                    {t("nav.news")}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 w-64 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 p-2">
                    {newsLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center p-3 rounded-xl hover:bg-primary/10 transition-all group/item"
                      >
                        <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Investing Dropdown */}
                <div className="relative group">
                  <Link
                    href="/investing"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all flex items-center gap-1"
                  >
                    {t("nav.investing")}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 w-64 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 p-2">
                    {investingLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center p-3 rounded-xl hover:bg-primary/10 transition-all group/item"
                      >
                        <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Banking Dropdown */}
                <div className="relative group">
                  <Link
                    href="/banking"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all flex items-center gap-1"
                  >
                    {t("nav.banking")}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 w-64 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 p-2">
                    {bankingLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center p-3 rounded-xl hover:bg-primary/10 transition-all group/item"
                      >
                        <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Personal Finance Dropdown */}
                <div className="relative group">
                  <Link
                    href="/personal-finance"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all flex items-center gap-1"
                  >
                    {t("nav.personal_finance")}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 w-64 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 p-2">
                    {personalFinanceLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center p-3 rounded-xl hover:bg-primary/10 transition-all group/item"
                      >
                        <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Economy Dropdown */}
                <div className="relative group">
                  <Link
                    href="/economy"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all flex items-center gap-1"
                  >
                    {t("nav.economy")}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 w-64 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 p-2">
                    {economyLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center p-3 rounded-xl hover:bg-primary/10 transition-all group/item"
                      >
                        <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Reviews Dropdown */}
                <div className="relative group">
                  <Link
                    href="/reviews"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all flex items-center gap-1"
                  >
                    {t("nav.reviews")}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 w-64 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 p-2">
                    {reviewLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center p-3 rounded-xl hover:bg-primary/10 transition-all group/item"
                      >
                        <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "hidden items-center gap-4 shrink-0",
                isScrolled && "flex"
              )}
            >
              <div className="w-52 ml-auto">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full relative group outline-none"
                  aria-label="Open global search index"
                >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <div className="w-full h-10 pl-10 pr-12 rounded-xl bg-background/40 border border-white/5 text-sm text-muted-foreground flex items-center text-left hover:border-primary/20 transition-all">
                    Search
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <span className="hidden xl:inline text-[9px] font-bold text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded border border-white/5">
                      ⌘K
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[8px] font-bold border-primary/20 bg-primary/5 text-primary"
                    >
                      AI
                    </Badge>
                  </div>
                </button>
              </div>
              <div
                className={cn(
                  "hidden md:flex items-center gap-3",
                  isScrolled && "hidden"
                )}
              >
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 rounded-xl border-primary/30 text-primary hover:bg-primary/5 font-bold text-[10px] uppercase tracking-widest"
                    asChild
                  >
                    <Link href="/admin/dashboard">
                      <LayoutDashboard className="h-3.5 w-3.5" /> Mission
                      Control
                    </Link>
                  </Button>
                )}
              </div>
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="icon"
                className="lg:hidden p-2 rounded-xl bg-card/30 border border-white/5 text-muted-foreground hover:text-primary transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
                aria-label={
                  isOpen ? "Close navigation menu" : "Open navigation menu"
                }
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex-1 px-6 py-20">
              {/* Main Navigation */}
              <div className="space-y-6 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.main_navigation")}
                </Text>
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-xl font-bold text-foreground hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* News */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.market_news_categories")}
                </Text>
                <div className="space-y-3">
                  {newsLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Investing */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.investing_categories")}
                </Text>
                <div className="space-y-3">
                  {investingLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Banking */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.banking_categories")}
                </Text>
                <div className="space-y-3">
                  {bankingLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Personal Finance */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.personal_finance_categories")}
                </Text>
                <div className="space-y-3">
                  {personalFinanceLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Economy */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.economy_categories")}
                </Text>
                <div className="space-y-3">
                  {economyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.reviews_categories")}
                </Text>
                <div className="space-y-3">
                  {reviewLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Admin Link */}
              {isAdmin && (
                <div className="mb-8">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary"
                  >
                    <ShieldCheck className="h-6 w-6" />
                    <span className="text-lg font-bold">Mission Control</span>
                  </Link>
                </div>
              )}

              {/* Settings */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.settings")}
                </Text>
                <div className="flex flex-col gap-3">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};
