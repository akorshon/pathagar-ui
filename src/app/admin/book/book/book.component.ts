import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {AdminBookService} from "../../service/admin-book-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {Author} from "../../../shared/model/author";
import {AdminAuthorService} from "../../service/admin-author-service";
import {catchError, concat, distinctUntilChanged, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {UserBookService} from "../../../user/service/user--book-service";
import {AdminFileService} from "../../service/admin-file-service";

@Component({
	selector: 'app-admin-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input()
  book!: Book;

  authorLoading = false;
  authors!: Observable<Author[]>;
  fileUrl = environment.backendUrl + '/api/public/files/';
  authorInput = new Subject<string>();

	constructor(
    private title: Title,
    public ngbActiveModal: NgbActiveModal,
    private authorService: AdminAuthorService,
    private userBookService: UserBookService,
    private adminFileService: AdminFileService,
    private adminBookService: AdminBookService) {
      this.title.setTitle('BOOK | PATHAGAR ');
	}

  ngOnInit(): void {
    this.book.coverImage = this.book.coverImage + "?" + new Date().getTime();
    this.loadAuthor();
  }

  onSave(book: Book) {
    console.log(book);
    this.adminBookService.save(book).subscribe(resp => {
      this.ngbActiveModal.close({
        action: 'saved',
        book: resp,
      });
    });
  }

  onClose() {
    this.ngbActiveModal.close();
  }

  updateAuthor(author: Author, action: string) {
    console.log(author);
    this.adminBookService.updateAuthor(this.book.id, author.id, action).subscribe(resp => {
    });
  }


  trackByFn(author: Author) {
    return author.id;
  }

  private loadAuthor() {
    this.authors = concat(
      of([]), // default items
      this.authorInput.pipe(
        distinctUntilChanged(),
        tap(() => this.authorLoading = true),
        switchMap(term => this.authorService.findAll(0, term).pipe(
          map(resp => resp.content),
          catchError(() => of([])), // empty list on error
          tap(() => this.authorLoading = false)
        ))
      )
    );
  }

  onDelete(book: Book) {
    this.adminBookService.delete(book.id).subscribe(resp => {
      this.ngbActiveModal.close({
        action: 'deleted',
        id: book.id,
      });
    });
  }


  onUpdateThumb(page: number) {
    this.adminBookService.updateThumb(this.book.id, page).subscribe(resp => {
      this.book = resp;
      this.book.coverImage = this.book.coverImage + "?" + new Date().getTime();
    });
  }


  selectBook(event: any): void {
    this.adminFileService.updateBook(this.book.id, event?.target?.files[0]).subscribe({
      next: (resp) => {
        console.log('success');
        this.book = resp;
      },
      error: (error) => {
        console.log('error');
        console.log(error);
      }
    });
  }

  onClickFileInputButton(id: string) {
    const fileInput = document.getElementById(id) as HTMLElement;
    fileInput.click();
  }

  protected readonly Date = Date;
}
