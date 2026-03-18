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
  Globe,
  Building,
  Factory,
  Cpu,
  LayoutDashboard,
  ShieldCheck,
  BookOpen,
  Calculator,
  Users,
  TrendingUp,
  Brain,
  FileText,
  Lightbulb,
  DollarSign,
  Map,
  Newspaper,
  Star,
  HelpCircle,
  Shield,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
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
  const pathname = usePathname();
  const { t } = useTranslation("common");
  const { currentUser } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Main navigation links
  const mainNavLinks = [
    { label: t("nav.news"), href: "/news", id: "news" },
    { label: t("nav.about"), href: "/about", id: "about" },
  ];

  // Discovery & Research dropdown
  const discoveryLinks = [
    {
      label: t("nav.countries"),
      href: "/countries",
      icon: Globe,
      color: "text-blue-500",
    },
    {
      label: t("nav.companies"),
      href: "/companies",
      icon: Building,
      color: "text-green-500",
    },
    {
      label: t("nav.industries"),
      href: "/industries",
      icon: Factory,
      color: "text-purple-500",
    },
    {
      label: t("nav.technologies"),
      href: "/technologies",
      icon: Cpu,
      color: "text-orange-500",
    },
    {
      label: t("nav.stocks"),
      href: "/stocks",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      label: t("nav.brokers"),
      href: "/brokers",
      icon: DollarSign,
      color: "text-yellow-500",
    },
  ];

  // Tools & Resources dropdown
  const toolsLinks = [
    {
      label: t("nav.financial_tools"),
      href: "/financial-tools",
      icon: Calculator,
      color: "text-indigo-500",
    },
    {
      label: t("nav.ai_analyst"),
      href: "/ai-analyst",
      icon: Brain,
      color: "text-pink-500",
    },
    {
      label: t("nav.research_ai"),
      href: "/research-ai",
      icon: Lightbulb,
      color: "text-cyan-500",
    },
    {
      label: t("nav.calculators"),
      href: "/calculators",
      icon: Calculator,
      color: "text-teal-500",
    },
    {
      label: t("nav.datasets"),
      href: "/datasets",
      icon: FileText,
      color: "text-red-500",
    },
    {
      label: t("nav.glossary"),
      href: "/glossary",
      icon: BookOpen,
      color: "text-violet-500",
    },
  ];

  // Community & Learning dropdown
  const communityLinks = [
    {
      label: t("nav.community"),
      href: "/community",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: t("nav.creators"),
      href: "/creators",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      label: t("nav.learning_paths"),
      href: "/learning-paths",
      icon: Map,
      color: "text-green-600",
    },
    {
      label: t("nav.knowledge_map"),
      href: "/knowledge-map",
      icon: Brain,
      color: "text-purple-600",
    },
    {
      label: t("nav.articles"),
      href: "/articles",
      icon: Newspaper,
      color: "text-orange-600",
    },
    {
      label: t("nav.topics"),
      href: "/topics",
      icon: FileText,
      color: "text-red-600",
    },
  ];

  // Company & Legal dropdown
  const companyLinks = [
    {
      label: t("nav.experts"),
      href: "/review-board",
      icon: Users,
      color: "text-purple-500",
    },
    {
      label: t("nav.pricing"),
      href: "/pricing",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      label: t("nav.contact"),
      href: "/contact",
      icon: Phone,
      color: "text-blue-500",
    },
    {
      label: t("nav.transparency"),
      href: "/transparency",
      icon: Shield,
      color: "text-purple-500",
    },
    {
      label: t("nav.privacy_policy"),
      href: "/privacy-policy",
      icon: Shield,
      color: "text-gray-500",
    },
    {
      label: t("nav.terms_of_service"),
      href: "/terms-of-service",
      icon: FileText,
      color: "text-gray-600",
    },
  ];

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
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-white/10 py-3 shadow-2xl"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <Container>
          <div className="flex items-center justify-between gap-8">
            <Link
              href="/"
              className="shrink-0 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-lg outline-none"
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

            <div className="hidden lg:flex items-center gap-6 flex-1">
              <div className="flex items-center gap-4">
                {/* Main navigation links */}
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => handleNavClick(link.label)}
                    className={cn(
                      "text-xs font-bold uppercase tracking-widest transition-all relative group/link outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                        pathname === link.href
                          ? "w-full"
                          : "w-0 group-hover/link:w-full"
                      )}
                    />
                  </Link>
                ))}

                {/* Discovery & Research Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm group">
                    {t("nav.discovery")}{" "}
                    <ChevronDown className="h-3 w-3 group-data-[state=open]:rotate-180 transition-transform" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-64 glass-card border-white/10 p-2"
                  >
                    <DropdownMenuLabel className="text-[9px] opacity-50 tracking-[0.2em] px-3 py-2">
                      {t("nav.discovery_research")}
                    </DropdownMenuLabel>
                    {discoveryLinks.map((link) => (
                      <DropdownMenuItem
                        key={link.label}
                        asChild
                        className="rounded-xl focus:bg-primary/10 group focus:text-primary outline-none"
                      >
                        <Link
                          href={link.href}
                          onClick={() => handleNavClick(link.label)}
                          className="flex items-center gap-3 p-3 cursor-pointer"
                        >
                          <div
                            className={cn(
                              "p-2 rounded-lg bg-background/50 border border-white/5 transition-transform group-hover:scale-110",
                              link.color
                            )}
                          >
                            <link.icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                            {link.label}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Tools & Resources Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm group">
                    {t("nav.tools")}{" "}
                    <ChevronDown className="h-3 w-3 group-data-[state=open]:rotate-180 transition-transform" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-64 glass-card border-white/10 p-2"
                  >
                    <DropdownMenuLabel className="text-[9px] opacity-50 tracking-[0.2em] px-3 py-2">
                      {t("nav.tools_resources")}
                    </DropdownMenuLabel>
                    {toolsLinks.map((link) => (
                      <DropdownMenuItem
                        key={link.label}
                        asChild
                        className="rounded-xl focus:bg-primary/10 group focus:text-primary outline-none"
                      >
                        <Link
                          href={link.href}
                          onClick={() => handleNavClick(link.label)}
                          className="flex items-center gap-3 p-3 cursor-pointer"
                        >
                          <div
                            className={cn(
                              "p-2 rounded-lg bg-background/50 border border-white/5 transition-transform group-hover:scale-110",
                              link.color
                            )}
                          >
                            <link.icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                            {link.label}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Community & Learning Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm group">
                    {t("nav.community")}{" "}
                    <ChevronDown className="h-3 w-3 group-data-[state=open]:rotate-180 transition-transform" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-64 glass-card border-white/10 p-2"
                  >
                    <DropdownMenuLabel className="text-[9px] opacity-50 tracking-[0.2em] px-3 py-2">
                      {t("nav.community_learning")}
                    </DropdownMenuLabel>
                    {communityLinks.map((link) => (
                      <DropdownMenuItem
                        key={link.label}
                        asChild
                        className="rounded-xl focus:bg-primary/10 group focus:text-primary outline-none"
                      >
                        <Link
                          href={link.href}
                          onClick={() => handleNavClick(link.label)}
                          className="flex items-center gap-3 p-3 cursor-pointer"
                        >
                          <div
                            className={cn(
                              "p-2 rounded-lg bg-background/50 border border-white/5 transition-transform group-hover:scale-110",
                              link.color
                            )}
                          >
                            <link.icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                            {link.label}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Company & Legal Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm group">
                    {t("nav.company")}{" "}
                    <ChevronDown className="h-3 w-3 group-data-[state=open]:rotate-180 transition-transform" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 glass-card border-white/10 p-2"
                  >
                    <DropdownMenuLabel className="text-[9px] opacity-50 tracking-[0.2em] px-3 py-2">
                      {t("nav.company_legal")}
                    </DropdownMenuLabel>
                    {companyLinks.map((link) => (
                      <DropdownMenuItem
                        key={link.label}
                        asChild
                        className="rounded-xl focus:bg-primary/10 group focus:text-primary outline-none"
                      >
                        <Link
                          href={link.href}
                          onClick={() => handleNavClick(link.label)}
                          className="flex items-center gap-3 p-3 cursor-pointer"
                        >
                          <div
                            className={cn(
                              "p-2 rounded-lg bg-background/50 border border-white/5 transition-transform group-hover:scale-110",
                              link.color
                            )}
                          >
                            <link.icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                            {link.label}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex-1 max-w-sm ml-auto">
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
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden md:flex items-center gap-3">
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

              {/* Discovery & Research */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.discovery_research")}
                </Text>
                <div className="grid grid-cols-2 gap-3">
                  {discoveryLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <div
                        className={cn(
                          "p-3 rounded-lg bg-background/50 border border-white/5",
                          link.color
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-center text-foreground/80 group-hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tools & Resources */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.tools_resources")}
                </Text>
                <div className="grid grid-cols-2 gap-3">
                  {toolsLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <div
                        className={cn(
                          "p-3 rounded-lg bg-background/50 border border-white/5",
                          link.color
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-center text-foreground/80 group-hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Community & Learning */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.community_learning")}
                </Text>
                <div className="grid grid-cols-2 gap-3">
                  {communityLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <div
                        className={cn(
                          "p-3 rounded-lg bg-background/50 border border-white/5",
                          link.color
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-center text-foreground/80 group-hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Company & Legal */}
              <div className="space-y-4 mb-8">
                <Text
                  variant="label"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t("nav.company_legal")}
                </Text>
                <div className="space-y-3">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg bg-background/50 border border-white/5",
                          link.color
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                      </div>
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
