import {Book} from "../book/book";
import {FileMeta} from "../../shared/model/file-meta";

export class Category {
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

  static empty(): Category {
    return new Category('', '', '', '', [],
      new File([], ''),
      new FileMeta(),
      new FileMeta()
    );
  }
}
