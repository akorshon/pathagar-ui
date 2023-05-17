import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {AdminBookService} from "../../service/admin-book-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";

@Component({
	selector: 'app-admin-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent {

  @Input()
  book!: Book;
  page: number = 1;
  zoom: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private title: Title,
    public ngbActiveModal: NgbActiveModal,
    private bookService: AdminBookService) {
      this.title.setTitle('BOOK | PATHAGAR ');
	}


  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  zoomIn() {
    this.zoom = this.zoom + 0.25;
  }

  zoomOut() {
    if (this.zoom > 1) {
      this.zoom = this.zoom - 0.25;
    }
  }

  onClose() {
    this.ngbActiveModal.close();
  }
}
