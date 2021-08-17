import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ILink, LinkType } from 'src/link/link.interface';

export class CreateLinkDto implements ILink {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;

  @IsString()
  @IsNotEmpty()
  type: LinkType;

  @IsString()
  @IsOptional()
  uiPreferences?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  shortenUrl?: string;

  @IsString()
  @IsOptional()
  parentId?: string;

  @IsString()
  @IsOptional()
  thumb?: string;
}
