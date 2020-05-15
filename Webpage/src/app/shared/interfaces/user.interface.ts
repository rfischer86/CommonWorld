
export interface User {
  name: string;
  apiId: string;
  email: string;
  token?: string;
}

export interface UserGroups{
  userApiId: string;
  groupApiId: string;
}

export interface UserRoles {
  userApiId: string;
  groupApiId: string;
  role: UserRoles;
}
