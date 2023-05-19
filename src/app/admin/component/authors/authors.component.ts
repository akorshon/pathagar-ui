import {Component, OnInit} from '@angular/core';
import {Book} from "../../../shared/model/book";
import {Author} from "../../../shared/model/author";
import {environment} from "../../../../environments/environment";
import {AdminBookService} from "../../service/admin-book-service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {BookUploadComponent} from "../book-upload/book-upload.component";
import {AuthorComponent} from "../author/author.component";
import {AdminAuthorService} from "../../service/admin-author-service";
import {Page} from "../../../shared/model/page";

@Component({
	selector: 'app-authors',
	templateUrl: './authors.component.html',
	styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

	page = Page.emptyPage();
	authors = new Array<Author>();
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private title: Title,
    private ngbModal: NgbModal,
    private adminAuthorService: AdminAuthorService) {
	}

	ngOnInit(): void {
    this.title.setTitle('AUTHORS | PATHAGAR ');
    this.adminAuthorService.findAll().subscribe(resp => {
      this.authors = resp.content;
      this.page = new Page(resp.number, resp.numberOfElements, resp.totalElements, resp.totalPages, resp.first, resp.last)
    });
	}

  onOpenAuthorModal() {
    const modalRef = this.ngbModal.open(AuthorComponent, {
      size: 'xl',
      backdrop: 'static'
    });
  }

	onClickFileInputButton(id: string) {
		const fileInput = document.getElementById(id) as HTMLElement;
		fileInput.click();
	}

  onDelete(author: Author, index: number) {
    this.adminAuthorService.delete(author.id).subscribe((resp) => {
      this.authors.splice(index, 1);
    });
  }

}
