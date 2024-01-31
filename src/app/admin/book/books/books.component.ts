import {Component, OnInit} from '@angular/core';
import {Book} from "../book";
import {environment} from "../../../../environments/environment";
import {AdminBookService} from "../admin-book-service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {BookUploadComponent} from "../book-upload/book-upload.component";
import {BookViewComponent} from "../../../user/book/book-view/book-view.component";
import {Page} from "../../../shared/model/page";
import {BookComponent} from "../book/book.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-admin-books',
	templateUrl: './books.component.html',
	styleUrls: []
})
export class BooksComponent implements OnInit {

  page!: Page;
  searchTerm: string = '';
  pageNumber = 1;
  loadInit = true;
	books =  new Array<Book>();
	fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private title: Title,
    private router: Router,
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private adminBookService: AdminBookService) {
	}

	ngOnInit(): void {
    this.title.setTitle('BOOKS | PATHAGAR ');
    this.route.queryParams.subscribe((params: any) => {
      this.pageNumber = params.page ? params.page : 1;
      this.searchTerm = params.search ? params.search : '';
    });
    this.loadPage(this.pageNumber, this.searchTerm);
  }

  private loadPage(pageNumber: number, searchText?: string) {
    console.log('loadPage' + pageNumber);
    this.adminBookService.findAll(pageNumber, searchText).subscribe(resp => {
      this.addToUrl({'page': pageNumber, 'search': searchText});
      this.books = resp.content;
      if(this.loadInit) {
        this.loadInit = false;
        this.page = new Page(pageNumber, resp.numberOfElements, resp.totalElements, resp.totalPages, resp.first, resp.last);
      }
    });
  }


  onOpenBookUploadModal() {
    const modalRef = this.ngbModal.open(BookUploadComponent, {
      size: 'xl',
      backdrop: 'static'
    });

    modalRef.result.then((result) => {
      if(result != null && result.action == 'uploaded') {
        this.loadPage(this.pageNumber, this.searchTerm);
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


  onClearSearch() {
    this.pageNumber = 1;
    this.searchTerm = '';
    this.loadInit = true;
    this.loadPage(this.pageNumber, this.searchTerm);
  }

  onSearch(searchText: string) {
    this.pageNumber = 1;
    this.searchTerm = searchText;
    this.loadInit = true;
    this.loadPage(this.pageNumber, this.searchTerm);
  }

  onPageChange(pageNumber: any) {
    console.log('onPageChange' + pageNumber);
    this.loadPage(pageNumber, '');
  }


  onEdit(book: Book, index: number) {
    const  modalRef = this.ngbModal.open(BookComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.book = book;

    // Return the result when modal closed
    modalRef.result.then((result) => {
      if(result.action == 'deleted') {
        this.books.splice(index, 1);
      }

      if(result.action == 'saved') {
        result.book.coverImage.path = result.book.coverImage.path + "?" + new Date().getTime();
        this.books[index] = result.book;
      }
    });
  }

  onDelete(book: Book, index: number) {
    this.adminBookService.delete(book.id).subscribe((resp) => {
      this.books.splice(index, 1);
    });
  }

  addToUrl(params: any) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

}
