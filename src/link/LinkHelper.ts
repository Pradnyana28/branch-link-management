import str from '@supercharge/strings';

class LinkHelper {
  private shortenDomain = 'https://bnsai.link';

  randomUrl() {
    return `${this.shortenDomain}/${str.random(10)}`;
  }
}

export default new LinkHelper();
