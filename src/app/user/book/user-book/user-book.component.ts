import {Component, OnInit} from '@angular/core';
import {Book} from "../../../admin/book/book";
import {environment} from "../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {BookUploadComponent} from "../../../admin/book/book-upload/book-upload.component";
import {BookViewComponent} from "../book-view/book-view.component";
import {Page} from "../../../shared/model/page";
import {BookComponent} from "../../../admin/book/book/book.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UserBookService} from "../user-book-service";
import {UserBook} from "./user-book";

@Component({
	selector: 'app-user-books',
	templateUrl: './user-book.component.html',
	styleUrls: []
})
export class UserBookComponent implements OnInit {

  searchTerm: string = '';
  pageNumber = 1;
  loadInit = true;
  page!: Page;
	userBooks =  new Array<UserBook>();
	fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private title: Title,
    private router: Router,
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private userBookService: UserBookService) {
	}

	ngOnInit(): void {
    this.title.setTitle('YOUR BOOKS | PATHAGAR ');
    this.route.queryParams.subscribe((params: any) => {
      this.pageNumber = params.page ? params.page : 1;
      this.searchTerm = params.search ? params.search : '';
    });
    this.loadUserBooks(this.pageNumber, this.searchTerm);
  }

  private loadUserBooks(pageNumber: number, searchText?: string) {
    console.log('loadPage' + pageNumber);

    this.userBookService.findAll(pageNumber, searchText).subscribe(resp => {
      this.addToUrl({'page': pageNumber, 'search': searchText});
      this.userBooks = resp.content;
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
    this.loadUserBooks(this.pageNumber, this.searchTerm);
  }

  onSearch(searchText: string) {
    this.pageNumber = 1;
    this.searchTerm = searchText;
    this.loadInit = true;
    this.loadUserBooks(this.pageNumber, this.searchTerm);
  }

  onPageChange(pageNumber: any) {
    console.log('onPageChange' + pageNumber);
    this.loadUserBooks(pageNumber, '');
  }

  onWriteReview(book: Book, index: number) {

  }

  onEdit(book: Book, index: number) {
    const  modalRef = this.ngbModal.open(BookComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.book = book;

    // Return the result when modal closed
    modalRef.result.then((result) => {
      if(result.action == 'delete') {
        this.userBooks.splice(index, 1);
      }
    });
  }

  onDelete(book: Book, index: number) {
    this.userBookService.delete(book.id).subscribe((resp) => {
      this.userBooks.splice(index, 1);
    });
  }

  addToUrl(params: any) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

}
