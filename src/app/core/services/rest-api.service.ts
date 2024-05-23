import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GlobalComponent } from '../../global-component';
import {
  CommentApiResponse,
  Comment,
  CreateUserProject,
  PaginationParams,
  DownloadFileResponse,
  FileInfo,
} from 'src/app/interfaces/api-interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class restApiService {
  constructor(private http: HttpClient) {}

  /**
  * Product Rest Api
  /*
// Projects
When calling for a method, to describe pagination, use:
this.restApiService.getProjectTasks(projectId, { page: 1, page_size: 10 }, 'task name');
 */

  //Projects
  getProjects(
    pagination: PaginationParams,
    facultyId?: string,
    name?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('page_size', pagination.page_size.toString());

    if (name) {
      params = params.set('name', name);
    }

    return this.http.get(GlobalComponent.API_URL + 'projects/projects', {
      params: params,
    });
  }

  createProject(project: CreateUserProject): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + '/projects/projects',
      project
    );
  }

  getProjectById(projectId: string): Observable<any> {
    return this.http.get(
      `${GlobalComponent.API_URL}projects/projects/${projectId}`
    );
  }

  getCurrentProjects(): Observable<any> {
    return this.http.get(
      `${GlobalComponent.API_URL}projects/projects/current`
    )
  }

  //Tasks
  getProjectTasks(
    projectId: string,
    pagination: PaginationParams,
    name?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('page_size', pagination.page_size.toString());

    if (name) {
      params = params.set('name', name);
    }

    return this.http.get(
      `${GlobalComponent.API_URL}/projects/tasks/${projectId}`,
      { params }
    );
  }

  getTaskById(taskId: string): Observable<any> {
    return this.http.get(`${GlobalComponent.API_URL}projects/task/${taskId}`);
  }

  // Get
  getData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.product, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  updateTaskStatus(taskId: string, status: string): Observable<any> {
    return this.http.put(`${GlobalComponent.API_URL}projects/task/${taskId}/status`, { status });
  }

  postComment(taskId: string, comment: any): Observable<any> {
    return this.http.post(`${GlobalComponent.API_URL}projects/tasks/${taskId}/comment`, comment);
  }

  getComments(taskId: string): Observable<Comment[]> {
    return this.http.get<CommentApiResponse>(`${GlobalComponent.API_URL}projects/tasks/${taskId}/comments`).pipe(
      map(response => response.content)
    );
  }

  // Update a comment
  updateComment(commentId: string, comment: any): Observable<any> {
    return this.http.put(`${GlobalComponent.API_URL}projects/comments/${commentId}`, comment);
  }

// In your service
  postFile(fileData: FormData): Observable<any> {
    return this.http.post(`${GlobalComponent.API_URL}common/file`, fileData);
  }
  

