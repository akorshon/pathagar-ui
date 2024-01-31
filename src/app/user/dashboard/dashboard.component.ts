import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {UserCategoryService} from "../category/user-category-service";
import {Category} from "../../admin/category/category";
import {environment} from "../../../environments/environment";
import {Book} from "../../admin/book/book";
import {BookViewComponent} from "../book/book-view/book-view.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserBookService} from "../book/user-book-service";
import {UserBook} from "../book/user-book/user-book";
import {Router} from "@angular/router";

@Component({
	selector: 'app-user-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['']
})
export class DashboardComponent implements OnInit {
  time = new Date();
  categories: Category[] = [];
  fileUrl = environment.backendUrl + '/api/public/files/';
  yourReading: UserBook[] = [];

  constructor(
    private userBookService: UserBookService,
    private ngbModal: NgbModal,
    private router: Router,
    private categoryService: UserCategoryService) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.categoryService.findAll(0, '').subscribe((resp) => {
      this.categories = resp.content;
    });


    this.userBookService.findAllByStatus("READING").subscribe((resp) => {
      this.yourReading = resp.content;
    });
  }

  onRead(book: Book) {
    const modalRef = this.ngbModal.open(BookViewComponent , {
      fullscreen: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.book = book;
  }

  onCategoryDetails(category: Category) {
    this.router.navigate(['/user/category', category.id]);
  }

  onUserBookClick() {
    this.router.navigate(['/user/user-book']);
  }
  customOptions: OwlOptions = {
    loop: false,
    margin: 10,
    stagePadding: 10,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


}
