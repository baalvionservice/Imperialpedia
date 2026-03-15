import { ApiResponse, RoleDefinition } from '@/types';

/**
 * @fileOverview Mock service for managing platform roles and permissions.
 */

export const mockRoles: RoleDefinition[] = [
  {
    id: 'role-1',
    name: 'admin',
    description: 'Full platform governance, security control, and staff management.',
    permissions: [
      'user_manage',
      'role_manage',
      'content_moderate',
      'content_publish',
      'analytics_view_global',
      'system_config',
      'vetted_experts'
    ]
  },
  {
    id: 'role-2',
    name: 'editor',
    description: 'Management of publishing workflows and content integrity.',
    permissions: [
      'content_moderate',
      'content_publish',
      'analytics_view_global',
      'media_manage'
    ]
  },
  {
    id: 'role-3',
    name: 'creator',
    description: 'Expert analysis drafting and audience interaction.',
    permissions: [
      'content_create',
      'content_edit_own',
      'analytics_view_own',
      'monetization_access'
    ]
  },
  {
    id: 'role-4',
    name: 'viewer',
    description: 'Standard reader access to intelligence nodes and tools.',
    permissions: [
      'content_read',
      'tools_use',
      'comment_create'
    ]
  }
];

export const ALL_PERMISSIONS = [
  { id: 'user_manage', label: 'User Directory Control', description: 'Suspend or purge user identities.' },
  { id: 'role_manage', label: 'Role & Permissions', description: 'Modify system access levels.' },
  { id: 'content_moderate', label: 'Content Moderation', description: 'Flag and remove community input.' },
  { id: 'content_publish', label: 'Intelligence Publishing', description: 'Commit articles to the live index.' },
  { id: 'analytics_view_global', label: 'Global Intelligence', description: 'View platform-wide growth data.' },
  { id: 'system_config', label: 'System Taxonomy', description: 'Manage categories and topic tags.' },
  { id: 'vetted_experts', label: 'Expert Authentication', description: 'Validate and verify expert candidates.' },
  { id: 'media_manage', label: 'Media Library', description: 'Manage global visual assets.' },
];

export const getRoles = async (): Promise<ApiResponse<RoleDefinition[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockRoles,
    status: 200,
  };
};
