import {Component, OnInit} from '@angular/core';
import {Author} from "../author";
import {environment} from "../../../../environments/environment";
import {AdminAuthorService} from "../admin-author-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {Error} from "../../../shared/error/error";

@Component({
	selector: 'app-admin-author-upload',
	templateUrl: './author.component.html',
	styleUrls: []
})
export class AuthorComponent implements OnInit {

  submitted = false;
  author = Author.empty();
  fileUrl = environment.backendUrl + '/api/public/files/';
  selectedFile = new File([], '');
  error!: Error;

  constructor(
    private title: Title,
    public ngbActiveModal: NgbActiveModal,
    private adminAuthorService: AdminAuthorService) {
	}

	ngOnInit(): void {
      this.title.setTitle('AUTHOR | PATHAGAR ');
      console.log(this.author)
	}

  onCancel() {
      this.ngbActiveModal.close(null);
	}

  onDelete(author: Author) {
    this.adminAuthorService.delete(author.id).subscribe((resp) => {
      this.ngbActiveModal.close(resp);
    });
  }


  onClickFileInputButton(id: string) {
    const fileInput = document.getElementById(id) as HTMLElement;
    fileInput.click();
  }


  onSubmit(author: Author) {
    console.log('on submit');

    this.adminAuthorService.uploadAuthor(this.author).subscribe({
      next: (resp) => {
        this.ngbActiveModal.close(resp);
      },
      error: (err) => {
        this.error = err.error;
      }
    });

  }

  onSelectImage(event: any): void {
    this.selectedFile = event?.target?.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e: any) => {
      this.author.preview = e.target.result;
      this.author.file =  this.selectedFile;
      this.author.name = this.selectedFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    };
  }


}
