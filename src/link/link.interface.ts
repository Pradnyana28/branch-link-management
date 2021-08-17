import { Document } from 'mongoose';
import { Link } from './link.schema';

export type LinkDocument = Link & Document;

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
