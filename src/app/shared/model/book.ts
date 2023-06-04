import {Author} from "./author";

export class Book {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public coverImage: string,
    public filePath: string,
    public preview: string,
    public totalPage: number,
    public size: number,
    public coverImagePage: number,
    public authors: Author[],
    public file: File) {
  }

  static empty(): Book {
    return new Book('', '', '', '', '', '', 0, 0, 0,[], new File([], ''));
  }
}
