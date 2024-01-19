import {Book} from "../book/book";

export class Category {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public thumbnailPath: string,
    public imagePath: string,
    public preview: string,
    public books: Book[],
    public file: File) {
  }

  static empty(): Category {
    return new Category('', '', '', '', '', '', [], new File([], ''));
  }
}
