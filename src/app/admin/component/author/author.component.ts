import {Component, OnInit} from '@angular/core';
import {Author} from "../../../shared/model/author";
import {environment} from "../../../../environments/environment";
import {AdminAuthorService} from "../../service/admin-author-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";

@Component({
	selector: 'app-admin-author-upload',
	templateUrl: './author.component.html',
	styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  submitted = false;
  author = Author.empty();
  fileUrl = environment.backendUrl + '/api/public/files/';

  constructor(
    private title: Title,
    public ngbActiveModal: NgbActiveModal,
    private adminAuthorService: AdminAuthorService) {
	}

	ngOnInit(): void {
      this.title.setTitle('AUTHOR | PATHAGAR ');
      console.log(this.author)
	}


	onSubmit(author: Author) {
      console.log(author);
      this.adminAuthorService.save(author, null).subscribe((resp: Author) => {
        this.ngbActiveModal.close(resp);
      });
    }


    onCancel() {
      this.ngbActiveModal.close(null);
	}


  onDelete(author: Author) {
    this.adminAuthorService.delete(author.id).subscribe((resp) => {
      this.ngbActiveModal.close(resp);
    });
  }

}
