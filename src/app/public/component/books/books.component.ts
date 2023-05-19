import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Book} from "../../../shared/model/book";
import {AdminBookService} from "../../../admin/service/admin-book-service";
import {Page} from "../../../shared/model/page";

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books =  new Array<Book>();
  page = Page.emptyPage();
	photoUrl = environment.backendUrl + '/api/photos/';

	constructor(
				private bookService: AdminBookService) {
	}

	ngOnInit(): void {
		this.bookService.findAll(this.page.number).subscribe((resp) => {
			this.books = resp.content;
		})
	}
}
