import {
  AdminArticle,
  AdminUser,
  GlossaryTerm,
  APIKeyNode,
  AdPlacement,
  SystemConfig,
} from "@/types/admin-system";

/**
 * @fileOverview Administrative Kernel Service.
 * Simulates a production backend with stateful CRUD and data persistence.
 */

class AdminService {
  private isClient = typeof window !== "undefined";

  private getStorage<T>(key: string, fallback: T): T {
    if (!this.isClient) return fallback;
    const data = localStorage.getItem(`imperial_admin_${key}`);
    return data ? JSON.parse(data) : fallback;
  }

  private setStorage(key: string, data: any) {
    if (this.isClient) {
      localStorage.setItem(`imperial_admin_${key}`, JSON.stringify(data));
    }
  }

  // --- CONTENT EMPIRE ---
  getArticles(): AdminArticle[] {
    return this.getStorage("articles", [
      {
        id: "1",
        slug: "macro-outlook-2026",
        title: "Macro Outlook 2026",
        content: "Full analysis text...",
        summary: "The future of interest rates.",
        category: "Economics",
        status: "published",
        authorId: "u-1",
        updatedAt: "2024-03-15",
        tags: ["Macro"],
      },
      {
        id: "2",
        slug: "yield-curve-basics",
        title: "Yield Curve Basics",
        content: "Educational content...",
        summary: "Intro to bond markets.",
        category: "Investing",
        status: "draft",
        authorId: "u-1",
        updatedAt: "2024-03-14",
        tags: ["Bonds"],
      },
    ]);
  }

  saveArticle(article: AdminArticle) {
    const articles = this.getArticles();
    const index = articles.findIndex((a) => a.id === article.id);
    if (index > -1) {
      articles[index] = { ...article, updatedAt: new Date().toISOString() };
    } else {
      articles.push({
        ...article,
        id: Date.now().toString(),
        updatedAt: new Date().toISOString(),
      });
    }
    this.setStorage("articles", articles);
  }

  deleteArticle(id: string) {
    const articles = this.getArticles().filter((a) => a.id !== id);
    this.setStorage("articles", articles);
  }

  // --- USER MANAGEMENT ---
  getUsers(): AdminUser[] {
    return this.getStorage("users", [
      {
        id: "u-1",
        name: "Eleanor Vance",
        email: "eleanor@imperialpedia.com",
        role: "Super Admin",
        status: "active",
        lastActive: "2m ago",
      },
      {
        id: "u-2",
        name: "Julian Wealth",
        email: "julian@wealth.com",
        role: "Editor",
        status: "active",
        lastActive: "1h ago",
      },
      {
        id: "u-3",
        name: "Sarah Crypto",
        email: "sarah@web3.io",
        role: "Writer",
        status: "active",
        lastActive: "4h ago",
      },
    ]);
  }

  updateUserRole(userId: string, role: any) {
    const users = this.getUsers().map((u) =>
      u.id === userId ? { ...u, role } : u
    );
    this.setStorage("users", users);
  }

  // --- GLOSSARY ---
  getTerms(): GlossaryTerm[] {
    return this.getStorage("glossary", [
      {
        id: "g1",
        term: "Stagflation",
        definition: "High inflation + Low growth.",
        category: "Economics",
        linkedArticles: ["1"],
      },
      {
        id: "g2",
        term: "Arbitrage",
        definition: "Simultaneous purchase and sale.",
        category: "Trading",
        linkedArticles: [],
      },
    ]);
  }

  saveTerm(term: GlossaryTerm) {
    const terms = this.getTerms();
    const index = terms.findIndex((t) => t.id === term.id);
    if (index > -1) terms[index] = term;
    else terms.push({ ...term, id: Date.now().toString() });
    this.setStorage("glossary", terms);
  }

  // --- API HUB ---
  getApiKeys(): APIKeyNode[] {
    return this.getStorage("api_keys", [
      {
        id: "k1",
        service: "Claude 3.5 Sonnet",
        key: "sk-ant-...",
        status: "active",
        usage: "42%",
      },
      {
        id: "k2",
        service: "AlphaVantage Market",
        key: "AV-99...",
        status: "active",
        usage: "12%",
      },
    ]);
  }

  // --- SETTINGS ---
  getConfig(): SystemConfig {
    return this.getStorage("config", {
      siteName: "Imperialpedia",
      contactEmail: "governance@imperialpedia.com",
      branding: { primaryColor: "#8272F2", logoUrl: "/logo.png" },
      features: { aiDrafting: true, autoLinking: true, realTimeMarket: true },
    });
  }

  updateConfig(config: SystemConfig) {
    this.setStorage("config", config);
  }
}

export const adminKernel = new AdminService();
