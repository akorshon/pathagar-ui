import {Component, OnInit} from '@angular/core';
import {Author} from "../author";
import {environment} from "../../../../environments/environment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {AdminFileService} from "../../service/admin-file-service";

@Component({
	selector: 'app-admin-author-upload',
	templateUrl: './author-upload.component.html',
	styleUrls: ['']
})
export class AuthorUploadComponent implements OnInit {

  submitted = false;
  selectedFiles = new Array<File>();
  authors =  new Array<Author>();
  fileUrl = environment.backendUrl + '/api/public/files/';

  constructor(
    private title: Title,
    public ngbActiveModal: NgbActiveModal,
    private adminFileService: AdminFileService) {
	}

	ngOnInit(): void {
    this.title.setTitle('AUTHOR | PATHAGAR ');
	}


	onClickFileInputButton(id: string) {
		const fileInput = document.getElementById(id) as HTMLElement;
		fileInput.click();
	}


	onSubmit(authors: Author[]) {
    console.log('on submit');
    let count = 0;
    for (let author of authors) {
      this.adminFileService.uploadAuthor(author).subscribe({
        next: (resp) => {
          console.log(resp);
        },
        complete: () => {
          this.onFinishUpload(++count);
        }
      });
    }
  }

  onFinishUpload(count: number) {
    if(count === this.authors.length) {
      this.ngbActiveModal.close(null);
    }
  }

	onCancel() {
    this.ngbActiveModal.close(null);
	}

  onRemove(index: number) {
    this.authors.splice(index, 1);
  }

  onSelectImage(event: any): void {
    this.selectedFiles = event?.target?.files;
    const numberOfFiles = this.selectedFiles.length;

    for (let i = 0; i < numberOfFiles; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[i]);
      reader.onload = (e: any) => {
        let author = Author.empty();
        author.preview = e.target.result;
        author.file =  event?.target?.files[i];
        // @ts-ignore
        author.name = this.selectedFiles[i].name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
        this.authors.push(author);
      };

    }
  }

}
