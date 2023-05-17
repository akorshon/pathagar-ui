import {Component, OnInit} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {Author} from "../../../shared/model/author";
import {environment} from "../../../../environments/environment";
import {AdminBookService} from "../../service/admin-book-service";
import {AdminAuthorService} from "../../service/admin-author-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'app-book-upload',
	templateUrl: './book-upload.component.html',
	styleUrls: ['./book-upload.component.scss']
})
export class BookUploadComponent implements OnInit {

	bookSrcList = [];
  submitted = false;
	books =  new Array<Book>();
	authors = new Array<Author>();


	constructor(
    public ngbActiveModal: NgbActiveModal,
		private bookService: AdminBookService,
		private authorService: AdminAuthorService) {
	}

	ngOnInit(): void {
		this.authorService.findAll().subscribe(resp => {
			this.authors = resp.content;
		});
	}


	onClickFileInputButton(id: string) {
		const fileInput = document.getElementById(id) as HTMLElement;
		fileInput.click();
	}

	onRemove(index: number) {
		this.books.splice(index, 1);
	}

  onClose() {
    this.ngbActiveModal.close();
  }

	onSubmit(books: Book[]) {
		console.log('on submit');
		let count = 0;
		for (let i = 0; i < this.books.length; i++) {
			this.bookService.save(books[i], books[i].file, null).subscribe((resp: Author) => {
				this.onFinishUpload(++count)
			});
		}
	}

	onFinishUpload(count: number) {
		if(count === this.books.length) {
			this.ngbActiveModal.close(null);
		}
	}

	onCancel() {
		console.log('on cancel');
		this.ngbActiveModal.close(null);
	}


	selectBook(event: any): void {
		this.bookSrcList = event?.target?.files;
		const numberOfFiles = this.bookSrcList.length;
		for (let i = 0; i < numberOfFiles; i++) {
			let reader = new FileReader();

			reader.readAsArrayBuffer(this.bookSrcList[i]);
			reader.onload = (e: any) => {
				let book = new Book();
				book.preview = e.target.result;
				book.file =  event?.target?.files[i];
				// @ts-ignore
				book.name = this.bookSrcList[i].name;
				this.books.push(book);
			};

		}
	}
}
