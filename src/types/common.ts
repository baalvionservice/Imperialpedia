/**
 * @fileOverview Common reusable types and primitives.
 */

export type ID = string;
export type Slug = string;
export type Timestamp = string; // ISO 8601 format

export type Status = 'active' | 'inactive' | 'development' | 'planned' | 'archived';

export type Role = 'admin' | 'creator' | 'reader' | 'guest';

export interface User {
  id: ID;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface BaseModule {
  id: ID;
  name: string;
  description: string;
  status: Status;
}
