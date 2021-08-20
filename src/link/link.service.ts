import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateLinkDto } from 'src/validator/update-link.dto';
import { ILink, ILinkObject, LinkStatus, LinkType } from './link.interface';
import { Link, LinkDocument } from './link.schema';
import LinkHelper from './LinkHelper';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private readonly linkModel: Model<Link>,
  ) {}

  async findAll(userId: string): Promise<ILinkObject[]> {
    Logger.debug({ userId }, 'INDEX LINKS');
    const links = await this.linkModel.find({ userId });
    return this.linkObjectMapping(links);
  }

  async findOne(linkId: string): Promise<ILinkObject | null> {
    Logger.debug({ linkId }, 'SHOW LINK');
    const link = await this.linkModel.findOne({ _id: linkId });
    return link ? this.linkObjectMapping([link])[0] : null;
  }

  async findUrlByShortUrl(shortenUrl: string): Promise<ILinkObject | null> {
    Logger.debug({ shortenUrl }, 'QUERY');
    const link = await this.linkModel.findOne({ shortenUrl });
    return link ? this.linkObjectMapping([link])[0] : null;
  }

  async createLink(links: ILink[]): Promise<ILinkObject[]> {
    Logger.debug({ totalLinkCreation: links.length }, 'CREATE LINK');
    const createdLinks = [];

    await Promise.all(
      links.map(async (link) => {
        link.shortenUrl = LinkHelper.randomUrl();
        link.type = link.type ?? LinkType.DEFAULT;

        try {
          Logger.debug(link, 'CREATE PARAMS');
          const created = await this.linkModel.create(link);
          Logger.debug(created, 'LINK CREATED');

          createdLinks.push();
        } catch (err) {
          Logger.debug(err, `Failed created link ${link}`);
        }
      }),
    );

    return createdLinks;
  }

  async updateLink(linkId: string, input: UpdateLinkDto) {
    Logger.debug({ linkId, updateLinkCreation: input }, 'UPDATE LINK');
    // At the moment, updating shortenUrl is not accepted
    delete (input as unknown as ILink).shortenUrl;
    const params: Partial<ILink> = {
      ...input,
      originalUrl: input.url,
    };
    await this.linkModel.updateOne({ _id: linkId, ...params });
    return true;
  }

  async deleteLink(linkId: string) {
    await this.linkModel.deleteOne({ _id: linkId });
    return true;
  }

  linkObjectMapping(links: LinkDocument[]): ILinkObject[] {
    return links.map((link) => ({
      id: link._id,
      name: link.name,
      userId: link.userId,
      url: link.shortenUrl,
      type: link.type,
      uiPreferences: link.uiPreferences ?? '',
      status: link.status ?? LinkStatus.READY,
      thumb: link.thumb ?? '',
    }));
  }
}
