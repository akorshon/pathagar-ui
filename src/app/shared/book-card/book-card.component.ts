import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Book} from "../../admin/book/book";
import {environment} from "../../../environments/environment";
import {BookViewComponent} from "../../user/book/book-view/book-view.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {Category} from "../../admin/category/category";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: []
})
export class BookCardComponent {

  @Input()
  book: Book = Book.empty()

  @Input()
  admin = false;

  @Output()
  editBook = new EventEmitter<Book>();

  fileUrl = environment.backendUrl + '/api/public/files/';

  constructor(
    private router: Router,
    private ngbModal: NgbModal,) {

  }

  ngOnInit() {
  }

  onRead(book: Book) {
    const modalRef = this.ngbModal.open(BookViewComponent , {
      fullscreen: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.book = book;
  }

  onBooDetails(book: Book) {
    this.router.navigate(['/user/book', book.id]);
  }

  onEdit(book: Book) {
    this.editBook.emit(book);
  }
}
