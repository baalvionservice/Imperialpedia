import { ApiResponse, RoleDefinition, RoleControl } from '@/types';

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

export const mockControlRoles: RoleControl[] = [
  { id: 'role-1', roleName: 'Administrator', usersAssigned: 5, description: 'Full system oversight and security governance.', permissions: ['user_manage', 'role_manage', 'content_moderate', 'content_publish', 'analytics_view_global', 'system_config', 'vetted_experts', 'media_manage'] },
  { id: 'role-2', roleName: 'Editor', usersAssigned: 12, description: 'Editorial workflow management and fact-checking.', permissions: ['content_moderate', 'content_publish', 'analytics_view_global', 'media_manage'] },
  { id: 'role-3', roleName: 'Creator', usersAssigned: 156, description: 'Expert analysis publication and audience engagement.', permissions: ['content_create', 'content_edit_own', 'analytics_view_own', 'monetization_access'] },
  { id: 'role-4', roleName: 'Viewer', usersAssigned: 142500, description: 'General audience with read and tool access.', permissions: ['content_read', 'tools_use', 'comment_create'] },
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
  { id: 'content_create', label: 'Create Content', description: 'Draft new research insights.' },
  { id: 'content_edit_own', label: 'Edit Own Content', description: 'Refine previously published insights.' },
  { id: 'analytics_view_own', label: 'Personal Analytics', description: 'View performance data for own nodes.' },
  { id: 'monetization_access', label: 'Monetization Hub', description: 'Access revenue and payout logistics.' },
  { id: 'content_read', label: 'Read Content', description: 'Access all published intelligence nodes.' },
  { id: 'tools_use', label: 'Interactive Tools', description: 'Utilize financial calculators and engines.' },
  { id: 'comment_create', label: 'Community Input', description: 'Post comments on research insights.' },
];

export const getRoles = async (): Promise<ApiResponse<RoleDefinition[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockRoles,
    status: 200,
  };
};

export const getControlRoles = async (): Promise<ApiResponse<RoleControl[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    data: mockControlRoles,
    status: 200,
  };
};
