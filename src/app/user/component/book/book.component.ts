import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Book} from "../../../shared/model/book";
import {UserBookService} from "../../service/user-book-service";
import {Page} from "../../../shared/model/page";
import {BookViewComponent} from "../../../admin/book/book-view/book-view.component";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'app-user-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  page!: Page;
  searchTerm: string = '';
  pageNumber = 1;
  loadInit = true;
  books =  new Array<Book>();
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private router: Router,
    private ngbModal: NgbModal,
    private bookService: UserBookService) {
	}

	ngOnInit(): void {
    this.bookService.findAll(1, '').subscribe((resp) => {
			this.books = resp.content;
		})
	}

  onSearch(searchText: string) {
    this.pageNumber = 1;
    this.searchTerm = searchText;
    this.loadInit = true;
    this.loadPage(this.pageNumber, this.searchTerm);
  }

  onClearSearch() {
    this.pageNumber = 1;
    this.searchTerm = '';
    this.loadInit = true;
    this.loadPage(this.pageNumber, this.searchTerm);
  }

  private loadPage(pageNumber: number, searchText?: string) {
    console.log('loadPage' + pageNumber);
    this.bookService.findAll(pageNumber, searchText).subscribe(resp => {
      this.addToUrl({'page': pageNumber, 'search': searchText});
      this.books = resp.content;
      if(this.loadInit) {
        this.loadInit = false;
        this.page = new Page(pageNumber, resp.numberOfElements, resp.totalElements, resp.totalPages, resp.first, resp.last);
      }
    });
  }

  onRead(book: Book) {
    const modalRef = this.ngbModal.open(BookViewComponent , {
      fullscreen: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.book = book;
  }

  onPageChange(pageNumber: any) {
    console.log('onPageChange' + pageNumber);
    this.loadPage(pageNumber, '');
  }

  addToUrl(params: any) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
