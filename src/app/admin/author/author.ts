import {Book} from "../book/book";
import {FileMeta} from "../../shared/model/file-meta";

export class Author {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public preview: string,
    public books: Book[],
    public file: File,
    public imageFile: FileMeta,
    public thumbFile: FileMeta) {
  }

  static empty(): Author {
    return new Author('', '', '', '',  [],
      new File([], ''),
      new FileMeta(),
      new FileMeta()
    );
  }
}
