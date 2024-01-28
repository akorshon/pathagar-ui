import {Component, OnInit} from '@angular/core';
import {Author} from "../../../admin/author/author";
import {environment} from "../../../../environments/environment";
import {Title} from "@angular/platform-browser";
import {Page} from "../../../shared/model/page";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../../admin/category/category";
import {UserCategoryService} from "../user-category-service";

@Component({
	selector: 'app-user-authors',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  searchTerm: string = '';
  pageNumber = 1;
  loadInit = true;
  page!: Page;
  categories = new Array<Category>();
  fileUrl = environment.backendUrl + '/api/public/files/';

	constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private userCategoryService: UserCategoryService) {
	}

	ngOnInit(): void {
    this.title.setTitle('AUTHORS | PATHAGAR ');
    this.route.queryParams.subscribe((params: any) => {
      this.pageNumber = params.page ? params.page : 1;
      this.searchTerm = params.search ? params.search : '';
    });
    this.loadCategories(this.pageNumber, this.searchTerm);
	}

  loadCategories(pageNumber:number, search: string) {
    this.userCategoryService.findAll(pageNumber, search).subscribe(resp => {
      this.categories = resp.content;
      if(this.loadInit) {
        this.loadInit = false;
        this.page = new Page(pageNumber, resp.numberOfElements, resp.totalElements, resp.totalPages, resp.first, resp.last);
      }
    });
  }



  onPageChange(pageNumber: any) {
    this.loadCategories(pageNumber, '');
  }

  onAuthorDetails(author: Author) {
    this.router.navigate(['/user/category', author.id]);
  }
}
