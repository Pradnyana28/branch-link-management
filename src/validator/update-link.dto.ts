import { IsMongoId, IsOptional, IsString, IsUrl } from 'class-validator';
import { ILink, LinkType } from 'src/link/link.interface';

export class UpdateLinkDto implements ILink {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsMongoId()
  userId: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  originalUrl: string;

  @IsString()
  @IsOptional()
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
