import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Book} from "../../../admin/book/book";
import {BookService} from "../book-service";
import {Page} from "../../../shared/model/page";
import {BookViewComponent} from "../book-view/book-view.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Category} from "../../../admin/category/category";

@Component({
	selector: 'app-user-book',
	templateUrl: './book.component.html',
	styleUrls: []
})
export class BookComponent implements OnInit {

  page!: Page;
  searchTerm: string = '';
  bookId = '';
  loadInit = true;
  book =  Book.empty();
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private router: Router,
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private bookService: BookService) {
	}

	ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.bookId = params.id
    });
    this.loadBook(this.bookId);
	}

  loadBook(bookId: string) {
    this.bookService.findById(bookId).subscribe(resp => {
      this.book = resp;
    });
  }

  onRead(book: Book) {
    const modalRef = this.ngbModal.open(BookViewComponent , {
      fullscreen: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.book = book;
  }
}
