import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Book} from "../../../shared/model/book";
import {AdminBookService} from "../../../admin/service/admin-book-service";

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books =  new Array<Book>();
	photoUrl = environment.backendUrl + '/api/photos/';

	constructor(
				private bookService: AdminBookService) {
	}

	ngOnInit(): void {
		this.bookService.findAll().subscribe((resp) => {
			this.books = resp.content;
		})
	}
}
