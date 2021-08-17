import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ILink, LinkStatus, LinkType } from './link.interface';

export type UserDocument = Link & Document;

@Schema()
export class Link implements ILink {
  @Prop() name: string;
  @Prop() userId: string;
  @Prop() originalUrl: string;
  @Prop() type: LinkType;
  @Prop() uiPreferences?: string;
  @Prop() shortenUrl?: string;
  @Prop() status?: LinkStatus;
  @Prop() parentId?: string;
  @Prop() thumb?: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
