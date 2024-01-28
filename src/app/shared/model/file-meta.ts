import {FileType} from "./file-type";

export class FileMeta {
  id: string = '';
  name: string = '';
  path: string = '';
  fileType: FileType = FileType.BOOK;
  hash: string = '';
  size: number = 0
}
