import { ID, Timestamp } from './common';

export interface Dataset {
  id: ID;
  name: string;
  source: string;
  description: string;
  rows_count: number;
  last_updated: Timestamp;
  category: string;
}
