

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {GetGlyphicon, FormatGithubLink, ParseJiraLinks, JiraLink} from './jiraLinkParser'
import  {NotificationReason, Notification, NotificationWrapper, Subject, Repo} from './notifications'




import { Component } from '@angular/core';
import {Http} from '@angular/http'


@Component({
  selector: 'my-app',
  template: `<h1>Your notifications</h1> {{error}}
    <ul class="input-list">
      <li class="input-unit">
        
        <div class="input-control input-control-inline">

        <label class="input-label" for="select-input-1">Repository</label>
          <select [(ngModel)] = "selectedRepo"  class="input-element input-element-base select" id="select-input-1">
              <option value="">Any</option>
              <option *ngFor="let repo of repos" value="{{repo.full_name}}">{{repo.full_name}}</option>
          </select>
          <label class="input-label" for="select-input-2">Reason</label>
          <select [(ngModel)] = "selectedReason" class="input-element input-element-base select" id="select-input-2">
              <option value="">Any</option>
              <option *ngFor="let reason of reasons" value="{{reason}}">{{reason}}</option>
          </select>
          <div class="checkbox-unit">
          <input [(ngModel)] = "showUnread" id="checkbox-1" class="checkbox" type="checkbox" />
          <label for="checkbox-1" class="checkbox-label"><span >Show unread</span></label>
        </div>
        </div>

      </li>
    </ul>

    <div class="table-wrapper table-panel">
      <table class="table">
        <thead class="thead">
          <tr>
            <th scope="column">JIRA issues</th>
            <th scope="column">Title</th>

          </tr>
        </thead>
        <tbody class="tbody">
         <ng-container *ngFor = "let n of notifications"  >
          <tr *ngIf = "shouldShow(n)" > 
           
            <td>
              <div *ngFor="let link of n.links"><a href="{{link.link}}" class="bold">{{link.issue}}</a></div>
            </td>
            <td>
              <div class="item-info">
                <span class="item-name">
                  <span *ngIf = "!n.notification.unread" class="text-red glyphicons glyphicons-exclamation-sign"></span>
                  
                  <a href="{{n.githubLink}}">{{n.notification.subject.title}}</a></span>
                <span class="item-sub-info">
                  <span class="glyphicons glyphicons-{{GetIcon(n.notification.reason)}}" > </span> in <a href="{{n.notification.repository.html_url}}">{{n.notification.repository.name}}</a>
                  <br/>
                  {{n.notification.updated_at | date: 'M/d/yyyy'}} <br/>
                </span>
              </div>
            </td>
          </tr>
          </ng-container>
        </tbody>
      </table>
    </div>
  ` 
})

@Injectable()
export class AppComponent { 
  
  constructor(private http: Http) {
 
    this.loadExampleText();
  }

  cachedNotifications: NotificationWrapper[];
  notifications: NotificationWrapper[];
  error: string;
  repos : Repo[];
  reasons: string[] =  ["mention", "team_mention", "manual", "author", "comment", "state_change", "assign", "subscribed"];
  selectedReason ;
  selectedRepo;
  showUnread : boolean = true;
  Github: any;
  processNotifications(notifications : Notification[]) {
    
    this.notifications = [];
    this.repos  = [] ;
    var repo = {};
    for (let n of notifications) {
      var links = ParseJiraLinks(n.subject.title);
      this.notifications.push({
        notification: n,
        links: links,
        githubLink: FormatGithubLink(n.subject.url)
      })
      if (!repo[n.repository.full_name]){
        repo[n.repository.full_name] = n.repository;
        this.repos.push(n.repository);
      }
    }
    this.cachedNotifications = this.notifications;
  }
   
  shouldShow(n : NotificationWrapper) {
    return (!this.selectedReason || n.notification.reason == this.selectedReason)
          && (!this.selectedRepo || n.notification.repository.full_name == this.selectedRepo)
          && (this.showUnread || !n.notification.unread);
  }
  filterNotifications() {
    this.notifications = this.cachedNotifications;
    if (this.selectedReason) {
      this.notifications = this.notifications.filter( nw => nw.notification.reason === this.selectedReason);
    }
    if (this.selectedRepo) {
      this.notifications = this.notifications.filter( nw => nw.notification.repository.full_name === this.selectedRepo);
    }
  }

  loadExampleText() {
    // // var gh = new Github({
    // //   token: ''
    // // });
    // // gh.listNotifications()
    //   .then(response => this.processNotifications(response.json() as Notification []))
    // Put an Oauth token here
    
    var token = ""; // Put an OAuth token with read:notification permissions here
    this.http.get('https://api.github.com/notifications?all=true&participating=true&access_token=' + token)
      .toPromise()
      .then(response => this.processNotifications(response.json() as Notification []))
      .catch(reason => this.error = reason.toString())
  }

  GetIcon(reason: string) {
    return GetGlyphicon(NotificationReason[reason]);
  }

}