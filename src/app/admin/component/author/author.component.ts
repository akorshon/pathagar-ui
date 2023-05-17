import {Component, OnInit} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {Author} from "../../../shared/model/author";
import {environment} from "../../../../environments/environment";
import {AdminBookService} from "../../service/admin-book-service";
import {AdminAuthorService} from "../../service/admin-author-service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {BookUploadComponent} from "../book-upload/book-upload.component";

@Component({
	selector: 'app-book-upload',
	templateUrl: './author.component.html',
	styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

	bookSrcList = [];
	books =  new Array<Book>();
	authors = new Array<Author>();
	photoUrl = environment.backendUrl + '/api/photos/';


	constructor(
    private title: Title,
    private ngbModal: NgbModal,
    private bookService: AdminBookService) {
	}

	ngOnInit(): void {
    this.title.setTitle('BOOK | PATHAGAR ');
	}

  onOpenBookUploadModal() {
    const modalRef = this.ngbModal.open(BookUploadComponent, {
      size: 'xl',
      backdrop: 'static'
    });
  }

	onClickFileInputButton(id: string) {
		const fileInput = document.getElementById(id) as HTMLElement;
		fileInput.click();
	}

	onRemove(index: number) {
		this.books.splice(index, 1);
	}

	onSubmit(books: Book[]) {
		console.log('on submit');
		let count = 0;
		for (let i = 0; i < this.books.length; i++) {
			this.bookService.save(books[i], books[i].file, null).subscribe((resp: Author) => {
				console.log(resp);
				this.onFinishUpload(++count)
			});
		}
	}

	onFinishUpload(count: number) {
		if(count === this.books.length) {
			//this.dialogRef.close(null);
		}
	}

	onCancel() {
		console.log('on cancel');
		//this.dialogRef.close(null);
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
