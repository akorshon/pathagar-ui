import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Book} from "../../../shared/model/book";
import {PrivateBookService} from "../../service/private-book-service";

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  books =  new Array<Book>();
	photoUrl = environment.backendUrl + '/api/photos/';

	constructor(
				private bookService: PrivateBookService) {
	}

	ngOnInit(): void {
		this.bookService.findAll().subscribe((resp) => {
			this.books = resp.content;
		})
	}

}
