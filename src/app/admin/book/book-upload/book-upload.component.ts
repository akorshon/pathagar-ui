import {Component} from '@angular/core';
import {Book} from "../book";
import {Author} from "../../author/author";
import {environment} from "../../../../environments/environment";
import {AdminBookService} from "../admin-book-service";
import {AdminAuthorService} from "../../author/admin-author-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AdminFileService} from "../../service/admin-file-service";
import {FileType} from "../../../shared/model/file-type";

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
  uplodedBooks = new Array<Book>();
	authors = new Array<Author>();
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    public ngbActiveModal: NgbActiveModal,
		private adminBookService: AdminBookService,
    private adminFileService: AdminFileService,
		private adminAuthorService: AdminAuthorService) {
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
      this.adminFileService.uploadBook(this.books[i].file, FileType.BOOK, books[i].name).subscribe({
        next: (resp) => {
          console.log('success');
          this.uplodedBooks.push(resp);
        },
        error: (error) => {
          console.log('error');
          console.log(error);
        }
      }).add(() => {
        console.log('count ++');
        this.onFinishUpload(++count);
      });
    }
  }

  onUpdate(books: Book[]) {
    console.log('on update');
  }

	onFinishUpload(count: number) {
		if(count === this.books.length) {
			this.ngbActiveModal.close({
        action: 'uploaded',
        books: this.uplodedBooks,
      });
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
