import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {Book} from "../../../shared/model/book";
import {AdminBookService} from "../../../admin/service/admin-book-service";

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

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
