import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ILink, LinkType } from 'src/link/link.interface';

export class CreateLinkItemDto implements ILink {
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
export class CreateLinkDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(10, { message: 'Can only create 10 links at the same time' })
  @Type(() => CreateLinkItemDto)
  @ValidateNested({ each: true })
  public links: CreateLinkItemDto[];
}
