import {Component, Input} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {AdminBookService} from "../../service/admin-book-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";

@Component({
	selector: 'app-admin-book-view',
	templateUrl: './book-view.component.html',
	styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent {

  @Input()
  book!: Book;
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private title: Title,
    public ngbActiveModal: NgbActiveModal,
    private bookService: AdminBookService) {
      this.title.setTitle('BOOK | PATHAGAR ');
	}


  onPageChange(pageNumber: number) {
    console.log(pageNumber)
  }


  onClose() {
    this.ngbActiveModal.close();
  }
}
