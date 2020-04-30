
export enum RolesType {
  admin = 'admin',
  none = 'none',
  innerUser = 'innerUser',
  outerUser = 'outerUser',
  reader = 'reader',
  writer = 'writer'
}

export interface Role {
  roleType: RolesType;
  groupApiId: string;
  userApiId: string[];
}
