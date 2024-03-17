import { Component } from '@angular/core';
// Ck Editer
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Editor, TOOLBAR_FULL } from 'ngx-editor';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

// Create component
export class CreateComponent {

  editor: any = Editor;
  public Editor = ClassicEditor;
  toolbar: any = TOOLBAR_FULL;

  files: File[] = [];
  files1: File[] = [];

  constructor() { }

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Courses', active: true },
      { label: 'Create Course', active: true }
    ];
  }

  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false
  };

  public videodropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    acceptedFiles: 'video/*',
    maxFiles: 1,
    maxFilesize: 1024,
    addRemoveLinks: true,
    previewsContainer: false
  };

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // File Upload
  uploadedFiles1: any[] = [];

  // File Upload
  onUploadSuccess1(event: any) {
    setTimeout(() => {
      this.uploadedFiles1.push(event[0]);
    }, 0);
  }

  // File Remove
  removeFile1(event: any) {
    this.uploadedFiles1.splice(this.uploadedFiles1.indexOf(event), 1);
  }

  public items = ['Beginner', 'Advanced', 'Intermediate', 'Expert']
}
