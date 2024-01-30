import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../../admin/book/book";
import {BookViewComponent} from "../../book/book-view/book-view.component";
import {Category} from "../../../admin/category/category";
import {UserCategoryService} from "../user-category-service";

@Component({
	selector: 'app-admin-author-details',
	templateUrl: './category-details.component.html',
	styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  category = Category.empty();
  books =  new Array<Book>();
  fileUrl = environment.backendUrl + '/api/public/files/';

  constructor(
    private title: Title,
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private userCategoryService: UserCategoryService) {
	}

	ngOnInit(): void {
      this.title.setTitle('AUTHOR | PATHAGAR ');
      this.route.params.subscribe(params => {
        console.log(params['id']);
        this.loadCategoryDetails(params['id']);
      });
	}

  onRead(book: Book) {
    const modalRef = this.ngbModal.open(BookViewComponent , {
      fullscreen: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.book = book;
  }

  loadCategoryDetails(id: string) {
    this.userCategoryService.findById(id).subscribe(resp => {
      this.category = resp;
    });
  }
}
