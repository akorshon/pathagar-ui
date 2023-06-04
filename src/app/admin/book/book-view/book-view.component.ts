import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {AdminBookService} from "../../service/admin-book-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {UserBook} from "../../../shared/model/user-book";
import {AdminUserBookService} from "../../service/admin-user--book-service";

@Component({
	selector: 'app-admin-book-view',
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
    private userBookService: AdminUserBookService,) {

	}

  ngOnInit() {
    this.title.setTitle('BOOK | PATHAGAR ');
  }


  onPageChange(pageNumber: number) {
    console.log(pageNumber)
    this.userBook.page = pageNumber;
    this.userBook.book = this.book;
    this.userBook.started = new Date();
    this.userBook.status = 'READING';
    this.userBookService.save(this.userBook).subscribe(resp => {
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
    if (event.key === 'ArrowRight') {
      this.nextPage();
    } else if (event.key === 'ArrowLeft') {
      this.prevPage();
    } else if (event.key === '+') {
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
    this.zoom = this.zoom + 0.20;
    localStorage.setItem(`zoom`, this.zoom.toString());
  }

  zoomOut() {
    this.zoom = this.zoom - 0.20;
    localStorage.setItem(`zoom`, this.zoom.toString());
  }


  /*@HostListener('window:scroll', ['$event'])
  onScroll(event:any) {
    console.log(event);
  }*/


}
