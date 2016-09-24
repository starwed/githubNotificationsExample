"use strict";
var notifications_1 = require('./notifications');
var projectTokens = ["VAN", "DIGITAL", "NGP"];
var JiraLink = (function () {
    function JiraLink() {
    }
    return JiraLink;
}());
exports.JiraLink = JiraLink;
function GetGlyphicon(reason) {
    switch (reason) {
        case notifications_1.NotificationReason.author:
            return "pencil";
        case notifications_1.NotificationReason.team_mention:
            return "group";
        case notifications_1.NotificationReason.comment:
            return "comments";
        case notifications_1.NotificationReason.assign:
            return "arrow-right";
        case notifications_1.NotificationReason.subscribed:
            return "download-alt";
        case notifications_1.NotificationReason.mention:
            return "envelope";
    }
}
exports.GetGlyphicon = GetGlyphicon;
function ParseJiraLinks(text) {
    var links = [];
    for (var _i = 0, projectTokens_1 = projectTokens; _i < projectTokens_1.length; _i++) {
        var project = projectTokens_1[_i];
        var re = new RegExp(project + "." + "\\d+", "g");
        var matches = text.toUpperCase().match(re);
        console.log(matches);
        if (matches != null) {
            console.log(matches, project);
            for (var _a = 0, matches_1 = matches; _a < matches_1.length; _a++) {
                var match = matches_1[_a];
                if (match != null) {
                    links.push({
                        issue: match,
                        link: "https://ngpvan.atlassian.net/browse/" + match
                    });
                }
            }
        }
    }
    return links;
}
exports.ParseJiraLinks = ParseJiraLinks;
function FormatGithubLink(text) {
    var s1 = text.replace("https://api.github.com/repos", "https://github.com");
    return s1.replace("/pulls/", "/pull/");
}
exports.FormatGithubLink = FormatGithubLink;
//# sourceMappingURL=jiraLinkParser.js.map