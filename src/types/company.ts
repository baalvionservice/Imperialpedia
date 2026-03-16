import { BaseEntity } from './entity';

export interface Company extends BaseEntity {
  type: 'company';
  ticker: string;
  market_cap: string;
  ceo?: string;
  founded?: number;
}
