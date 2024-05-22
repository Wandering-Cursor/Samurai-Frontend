import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { restApiService } from 'src/app/core/services/rest-api.service';
import { GlobalComponent } from 'src/app/global-component';
import { Task, Comment } from 'src/app/interfaces/api-interfaces';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  task: any; // Define the type based on your model
  comments: any[] = [];
  commentText: string = '';
  files: File[] = [];
  selectedStatus: string = '';
  statuses: string[] = ['open', 'in_progress', 'in_review', 'resubmit', 'done'];
  taskId: string = '';
  fileId: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: restApiService,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['taskId'];
      this.apiService.getTaskById(this.taskId).subscribe((task) => {
        this.task = task;
        this.selectedStatus = task.state;
        this.loadComments(this.taskId);
      });
    });
  }

  loadComments(taskId: string) {
    this.apiService.getComments(taskId).subscribe((comments) => {
      this.comments = comments;
      this.comments.forEach((comment) => {
        if (comment.file_id) {
          this.apiService.getFileInfo(comment.file_id).subscribe((fileInfo) => {
            comment.fileInfo = fileInfo;
          });
        }
      });
    });
  }

  handleFileInput(event: Event) {
    const element = event.target as HTMLInputElement;
    let files: FileList | null = element.files;

    if (files && files.length > 0) {
      this.uploadFile(files[0]); // Upload only the first file
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file, file.name);

    this.apiService.postFile(formData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
        // Store the file_id from the response
        this.fileId = response.file_id; // Assume this.fileId is a string to store the file ID
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      },
    });
  }

  postComment(taskId: string, commentText: string) {
    const commentData: any = {
      text: commentText,
    };

    // Only add file_id to the commentData if it exists
    if (this.fileId) {
      commentData.file_id = this.fileId;
    }

    this.apiService.postComment(taskId, commentData).subscribe({
      next: (response) => {
        console.log('Comment posted successfully:', response);
        this.loadComments(taskId);
        this.commentText = '';
        this.fileId = null; // Clear the stored file ID after posting
      },
      error: (error) => {
        console.error('Error posting comment:', error);
      },
    });
  }

downloadFile(fileId: string) {
  this.apiService.downloadFile(fileId).subscribe({
    next: ({ blob, filename }) => {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;  // Use the extracted filename
      document.body.appendChild(anchor);
      anchor.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    },
    error: error => {
      console.error('Download failed:', error);
    }
  });
}


  

  isCurrentUser(senderId: string): boolean {
    return this.authService.getCurrentUserUUID() === senderId;
  }

  toggleEdit(comment: any) {
    if (this.isCurrentUser(comment.sender_id)) {
      comment.isEditing = !comment.isEditing;
    }
  }

  changeStatus(newStatus: string) {
    if (newStatus !== this.selectedStatus) {
      this.selectedStatus = newStatus;
      this.apiService.updateTaskStatus(this.taskId, newStatus).subscribe({
        next: (response) => {
          console.log('Status updated successfully:', response);
        },
        error: (error) => {
          console.error('Failed to update status:', error);
        },
      });
    }
  }

  saveComment(comment: any) {
    if (this.isCurrentUser(comment.sender_id) && comment.isEditing) {
      this.http
        .put(
          `${GlobalComponent.API_URL}projects/comments/${comment.comment_id}`,
          { text: comment.text }
        )
        .subscribe({
          next: (response) => {
            console.log('Comment updated successfully:', response);
            comment.isEditing = false;
          },
          error: (error) => {
            console.error('Failed to update comment:', error);
          },
        });
    }
  }
}
