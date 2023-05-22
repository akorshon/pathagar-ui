import {Component, OnInit} from '@angular/core';
import {Author} from "../../../shared/model/author";
import {environment} from "../../../../environments/environment";
import {AdminAuthorService} from "../../service/admin-author-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {AdminFileService} from "../../service/admin-file-service";
import {FileType} from "../../../shared/model/file-type";

@Component({
	selector: 'app-admin-author-upload',
	templateUrl: './author-upload.component.html',
	styleUrls: ['./author-upload.component.scss']
})
export class AuthorUploadComponent implements OnInit {

  submitted = false;
  selectedFiles = new Array<File>();
  authors =  new Array<Author>();
  fileUrl = environment.backendUrl + '/api/public/files/';

  constructor(
    private title: Title,
    public ngbActiveModal: NgbActiveModal,
    private adminFileService: AdminFileService,
    private adminAuthorService: AdminAuthorService) {
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
    for (let i = 0; i < this.authors.length; i++) {
      this.adminFileService.upload(this.authors[i].file, FileType.AUTHOR_IMAGE).subscribe(resp => {
        this.authors[i].image = resp.filePath;
        this.adminAuthorService.save(this.authors[i]).subscribe(resp => {
          this.onFinishUpload(++count);
        });
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
