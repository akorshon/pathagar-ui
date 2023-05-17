import {Component, OnInit} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {environment} from "../../../../environments/environment";
import {AdminBookService} from "../../service/admin-book-service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {BookUploadComponent} from "../book-upload/book-upload.component";
import {BookComponent} from "../book/book.component";

@Component({
	selector: 'app-book-upload',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

	books =  new Array<Book>();
	fileUrl = environment.backendUrl + '/api/public/files/';


	constructor(
    private title: Title,
    private ngbModal: NgbModal,
    private adminBookService: AdminBookService) {
	}

	ngOnInit(): void {
    this.title.setTitle('BOOKS | PATHAGAR ');
    this.adminBookService.findAll().subscribe((resp: Book[]) => {
      this.books = resp;
    });
	}

  onOpenBookUploadModal() {
    const modalRef = this.ngbModal.open(BookUploadComponent, {
      size: 'xl',
      backdrop: 'static'
    });

    modalRef.result.then((result) => {
      this.ngOnInit();
    });
  }

  onRead(book: Book) {
    const modalRef = this.ngbModal.open(BookComponent , {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.book = book;
  }

  onDelete(book: Book, index: number) {
    this.adminBookService.delete(book.id).subscribe((resp) => {
      this.books.splice(index, 1);
    });

  }



}
