import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../token/api-url.token';
import {
  DeleteCommentInput,
  NewComment,
  UpdateComment,
  UpdateTask,
} from '../../interfaces/api-interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  public getAccountInfo() {}

  public postAddComment(commentData: NewComment): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/api/students/comments/add`,
      commentData
    );
  }

  public deleteComment(commentData: DeleteCommentInput): Observable<any> {
    return this.httpClient.delete(
      `${this.apiUrl}/api/students/comments/delete`,
      { body: commentData }
    );
  }

  public getListOfComments(
    taskId: string,
    page: number = 1,
    pageSize: number = 25
  ): Observable<any> {
    const params = new HttpParams()
      .set('task_id', taskId)
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.httpClient.get(`${this.apiUrl}/api/students/comments/list`, {
      params,
    });
  }

  public updateComment(commentData: UpdateComment): Observable<any> {
    return this.httpClient.put(
      `${this.apiUrl}/api/students/comments/update`,
      commentData
    );
  }

  public getLastProject(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/students/project`);
  }

  public getListOfTasks(
    projectId?: string,
    page: number = 1,
    pageSize: number = 25
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    if (projectId) {
      params = params.set('project_id', projectId);
    }

    return this.httpClient.get(`${this.apiUrl}/api/students/tasks/list`, {
      params,
    });
  }

  public postChangeTaskStatus(taskUpdateData: UpdateTask): Observable<any> {
    return this.httpClient.put(
      `${this.apiUrl}/api/students/tasks/update`,
      taskUpdateData
    );
  }

  public getProjectOverview(projectId: string): Observable<any> {
    const params = new HttpParams().set('project_id', projectId);
    return this.httpClient.get(`${this.apiUrl}/api/students/tasks/overview`, {
      params,
    });
  }

  public getTaskDetails(taskId: string): Observable<any> {
    const params = new HttpParams().set('task_id', taskId);
    return this.httpClient.get(`${this.apiUrl}/api/students/tasks/task`, {
      params,
    });
  }
}

export class AuthService {
  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  public tokenCreate(email: string, password: string) {
    return this.httpClient.post(`${this.apiUrl}/api/accounts/token`, {
      email: email,
      password: password,
    });
  }

  public tokenRefresh(refresh: string) {
    return this.httpClient.post(`${this.apiUrl}/api/accounts/token`, {
      refresh: refresh,
    });
  }

  public signUp(email: string, password: string, registration_code: string) {
    return this.httpClient.post(`${this.apiUrl}/api/accounts/sign-up`, {
      email: email,
      password: password,
      registration_code: registration_code,
    });
  }
}
