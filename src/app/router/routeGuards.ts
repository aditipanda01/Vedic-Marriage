import { User } from '@/types/auth';

export type Permission = 'view_profile' | 'edit_profile' | 'view_matches' | 'send_messages';

export interface GuardConfig {
  permissions?: Permission[];
  roles?: string[];
}

export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false;

  // Add your permission logic here
  // For example, check user roles, subscription status, etc.
  return true;
}

export function hasRole(user: User | null, role: string): boolean {
  if (!user) return false;

  // Add your role checking logic here
  return user.Role === role || false;
}

export function checkGuard(user: User | null, config: GuardConfig): boolean {
  if (!user) return false;

  if (config.permissions) {
    const hasAllPermissions = config.permissions.every((permission) =>
      hasPermission(user, permission)
    );
    if (!hasAllPermissions) return false;
  }

  if (config.roles) {
    const hasAnyRole = config.roles.some((role) => hasRole(user, role));
    if (!hasAnyRole) return false;
  }

  return true;
}

// Example guard configurations
export const GUARDS = {
  VIEW_PROFILE: {
    permissions: ['view_profile'],
  },
  EDIT_PROFILE: {
    permissions: ['edit_profile'],
  },
  VIEW_MATCHES: {
    permissions: ['view_matches'],
  },
  SEND_MESSAGES: {
    permissions: ['send_messages'],
  },
  ADMIN: {
    roles: ['admin'],
  },
  PREMIUM: {
    roles: ['premium'],
  },
} as const; 