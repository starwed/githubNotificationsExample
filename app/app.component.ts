import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Component } from '@angular/core';
import {Http} from '@angular/http'
@Component({
  selector: 'my-app',
  template: `<h1>Your notifications</h1> {{error}}
    <ul>
      <li *ngFor="let n of notifications">
        [{{n.notification.reason}}] {{n.subject.title}}
      </li>
    </ul>
  `
})

@Injectable()
export class AppComponent { 
  
  constructor(private http: Http) {
    this.loadExampleText();
    for(let notification of this.notifications) {
      
    }
  }

  notifications: NotificationWrapper[];
  error: string;

  // loadFakeNotifications() {
  //   this.notifications = [];
  //   this.notifications.push({
  //       id: "1",
  //       reason: "mention",
  //       unread: true,
  //       subject: {
  //         title: "Hello there"
  //       } as Subject
  //   } as Notification);
  // }

  processNotifications(notifications : Notification[]) {
    for (let n of notifications) {
      //var links = JiraLinkParser(n.subject.title);
      this.notifications.push({
        notification: n
        // links: links
      })
    }
  }

  loadExampleText() {
    this.http.get('test-response.json')
      .toPromise()
      .then(response => this.processNotifications(response.json() as Notification []))
      .catch(reason => this.error = reason.toString())
  }

}