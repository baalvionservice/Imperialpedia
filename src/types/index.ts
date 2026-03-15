export interface BaseModule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'development' | 'planned';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  authorId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'reader';
}
