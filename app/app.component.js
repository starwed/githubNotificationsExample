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
var core_2 = require('@angular/core');
var http_1 = require('@angular/http');
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.loadExampleText();
        for (var _i = 0, _a = this.notifications; _i < _a.length; _i++) {
            var notification = _a[_i];
        }
    }
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
    AppComponent.prototype.processNotifications = function (notifications) {
        for (var _i = 0, notifications_1 = notifications; _i < notifications_1.length; _i++) {
            var n = notifications_1[_i];
            //var links = JiraLinkParser(n.subject.title);
            this.notifications.push({
                notification: n
            });
        }
    };
    AppComponent.prototype.loadExampleText = function () {
        var _this = this;
        this.http.get('test-response.json')
            .toPromise()
            .then(function (response) { return _this.processNotifications(response.json()); })
            .catch(function (reason) { return _this.error = reason.toString(); });
    };
    AppComponent = __decorate([
        core_2.Component({
            selector: 'my-app',
            template: "<h1>Your notifications</h1> {{error}}\n    <ul>\n      <li *ngFor=\"let n of notifications\">\n        [{{n.notification.reason}}] {{n.subject.title}}\n      </li>\n    </ul>\n  "
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map