export enum LinkStatus {
  READY = 'ready',
  BUILD = 'build',
}

export enum LinkType {
  DEFAULT = 'default',
}

export interface ILink {
  name: string;
  userId: string;
  originalUrl: string;
  type: LinkType;
  uiPreferences?: any;
  shortenUrl?: string;
  parentId?: string;
  thumb?: string;
  status?: LinkStatus;
}

export interface ILinkObject {
  name: string;
  userId: string;
  url: string;
  type: LinkType;
  uiPreferences?: any;
  thumb?: string;
  status?: LinkStatus;
}
