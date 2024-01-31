import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Book} from "../../../admin/book/book";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {UserBook} from "../user-book/user-book";
import {UserBookService} from "../user-book-service";

@Component({
	selector: 'app-user-book-view',
	templateUrl: './book-view.component.html',
	styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {

  @Input()
  book!: Book;

  userBook = UserBook.empty()
  zoom = 1;
  page = 1;
  totalPages = 0;
  isLoaded = false;
  fileUrl = environment.backendUrl + '/api/public/files/';

  constructor(
    private title: Title,
    public ngbActiveModal: NgbActiveModal,
    private userBookService: UserBookService,) {

	}

  ngOnInit() {
    this.title.setTitle('BOOK | PATHAGAR ');
  }


  onPageChange(pageNumber: number) {
    this.userBook.page = pageNumber;
    this.userBook.book = this.book;
    if(pageNumber == this.totalPages) {
      this.userBook.status = 'FINISHED';
    } else {
      this.userBook.status = 'READING';
    }
    this.userBookService.save(this.userBook).subscribe(resp => {
      console.log("update book page");
      this.userBook = resp;
    });
  }

  onClose() {
    this.ngbActiveModal.close();
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
    this.zoom = localStorage.getItem(`zoom`) ? parseFloat(localStorage.getItem(`zoom`)!) : 1;
    this.userBookService.findByBookId(this.book.id).subscribe((resp) =>  {
      this.userBook = resp;
      this.page = this.userBook.page;
    });
  }

  @HostListener("document:keydown", ["$event"])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === '+') {
      this.zoomIn();
    } else if (event.key === '-') {
      this.zoomOut();
    }
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  zoomIn() {
    this.zoom = this.zoom + 0.10;
    localStorage.setItem(`zoom`, this.zoom.toString());
  }

  zoomOut() {
    this.zoom = this.zoom - 0.10;
    localStorage.setItem(`zoom`, this.zoom.toString());
  }

}
