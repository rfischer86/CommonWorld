export interface SearchSelection {
  name: string;
  id: string;
  description: string;
}

export enum SearchServices {
  user = 'user',
  role = 'role',
  group = 'group'
}
