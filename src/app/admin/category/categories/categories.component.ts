import {Component, OnInit} from '@angular/core';
import {Author} from "../../author/author";
import {environment} from "../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {Page} from "../../../shared/model/page";
import {CategoryComponent} from "../category/category.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminCategoryService} from "../admin-category-service";
import {Category} from "../category";

@Component({
	selector: 'app-admin-categories',
	templateUrl: './categories.component.html',
	styleUrls: []
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
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private adminCategoryService: AdminCategoryService) {
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
    this.adminCategoryService.findAll(pageNumber, search).subscribe(resp => {
      this.categories = resp.content;
      if(this.loadInit) {
        this.loadInit = false;
        this.page = new Page(pageNumber, resp.numberOfElements, resp.totalElements, resp.totalPages, resp.first, resp.last);
      }
    });
  }

  onOpenModal() {
    const modalRef = this.ngbModal.open(CategoryComponent, {
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

  onEdit(category: Category, index: number) {
    const modalRef = this.ngbModal.open(CategoryComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.category = category;

    modalRef.result.then((result) => {
      if(result.action == 'deleted') {
        this.categories.splice(index, 1);
      }
    });
  }

  onPageChange(pageNumber: any) {
    console.log('onPageChange' + pageNumber);
    this.loadAuthors(pageNumber, '');
  }


  onAuthorDetails(author: Author) {
    this.router.navigate(['/admin/authors', author.id]);
  }
}
