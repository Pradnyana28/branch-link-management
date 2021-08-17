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
  indexLink(@UserSession() user: any) {
    return this.linkService.findAll(user.idUser);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new RpcValidationFilter())
  showLink(@Param() params: Record<string, string>) {
    return this.linkService.findOne(params.id);
  }

  @Post('/original-url')
  @UseFilters(new RpcValidationFilter())
  showOriginalUrl(@Payload() body: { shortenUrl: string }) {
    return this.linkService.findUrlByShortUrl(body.shortenUrl);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  createLink(@Payload() input: CreateLinkDto[]) {
    // Maximum 10 links at the same time
    if (input.length > 10) {
      throw new BadRequestException(
        'Can only create 10 links at the same time',
      );
    }
    return this.linkService.createLink(input);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  updateLink(
    @Param() params: Record<string, string>,
    @Payload() input: UpdateLinkDto,
  ) {
    return this.linkService.updateLink(params.id, input);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteLink(@Param() params: Record<string, string>) {
    return this.linkService.deleteLink(params.id);
  }
}
