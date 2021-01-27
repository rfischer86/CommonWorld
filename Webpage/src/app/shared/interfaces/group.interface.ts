import { LinkType, LinkClass } from './link.interface';

export interface Group {
  name: string;
  apiId: string;
}

export interface GroupSelector {
  apiId: string;
  name: string;
  icon: string;
  color: string;
  linkType: LinkType,
  class: LinkClass,
  image: Blob;
}
