import {Book} from "./book";

export class Author {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public thumbnail: string,
    public image: string,
    public preview: string,
    public books: Book[]) {
  }

  static empty(): Author {
    return new Author('', '', '', '', '', '', []);
  }
}
