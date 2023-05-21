import {Component, OnInit} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {environment} from "../../../../environments/environment";
import {AdminBookService} from "../../service/admin-book-service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {BookUploadComponent} from "../book-upload/book-upload.component";
import {BookViewComponent} from "../book-view/book-view.component";
import {Page} from "../../../shared/model/page";
import {BookComponent} from "../book/book.component";

@Component({
	selector: 'app-admin-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  searchTerm: string = '';
  loadInit = true;
  page = Page.emptyPage();
	books =  new Array<Book>();
	fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private title: Title,
    private ngbModal: NgbModal,
    private adminBookService: AdminBookService) {
	}

	ngOnInit(): void {
    this.title.setTitle('BOOKS | PATHAGAR ');
	}

  private loadPage(pageNumber: number, searchText?: string) {
    this.adminBookService.findAll(pageNumber).subscribe(resp => {
      this.books = resp.content;
      console.log(pageNumber);
      if (pageNumber == 0 && this.loadInit) {
        this.page = new Page(resp.number, resp.numberOfElements, resp.totalElements, resp.totalPages, resp.first, resp.last);
        this.loadInit = false;
      }
    });
  }


  onOpenBookUploadModal() {
    const modalRef = this.ngbModal.open(BookUploadComponent, {
      size: 'xl',
      backdrop: 'static'
    });

    modalRef.result.then((result) => {
      this.loadPage(0, '');
    });
  }

  onRead(book: Book) {
    const modalRef = this.ngbModal.open(BookViewComponent , {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.book = book;
  }


  onClearSearch() {
    this.searchTerm = '';
  }

  onSearch(searchText: string) {
    this.page.number = 0;
    this.loadPage(this.page.number, searchText);
  }

  onPageChange(pageNumber: any) {
    console.log(pageNumber);
    pageNumber = pageNumber - 1;
    this.loadPage(pageNumber, this.searchTerm);
  }


  onEdit(book: Book, index: number) {
    const  modalRef = this.ngbModal.open(BookComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.book = book;

    // Return the result when modal closed
    modalRef.result.then((result) => {
      this.loadPage(0, '');
    });
  }

  onDelete(book: Book, index: number) {
    this.adminBookService.delete(book.id).subscribe((resp) => {
      this.books.splice(index, 1);
    });
  }

}
