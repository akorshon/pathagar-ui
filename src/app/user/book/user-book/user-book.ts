import {Book} from "../../../admin/book/book";

export class UserBook {
  constructor(
    public id: string,
    public book: Book,
    public page: number,
    public started: Date,
    public ended: Date | null,
    public status: String,
    public rating: number,
    public review: string) {
  }

  static empty(): UserBook {
    return new UserBook('', Book.empty(), 0, new Date(), null, '', 0, '');
  }
}
