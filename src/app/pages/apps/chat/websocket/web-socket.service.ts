import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private chatSocket$!: WebSocketSubject<any>;
  private messageSocket$!: WebSocketSubject<any>;

  constructor() {}

  connectToChatWebSocket(): Observable<any> {
    if (!this.chatSocket$ || this.chatSocket$.closed) {
      this.chatSocket$ = webSocket('wss://api.obscurial.art/ws/chats');
    }
    return this.chatSocket$.asObservable();
  }

  connectToMessageWebSocket(chatId: string): Observable<any> {
    if (!this.messageSocket$ || this.messageSocket$.closed) {
      this.messageSocket$ = webSocket(`wss://api.obscurial.art/ws/messages/${chatId}`);
    }
    return this.messageSocket$.asObservable();
  }

  sendMessage(message: any): void {
    this.messageSocket$.next(message);
  }

  closeChatConnection(): void {
    if (this.chatSocket$) {
      this.chatSocket$.complete();
    }
  }

  closeMessageConnection(): void {
    if (this.messageSocket$) {
      this.messageSocket$.complete();
    }
  }
}