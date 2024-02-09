import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Book} from "../../admin/book/book";
import {environment} from "../../../environments/environment";
import {BookViewComponent} from "../../user/book/book-view/book-view.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {Category} from "../../admin/category/category";

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: []
})
export class CategoryCardComponent {

  @Input()
  category: Category = Category.empty()

  @Input()
  admin = false;

  @Output()
  editCategory = new EventEmitter<Category>();

  fileUrl = environment.backendUrl + '/api/public/files/';

  constructor(
    private router: Router,
    private ngbModal: NgbModal,) {

  }

  ngOnInit() {
  }

  onCategoryDetails(category: Category) {
    this.router.navigate(['/user/category', category.id]);
  }

  onEdit(category: Category) {
    this.editCategory.emit(category);
  }
}
