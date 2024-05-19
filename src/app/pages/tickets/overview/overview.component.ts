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
  task: Task = {
    created_at: '',
    updated_at: '',
    name: '',
    description: '',
    priority: 0,
    reviewer: null,
    due_date: null,
    project_id: '',
    task_id: '',
    state: '',
    comment_count: 0,
  };
  comments: any[] = [];
  commentText: string = '';
  selectedStatus: string = '';
  statuses: string[] = ['open', 'in_progress', 'in_review'];
  taskId: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: restApiService,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['taskId']; // Set the taskId from the route parameters
      this.apiService.getTaskById(this.taskId).subscribe((task) => {
        this.task = task;
        this.selectedStatus = task.state; // Set the initial selected status from the task's current state
        this.loadComments(this.taskId);
      });
    });
  }

  loadComments(taskId: string) {
    this.apiService.getComments(taskId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }

  postComment(taskId: string, commentText: string) {
    const comment = { text: commentText };
    this.apiService.postComment(taskId, comment).subscribe(() => {
      this.loadComments(taskId); // Reload comments after posting
      this.commentText = ''; // Clear the comment input field
    });
  }

  isCurrentUser(senderId: string): boolean {
    try {
      return this.authService.getCurrentUserUUID() === senderId;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  toggleEdit(comment: any): void {
    if (this.isCurrentUser(comment.sender_id)) {
      comment.isEditing = !comment.isEditing;
    }
  }

  changeStatus(newStatus: string): void {
    if (newStatus !== this.selectedStatus) {
      this.selectedStatus = newStatus;
      this.apiService.updateTaskStatus(this.taskId, newStatus).subscribe({
        next: (response) => {
          console.log('Status updated successfully:', response);
          // Optionally, handle any additional logic after successful update
        },
        error: (error) => {
          console.error('Failed to update status:', error);
          // Optionally, handle errors, e.g., show an error message to the user
        },
      });
    }
  }

  saveComment(comment: any): void {
    if (this.isCurrentUser(comment.sender_id) && comment.isEditing) {
      this.http
        .put(
          `${GlobalComponent.API_URL}projects/comments/${comment.comment_id}`,
          { text: comment.text }
        )
        .subscribe({
          next: (response) => {
            console.log('Comment updated successfully:', response);
            comment.isEditing = false; // Turn off edit mode after saving
          },
          error: (error) => {
            console.error('Failed to update comment:', error);
          },
        });
    }
  }

  updateComment(comment: Comment): void {
    if (this.isCurrentUser(comment.sender_id)) {
      this.http
        .put(
          `${GlobalComponent.API_URL}projects/comments/${comment.comment_id}`,
          { text: comment.text }
        )
        .subscribe({
          next: (response) => {
            console.log('Comment updated successfully:', response);
            // Optionally, refresh the comments list or handle UI updates here
          },
          error: (error) => {
            console.error('Failed to update comment:', error);
            // Handle errors, e.g., show an error message to the user
          },
        });
    } else {
      console.error('Unauthorized attempt to update comment');
      // Optionally, show an error message to the user
    }
  }
}