downloadFile(fileId: string): Observable<{blob: Blob, filename: string}> {
  return this.http.get(`${GlobalComponent.API_URL}common/file/${fileId}`, {
    responseType: 'blob',
    observe: 'response'
  }).pipe(
    map((response: HttpResponse<Blob>) => {
      // Log all response headers
      const headers = response.headers.keys();
      headers.forEach(header => console.log(`${header}: ${response.headers.get(header)}`));

      const contentDisposition = response.headers.get('Content-Disposition') || '';
      console.log('Content-Disposition header:', contentDisposition);

      const matches = /filename\s*=\s*(?:"([^"]*)"|([^;]*))/i.exec(contentDisposition);
      console.log('Regex matches:', matches);

      const filename = matches && (matches[1] || matches[2]) ? matches[1] || matches[2] : 'default-filename.ext';
      console.log('Extracted filename:', filename);

      return { blob: response.body as Blob, filename };
    })
  );
}




  getFileInfo(fileId: string): Observable<FileInfo> {
    return this.http.get<FileInfo>(`${GlobalComponent.API_URL}common/file/${fileId}/info`);
  }

    // Create a new chat
    createChat(chatData: any): Observable<any> {
      return this.http.post(`${GlobalComponent.API_URL}communication/chat`, chatData);
    }
  
    // Get all chats
    getChats(): Observable<any[]> {
      return this.http.get<any[]>(`${GlobalComponent.API_URL}communication/chat`);
    }
  
    // Get specific chat by ID
    getChat(chatId: string): Observable<any> {
      return this.http.get(`${GlobalComponent.API_URL}communication/chat/${chatId}`);
    }
  
    // Update specific chat
    updateChat(chatId: string, updateData: any): Observable<any> {
      return this.http.patch(`${GlobalComponent.API_URL}communication/chat/${chatId}`, updateData);
    }
  
    // Add member to chat
    addChatMember(chatId: string, userId: string): Observable<any> {
      return this.http.post(`${GlobalComponent.API_URL}communication/chat/${chatId}/add_member`, { userId });
    }
  
    // Leave a chat
    leaveChat(chatId: string): Observable<any> {
      return this.http.post(`${GlobalComponent.API_URL}communication/chat/${chatId}/leave`, {});
    }
  
    // Get chat participants
    getChatParticipants(chatId: string): Observable<any[]> {
      return this.http.get<any[]>(`${GlobalComponent.API_URL}communication/chat/${chatId}/participants`);
    }
  
    // Messaging services
    createMessage(messageData: any): Observable<any> {
      return this.http.post(`${GlobalComponent.API_URL}communication/message`, messageData);
    }
  
    getMessage(messageId: string): Observable<any> {
      return this.http.get(`${GlobalComponent.API_URL}communication/message/${messageId}`);
    }
  
    updateMessage(messageId: string, messageData: any): Observable<any> {
      return this.http.put(`${GlobalComponent.API_URL}communication/message/${messageId}`, messageData);
    }
  
    markMessageSeen(messageId: string): Observable<any> {
      return this.http.patch(`${GlobalComponent.API_URL}communication/message/${messageId}/seen`, {});
    }
  
    // Get who has seen the message
    getMessageSeenBy(messageId: string): Observable<any[]> {
      return this.http.get<any[]>(`${GlobalComponent.API_URL}communication/message/${messageId}/seen_by`);
    }

  // Delete
  deleteData(id: any): Observable<any> {
    return this.http.delete(
      GlobalComponent.API_URL + GlobalComponent.productDelete + id,
      { responseType: 'text' }
    );
  }

  /**
   * Order Rest Api
   */
  // Get
  getOrderData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.order, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // POST
  postOrderData(employee: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + GlobalComponent.order,
      JSON.stringify(employee),
      httpOptions
    );
  }

  // Single
  getSingleOrderData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(
      GlobalComponent.API_URL + GlobalComponent.orderId + id,
      { headers: headerToken, responseType: 'text' }
    );
  }

  //Order Patch
  patchOrderData(employee: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + GlobalComponent.orderId + employee.ids,
      JSON.stringify(employee),
      httpOptions
    );
  }

  // Order Delete
  deleteOrder(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.delete(
      GlobalComponent.API_URL + GlobalComponent.orderId + id,
      { headers: headerToken, responseType: 'text' }
    );
  }

  /**
   * Customers Rest Api
   */
  // Get
  getCustomerData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.customer, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // POST
  postCustomerData(customers: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + GlobalComponent.customer,
      JSON.stringify(customers),
      httpOptions
    );
  }

  // Single
  getSingleCustomerData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/customer/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // Patch
  patchCustomerData(customers: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + 'apps/customer/' + customers.ids,
      JSON.stringify(customers),
      httpOptions
    );
  }

  // Delete
  deleteCustomer(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.delete(GlobalComponent.API_URL + 'apps/customer/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  /**
   * Task List Rest Api
   */
  // Get
  getTaskData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/task', {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // POST
  postTaskData(task: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + 'apps/task',
      JSON.stringify(task),
      httpOptions
    );
  }

  // Single
  getSingleTaskData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/task/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // Patch
  patchTaskData(tasks: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + 'apps/task/' + tasks.ids,
      JSON.stringify(tasks),
      httpOptions
    );
  }

  // Delete
  deleteTask(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.delete(GlobalComponent.API_URL + 'apps/task/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  /**
   * CRM Contect Rest Api
   */
  // Get
  getContactData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/contact', {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // POST
  postContactData(contact: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + 'apps/contact',
      JSON.stringify(contact),
      httpOptions
    );
  }

  // Single
  getSingleContactData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/contact/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // Patch
  patchContactData(contacts: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + 'apps/contact/' + contacts.ids,
      JSON.stringify(contacts),
      httpOptions
    );
  }

  // Delete
  deleteContact(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.delete(GlobalComponent.API_URL + 'apps/contact/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  /**
   * CRM Company Rest Api
   */
  // Get
  getCompanyData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/company', {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // POST
  postCompanyData(company: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + 'apps/company',
      JSON.stringify(company),
      httpOptions
    );
  }

  // Single
  getSingleCompanyData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/company/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // Patch
  patchCompanyData(company: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + 'apps/company/' + company.ids,
      JSON.stringify(company),
      httpOptions
    );
  }

  // Delete
  deleteCompany(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.delete(GlobalComponent.API_URL + 'apps/company/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  /* CRM Company Rest Api
   */
  // Get
  getLeadData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/lead', {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // POST
  postLeadData(company: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + 'apps/lead',
      JSON.stringify(company),
      httpOptions
    );
  }

  // Single
  getSingLeadData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/lead/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // Patch
  patchLeadData(company: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + 'apps/lead/' + company.ids,
      JSON.stringify(company),
      httpOptions
    );
  }

  // Delete
  deletelead(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.delete(GlobalComponent.API_URL + 'apps/lead/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  /* Support Ticket Rest Api
   */
  // Get
  getTicketData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/ticket', {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // POST
  postTicketData(ticket: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + 'apps/ticket',
      JSON.stringify(ticket),
      httpOptions
    );
  }

  // Single
  getSingTicketData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/ticket/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // Patch
  patchTicketData(ticket: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + 'apps/ticket/' + ticket.ids,
      JSON.stringify(ticket),
      httpOptions
    );
  }

  // Delete
  deleteTicket(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.delete(GlobalComponent.API_URL + 'apps/ticket/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  /**
   * Support Ticket Rest Api
   */
  // Get
  getInvoiceData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/invoice', {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // Delete
  deleteInvoice(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.delete(GlobalComponent.API_URL + 'apps/invoice/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  /**
   * Todo Rest Api
   */
  // Get
  getTodoData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/todo/', {
      headers: headerToken,
      responseType: 'text',
    });
  }

  // POST
  postTodoData(employee: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + 'apps/todo/',
      JSON.stringify(employee),
      httpOptions
    );
  }

  // Single
  getSingleTodoData(id: any): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/todo/' + id, {
      headers: headerToken,
      responseType: 'text',
    });
  }

  //Patch
  patchTodoData(employee: any): Observable<any> {
    return this.http.patch(
      GlobalComponent.API_URL + 'apps/todo/' + employee.ids,
      JSON.stringify(employee),
      httpOptions
    );
  }

  /**
   * Calender Rest Api
   */
  // Get
  getCalendarData(): Observable<any> {
    var headerToken = {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    };
    return this.http.get(GlobalComponent.API_URL + 'apps/calendar/', {
      headers: headerToken,
      responseType: 'text',
    });
  }
}
