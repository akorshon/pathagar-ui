export class Page {
  constructor(
    public number: number, // page number
    public numberOfElements: number, // in a page
    public totalElements: number,
    public totalPages: number,
    public first: boolean,
    public last: boolean) {
  }

  static emptyPage(): Page {
    return new Page(0, 0, 0, 0, false, false);
  }

}
