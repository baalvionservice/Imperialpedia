import { ApiResponse, RoleDefinition, RoleControl, RolePermissionSet } from '@/types';

/**
 * @fileOverview Mock service for managing platform roles and permissions.
 */

export let mockControlRoles: RoleControl[] = [
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
    data: mockControlRoles.map(r => ({
      id: r.id,
      name: r.roleName.toLowerCase() as any,
      description: r.description || '',
      permissions: r.permissions
    })),
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

export const getRolePermissions = async (): Promise<ApiResponse<RolePermissionSet[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const data: RolePermissionSet[] = mockControlRoles.map(role => ({
    roleId: role.id,
    roleName: role.roleName,
    description: role.description || '',
    permissions: ALL_PERMISSIONS.map(p => ({
      name: p.label,
      enabled: role.permissions.includes(p.id)
    }))
  }));

  return {
    data,
    status: 200
  };
};

export const assignPermissions = async (roleId: string, permissions: string[]): Promise<ApiResponse<RoleControl>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const index = mockControlRoles.findIndex(r => r.id === roleId);
  if (index !== -1) {
    mockControlRoles[index].permissions = permissions;
    return {
      data: mockControlRoles[index],
      status: 200,
      message: 'Capability map synchronized.'
    };
  }
  return {
    data: null as any,
    status: 404,
    message: 'Role not found.'
  };
};

export const createOrUpdateRole = async (role: Partial<RoleControl>): Promise<ApiResponse<RoleControl[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  if (role.id) {
    mockControlRoles = mockControlRoles.map(r => r.id === role.id ? { ...r, ...role } : r);
  } else {
    const newRole: RoleControl = {
      id: `role-${Math.random().toString(36).substr(2, 5)}`,
      roleName: role.roleName || 'New Role',
      usersAssigned: 0,
      description: role.description || '',
      permissions: role.permissions || []
    };
    mockControlRoles.push(newRole);
  }

  return {
    data: mockControlRoles,
    status: 200,
    message: 'Role matrix synchronized successfully.'
  };
};
