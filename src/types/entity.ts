import { ID, Slug, Timestamp } from './common';

export type EntityType = 'country' | 'company' | 'industry' | 'technology';

export interface BaseEntity {
  id: ID;
  name: string;
  slug: Slug;
  type: EntityType;
  description: string;
  country?: string;
  industry?: string;
  tags: string[];
  created_at: Timestamp;
  updated_at: Timestamp;
}
