import {Author} from "../author/author";
import {Category} from "../category/category";
import {FileMeta} from "../../shared/model/file-meta";

export class Book {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public preview: string,
    public totalPage: number,
    public size: number,
    public coverImagePage: number,
    public authors: Author[],
    public categories: Category[],
    public file: File,
    public pdfFile: FileMeta,
    public coverImage: FileMeta,) {
  }

  static empty(): Book {
    return new Book('', '', '',  '', 0, 0, 0,
      [],
      [],
      new File([], ''),
        new FileMeta(),
        new FileMeta()
    );
  }
}
