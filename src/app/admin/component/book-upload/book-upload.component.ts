import {Component} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {Author} from "../../../shared/model/author";
import {environment} from "../../../../environments/environment";
import {AdminBookService} from "../../service/admin-book-service";
import {AdminAuthorService} from "../../service/admin-author-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {pdfjsVersion} from "ngx-extended-pdf-viewer";

@Component({
	selector: 'app-book-upload',
	templateUrl: './book-upload.component.html',
	styleUrls: ['./book-upload.component.scss']
})
export class BookUploadComponent {

	bookSrcList = [];
  book!: Book;
  submitted = false;
	books =  new Array<Book>();
	authors = new Array<Author>();
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    public ngbActiveModal: NgbActiveModal,
		private bookService: AdminBookService,
		private authorService: AdminAuthorService) {
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
			this.bookService.save(books[i], books[i].file).subscribe((resp: Author) => {
				this.onFinishUpload(++count);
			});
		}
	}

  onUpdate(books: Book[]) {
    console.log('on update');
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
				let book = Book.empty()
				book.preview = e.target.result;
				book.file =  event?.target?.files[i];
				// @ts-ignore
				book.name = this.bookSrcList[i].name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
				this.books.push(book);
			};

		}
	}
}
