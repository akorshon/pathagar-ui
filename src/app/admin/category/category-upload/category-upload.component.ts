import {Component, OnInit} from '@angular/core';
import {Author} from "../../author/author";
import {environment} from "../../../../environments/environment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {AdminFileService} from "../../service/admin-file-service";
import {FileType} from "../../../shared/model/file-type";
import {Category} from "../category";

@Component({
	selector: 'app-admin-category-upload',
	templateUrl: './category-upload.component.html',
	styleUrls: ['./category-upload.component.scss']
})
export class CategoryUploadComponent implements OnInit {

  submitted = false;
  selectedFiles = new Array<File>();
  categories =  new Array<Category>();
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


	onSubmit(categories: Category[]) {
    console.log('on submit');
    let count = 0;
    for (let i = 0; i < this.categories.length; i++) {
      this.adminFileService.uploadCategory(this.categories[i]).subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (error) => {

        },
        complete: () => {
          this.onFinishUpload(++count);
        }
      });
    }
  }

  onFinishUpload(count: number) {
    if(count === this.categories.length) {
      this.ngbActiveModal.close(null);
    }
  }

	onCancel() {
    this.ngbActiveModal.close(null);
	}

  onRemove(index: number) {
    this.categories.splice(index, 1);
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
        this.categories.push(author);
      };

    }
  }

}
