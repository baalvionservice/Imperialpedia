import { BaseEntity } from './entity';

export interface Industry extends BaseEntity {
  type: 'industry';
  market_size?: string;
  growth_rate?: string;
}
