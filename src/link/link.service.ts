import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLinkDto } from 'src/validator/create-link.dto';
import { UpdateLinkDto } from 'src/validator/update-link.dto';
import { Link } from './link.schema';
import LinkHelper from './LinkHelper';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private readonly linkModel: Model<Link>,
  ) {}

  async findAll(userId: string): Promise<Link[]> {
    Logger.debug({ userId }, 'QUERY');
    return this.linkModel.find({ userId });
  }

  async findOne(linkId: string): Promise<Link | null> {
    Logger.debug({ linkId }, 'QUERY');
    return this.linkModel.findOne({ _id: linkId });
  }

  async findUrlByShortUrl(
    shortenUrl: string,
  ): Promise<{ originalUrl: string }> {
    Logger.debug({ shortenUrl }, 'QUERY');
    const link = await this.linkModel.findOne({ shortenUrl });
    return { originalUrl: link?.originalUrl ?? '' };
  }

  async createLink(input: CreateLinkDto[]) {
    Logger.debug({ totalLinkCreation: input.length }, 'QUERY');
    const createdLinks = [];

    input.forEach(async (link) => {
      link.shortenUrl = LinkHelper.randomUrl();

      Logger.debug(link, 'CREATE PARAMS');
      const created = await this.linkModel.create(link);
      Logger.debug(created, 'LINK CREATED');

      createdLinks.push(created);
    });

    return createdLinks;
  }

  async updateLink(linkId: string, input: UpdateLinkDto) {
    Logger.debug({ linkId, updateLinkCreation: input }, 'QUERY');
    // At the moment, updating shortenUrl is not accepted
    delete input.shortenUrl;
    return this.linkModel.updateOne({ _id: linkId, ...input });
  }

  async deleteLink(linkId: string) {
    return await this.linkModel.deleteOne({ _id: linkId });
  }
}
