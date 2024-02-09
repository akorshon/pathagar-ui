import {Component, EventEmitter, Input, Output} from "@angular/core";
import {environment} from "../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {Author} from "../../admin/author/author";

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: []
})
export class AuthorCardComponent {

  @Input()
  author: Author = Author.empty()

  @Input()
  admin = false;

  @Output()
  editAuthor = new EventEmitter<Author>();

  fileUrl = environment.backendUrl + '/api/public/files/';

  constructor(
    private router: Router,
    private ngbModal: NgbModal,) {
  }

  ngOnInit() {
  }

  onAuthorDetails(author: Author) {
    this.router.navigate(['/user/author', author.id]);
  }

  onEdit(author: Author) {
    this.editAuthor.emit(author);
  }
}
