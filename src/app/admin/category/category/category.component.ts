import {Component, OnInit} from '@angular/core';
import {Author} from "../../author/author";
import {environment} from "../../../../environments/environment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {Category} from "../category";
import {AdminCategoryService} from "../admin-category-service";

@Component({
	selector: 'app-admin-category-upload',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  submitted = false;
  fileUrl = environment.backendUrl + '/api/public/files/';
  selectedFile =  new File([], '');
  category = Category.empty();


  constructor(
    private title: Title,
    public ngbActiveModal: NgbActiveModal,
    private adminCategoryService: AdminCategoryService) {
	}

	ngOnInit(): void {
      this.title.setTitle('AUTHOR | PATHAGAR ');
	}


	onSubmit(author: Author) {
      console.log(author);
      this.adminCategoryService.uploadCategory(author).subscribe((resp: Author) => {
        this.ngbActiveModal.close(resp);
      });
    }

    onCancel() {
      this.ngbActiveModal.close(null);
	}


  onDelete(author: Author) {
    this.adminCategoryService.delete(author.id).subscribe((resp) => {
      this.ngbActiveModal.close(resp);
    });
  }

  onClickFileInputButton(id: string) {
    const fileInput = document.getElementById(id) as HTMLElement;
    fileInput.click();
  }

  onSelectImage(event: any): void {
    this.selectedFile = event?.target?.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e: any) => {
      this.category.preview = e.target.result;
      this.category.file =  this.selectedFile
      // @ts-ignore
      this.category.name = this.selectedFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    };
  }
}
