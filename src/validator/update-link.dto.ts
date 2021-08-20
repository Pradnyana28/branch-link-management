import { IsMongoId, IsOptional, IsString, IsUrl } from 'class-validator';
import { ILink, LinkType } from 'src/link/link.interface';

export class UpdateLinkDto implements Partial<ILink> {
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
  url: string;

  @IsString()
  @IsOptional()
  type: LinkType;

  @IsString()
  @IsOptional()
  uiPreferences?: string;

  @IsString()
  @IsOptional()
  parentId?: string;

  @IsString()
  @IsOptional()
  thumb?: string;
}
