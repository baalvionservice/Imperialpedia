import { BaseEntity } from './entity';

export interface Technology extends BaseEntity {
  type: 'technology';
  maturity_level: 'emerging' | 'growing' | 'mature';
  adoption_rate?: string;
}
