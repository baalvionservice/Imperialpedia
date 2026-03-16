import { ID, Slug, Timestamp } from './common';

export type EntityType = 
  | 'country' 
  | 'city' 
  | 'company' 
  | 'industry' 
  | 'technology' 
  | 'person' 
  | 'university' 
  | 'market' 
  | 'dataset';

export interface BaseEntity {
  id: ID;
  name: string;
  slug: Slug;
  type: EntityType;
  description: string;
  country?: string; // References by slug
  industry?: string; // References by slug
  tags: string[];
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface EntityRelation {
  sourceId: ID;
  targetId: ID;
  type: 'belongs_to' | 'operates_in' | 'founded_in' | 'uses' | 'competitor_of' | 'related_to';
}
