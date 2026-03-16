import { BaseEntity } from './entity';

export interface Country extends BaseEntity {
  type: 'country';
  region: string;
  population?: number;
  gdp?: string;
  currency?: string;
}
