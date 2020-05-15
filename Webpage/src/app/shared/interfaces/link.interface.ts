export enum LinkType
{
  href = 'href',
  body = 'body',
  group = 'group',
  user = 'user',
  nav = 'nav'
}

export enum LinkClass
{
  classic = 'classic',
  file = 'file'
}


export interface Link
{
  name: string;
  link: string;
  linkType: LinkType,
  class: LinkClass
}
