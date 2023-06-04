import {Component, OnInit} from '@angular/core';
import {Author} from "../../../shared/model/author";
import {environment} from "../../../../environments/environment";
import {AdminAuthorService} from "../../service/admin-author-service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../../shared/model/book";
import {BookViewComponent} from "../../book/book-view/book-view.component";
import {BookComponent} from "../../book/book/book.component";

@Component({
	selector: 'app-admin-author-details',
	templateUrl: './author-details.component.html',
	styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {

  author = Author.empty();
  books =  new Array<Book>();
  fileUrl = environment.backendUrl + '/api/public/files/';

  constructor(
    private title: Title,
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private adminAuthorService: AdminAuthorService) {
	}

	ngOnInit(): void {
      this.title.setTitle('AUTHOR | PATHAGAR ');
      this.route.params.subscribe(params => {
        console.log(params['id']);
        this.loadAuthorDetails(params['id']);
      });
	}

  onRead(book: Book) {
    const modalRef = this.ngbModal.open(BookViewComponent , {
      fullscreen: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.book = book;
  }

  loadAuthorDetails(id: string) {
    this.adminAuthorService.findById(id).subscribe(resp => {
      this.author = resp;
    });
  }

  onEdit(book: Book, index: number) {
    const  modalRef = this.ngbModal.open(BookComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.book = book;

    // Return the result when modal closed
    modalRef.result.then((result) => {
      if(result.action == 'deleted') {
        this.books.splice(index, 1);
      }

      if(result.action == 'saved') {
        result.book.coverImage = result.book.coverImage + "?" + new Date().getTime();
        this.books[index] = result.book;
      }
    });
  }
}
