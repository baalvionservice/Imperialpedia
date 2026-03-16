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

export enum RelationType {
  COMPANY_INDUSTRY = 'COMPANY_INDUSTRY',
  COMPANY_COUNTRY = 'COMPANY_COUNTRY',
  COMPANY_TECHNOLOGY = 'COMPANY_TECHNOLOGY',
  TECHNOLOGY_INDUSTRY = 'TECHNOLOGY_INDUSTRY',
  PERSON_COMPANY = 'PERSON_COMPANY',
  UNIVERSITY_COUNTRY = 'UNIVERSITY_COUNTRY',
  MARKET_INDUSTRY = 'MARKET_INDUSTRY',
  COMPETITOR = 'COMPETITOR'
}

export interface EntityRelation {
  source_id: ID;
  target_id: ID;
  relation_type: RelationType | string;
}

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
