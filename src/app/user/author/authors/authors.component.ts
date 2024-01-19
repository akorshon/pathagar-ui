import {Component, OnInit} from '@angular/core';
import {Author} from "../../../admin/author/author";
import {environment} from "../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {Page} from "../../../shared/model/page";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthorService} from "../user-author-service";

@Component({
	selector: 'app-user-authors',
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
    private authorService: UserAuthorService) {
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
    this.authorService.findAll(pageNumber, search).subscribe(resp => {
      this.authors = resp.content;
      if(this.loadInit) {
        this.loadInit = false;
        this.page = new Page(pageNumber, resp.numberOfElements, resp.totalElements, resp.totalPages, resp.first, resp.last);
      }
    });
  }



  onPageChange(pageNumber: any) {
    this.loadAuthors(pageNumber, '');
  }

  onAuthorDetails(author: Author) {
    this.router.navigate(['/user/author', author.id]);
  }
}
