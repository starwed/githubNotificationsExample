"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
var jiraLinkParser_1 = require('./jiraLinkParser');
var notifications_1 = require('./notifications');
var core_2 = require('@angular/core');
var http_1 = require('@angular/http');
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.reasons = ["mention", "team_mention", "manual", "author", "comment", "state_change", "assign", "subscribed"];
        this.showUnread = true;
        this.loadExampleText();
    }
    AppComponent.prototype.processNotifications = function (notifications) {
        this.notifications = [];
        this.repos = [];
        var repo = {};
        for (var _i = 0, notifications_2 = notifications; _i < notifications_2.length; _i++) {
            var n = notifications_2[_i];
            var links = jiraLinkParser_1.ParseJiraLinks(n.subject.title);
            this.notifications.push({
                notification: n,
                links: links,
                githubLink: jiraLinkParser_1.FormatGithubLink(n.subject.url)
            });
            if (!repo[n.repository.full_name]) {
                repo[n.repository.full_name] = n.repository;
                this.repos.push(n.repository);
            }
        }
        this.cachedNotifications = this.notifications;
    };
    AppComponent.prototype.shouldShow = function (n) {
        return (!this.selectedReason || n.notification.reason == this.selectedReason)
            && (!this.selectedRepo || n.notification.repository.full_name == this.selectedRepo)
            && (this.showUnread || !n.notification.unread);
    };
    AppComponent.prototype.filterNotifications = function () {
        var _this = this;
        this.notifications = this.cachedNotifications;
        if (this.selectedReason) {
            this.notifications = this.notifications.filter(function (nw) { return nw.notification.reason === _this.selectedReason; });
        }
        if (this.selectedRepo) {
            this.notifications = this.notifications.filter(function (nw) { return nw.notification.repository.full_name === _this.selectedRepo; });
        }
    };
    AppComponent.prototype.loadExampleText = function () {
        // // var gh = new Github({
        // //   token: 'b91211b4e3ab9258489201b5e2f2eb60a5c10b6e'
        // // });
        // // gh.listNotifications()
        //   .then(response => this.processNotifications(response.json() as Notification []))
        var _this = this;
        this.http.get('https://api.github.com/notifications?all=true&participating=true&access_token=b91211b4e3ab9258489201b5e2f2eb60a5c10b6e')
            .toPromise()
            .then(function (response) { return _this.processNotifications(response.json()); })
            .catch(function (reason) { return _this.error = reason.toString(); });
    };
    AppComponent.prototype.GetIcon = function (reason) {
        return jiraLinkParser_1.GetGlyphicon(notifications_1.NotificationReason[reason]);
    };
    AppComponent = __decorate([
        core_2.Component({
            selector: 'my-app',
            template: "<h1>Your notifications</h1> {{error}}\n    <ul class=\"input-list\">\n      <li class=\"input-unit\">\n        \n        <div class=\"input-control input-control-inline\">\n\n        <label class=\"input-label\" for=\"select-input-1\">Repository</label>\n          <select [(ngModel)] = \"selectedRepo\"  class=\"input-element input-element-base select\" id=\"select-input-1\">\n              <option value=\"\">Any</option>\n              <option *ngFor=\"let repo of repos\" value=\"{{repo.full_name}}\">{{repo.full_name}}</option>\n          </select>\n          <label class=\"input-label\" for=\"select-input-2\">Reason</label>\n          <select [(ngModel)] = \"selectedReason\" class=\"input-element input-element-base select\" id=\"select-input-2\">\n              <option value=\"\">Any</option>\n              <option *ngFor=\"let reason of reasons\" value=\"{{reason}}\">{{reason}}</option>\n          </select>\n          <div class=\"checkbox-unit\">\n          <input [(ngModel)] = \"showUnread\" id=\"checkbox-1\" class=\"checkbox\" type=\"checkbox\" />\n          <label for=\"checkbox-1\" class=\"checkbox-label\"><span >Show unread</span></label>\n        </div>\n        </div>\n\n      </li>\n    </ul>\n\n    <div class=\"table-wrapper table-panel\">\n      <table class=\"table\">\n        <thead class=\"thead\">\n          <tr>\n            <th scope=\"column\">JIRA issues</th>\n            <th scope=\"column\">Title</th>\n\n          </tr>\n        </thead>\n        <tbody class=\"tbody\">\n         <ng-container *ngFor = \"let n of notifications\"  >\n          <tr *ngIf = \"shouldShow(n)\" > \n           \n            <td>\n              <div *ngFor=\"let link of n.links\"><a href=\"{{link.link}}\" class=\"bold\">{{link.issue}}</a></div>\n            </td>\n            <td>\n              <div class=\"item-info\">\n                <span class=\"item-name\">\n                  <span *ngIf = \"!n.notification.unread\" class=\"text-red glyphicons glyphicons-exclamation-sign\"></span>\n                  \n                  <a href=\"{{n.githubLink}}\">{{n.notification.subject.title}}</a></span>\n                <span class=\"item-sub-info\">\n                  <span class=\"glyphicons glyphicons-{{GetIcon(n.notification.reason)}}\" > </span> in <a href=\"{{n.notification.repository.html_url}}\">{{n.notification.repository.name}}</a>\n                  <br/>\n                  {{n.notification.updated_at | date: 'M/d/yyyy'}} <br/>\n                </span>\n              </div>\n            </td>\n          </tr>\n          </ng-container>\n        </tbody>\n      </table>\n    </div>\n  "
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map