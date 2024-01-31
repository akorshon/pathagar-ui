import {Component} from '@angular/core';
import {Book} from "../book";
import {Author} from "../../author/author";
import {environment} from "../../../../environments/environment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AdminFileService} from "../../service/admin-file-service";

@Component({
	selector: 'app-book-upload',
	templateUrl: './book-upload.component.html',
	styleUrls: []
})
export class BookUploadComponent {

	bookSrcList = [];
  book!: Book;
  submitted = false;
	books =  new Array<Book>();
  uploadedBooks = new Array<Book>();
	authors = new Array<Author>();
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    public ngbActiveModal: NgbActiveModal,
    private adminFileService: AdminFileService) {
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
    for (let book of books) {
      this.adminFileService.uploadBook(book).subscribe({
        next: (resp) => {
          console.log('success');
          this.uploadedBooks.push(resp);
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
        books: this.uploadedBooks,
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
