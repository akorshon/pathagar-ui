import {Component, OnInit} from '@angular/core';
import {Author} from "../../../shared/model/author";
import {environment} from "../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {AuthorUploadComponent} from "../author-upload/author-upload.component";
import {AdminAuthorService} from "../../service/admin-author-service";
import {Page} from "../../../shared/model/page";
import {AuthorComponent} from "../author/author.component";

@Component({
	selector: 'app-admin-authors',
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
    this.adminAuthorService.findAll('').subscribe(resp => {
      this.authors = resp.content;
      this.page = new Page(resp.number, resp.numberOfElements, resp.totalElements, resp.totalPages, resp.first, resp.last)
    });
	}

  onOpenAuthorModal() {
    const modalRef = this.ngbModal.open(AuthorUploadComponent, {
      size: 'xl',
      backdrop: 'static'
    });

    modalRef.result.then((result) => {
      this.ngOnInit();
    });
  }

	onClickFileInputButton(id: string) {
		const fileInput = document.getElementById(id) as HTMLElement;
		fileInput.click();
	}

  onEdit(author: Author, index: number) {
    const modalRef = this.ngbModal.open(AuthorComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.author = author;
  }

}
