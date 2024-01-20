import {Component, OnInit} from '@angular/core';
import {Author} from "../author";
import {environment} from "../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {AuthorUploadComponent} from "../author-upload/author-upload.component";
import {AdminAuthorService} from "../admin-author-service";
import {Page} from "../../../shared/model/page";
import {AuthorComponent} from "../author/author.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-admin-authors',
	templateUrl: './authors.component.html',
	styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  searchTerm: string = '';
  pageNumber = 1;
  loadInit = true;
  page!: Page;
  authors = new Array<Author>();
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private title: Title,
    private router: Router,
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private adminAuthorService: AdminAuthorService) {
	}

	ngOnInit(): void {
    this.title.setTitle('AUTHORS | PATHAGAR ');
    this.route.queryParams.subscribe((params: any) => {
      this.pageNumber = params.page ? params.page : 1;
      this.searchTerm = params.search ? params.search : '';
    });
    this.loadAuthors(this.pageNumber, this.searchTerm);
	}

  loadAuthors(pageNumber:number, search: string) {
    this.adminAuthorService.findAll(pageNumber, search).subscribe(resp => {
      this.authors = resp.content;
      if(this.loadInit) {
        this.loadInit = false;
        this.page = new Page(pageNumber, resp.numberOfElements, resp.totalElements, resp.totalPages, resp.first, resp.last);
      }
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

    modalRef.result.then((result) => {
      if(result.action == 'deleted') {
        this.authors.splice(index, 1);
      }
    });
  }

  onPageChange(pageNumber: any) {
    console.log('onPageChange' + pageNumber);
    this.loadAuthors(pageNumber, '');
  }


  onDetails(author: Author) {
    this.router.navigate(['/admin/authors', author.id]);
  }
}
