
export interface User {
  name: string;
  apiId: string;
  email: string;
}

export interface UserGroups{
  userApiId: string;
  groupApiId: string;
}

export interface Group {
  name: string;
  apiId: string;
}

export interface UserRoles {
  userApiId: string;
  groupApiId: string;
  role: UserRoles;
}

export enum RolesType {
  admin = 'admin',
  none = 'none',
  innerUser = 'innerUser',
  outerUser = 'outerUser',
  reader = 'reader',
  writer = 'writer'
}
