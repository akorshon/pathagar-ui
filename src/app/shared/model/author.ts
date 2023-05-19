export class Author {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public thumbnail: string,
    public image: string,
    public preview: string) {
  }

  static empty(): Author {
    return new Author('', '', '', '', '', '');
  }
}
