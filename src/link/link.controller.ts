import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { AuthGuard } from 'src/common/AuthGuard';
import { UserSession } from 'src/common/decorators';
import { RpcValidationFilter } from 'src/common/rpc-exception';
import { CreateLinkDto } from 'src/validator/create-link.dto';
import { UpdateLinkDto } from 'src/validator/update-link.dto';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseFilters(new RpcValidationFilter())
  async indexLink(@UserSession() user: any) {
    const links = await this.linkService.findAll(user._id);
    return { links };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new RpcValidationFilter())
  async showLink(@Param() params: Record<string, string>) {
    const link = await this.linkService.findOne(params.id);
    return { link };
  }

  @Post('/original-url')
  @UseFilters(new RpcValidationFilter())
  async showOriginalUrl(@Payload() body: { shortenUrl: string }) {
    if (!body.shortenUrl) {
      throw new BadRequestException('shortenUrl must be provided.');
    }
    const link = await this.linkService.findUrlByShortUrl(body.shortenUrl);
    return { originalUrl: link?.url ?? '' };
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async createLink(@Payload() input: CreateLinkDto) {
    const links = await this.linkService.createLink(input.links);
    return { links };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async updateLink(
    @Param() params: Record<string, string>,
    @Payload() input: UpdateLinkDto,
  ) {
    if (!Object.keys(input).length) {
      return { message: 'No changes need to be update' };
    }
    await this.linkService.updateLink(params.id, input);
    return { message: 'Link successfully updated' };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteLink(@Param() params: Record<string, string>) {
    await this.linkService.deleteLink(params.id);
    return true;
  }
}
