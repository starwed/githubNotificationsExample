import {NotificationReason} from './notifications'
var projectTokens = ["VAN", "DIGITAL", "NGP"];


export class JiraLink {
    issue: string;
    link: string;
}

export function GetGlyphicon(reason : NotificationReason) {
    switch(reason) {
        case NotificationReason.author:
            return "pencil";
        case NotificationReason.team_mention:
            return "group";
        case NotificationReason.comment:
            return "comments";
        case NotificationReason.assign:
            return "arrow-right";
        case NotificationReason.subscribed:
            return "download-alt";
        case NotificationReason.mention:
            return "envelope";    
        }
}

export function ParseJiraLinks(text: string) : JiraLink[] {
    var links : JiraLink[] = []
    for (let project of projectTokens) {
        var re = new RegExp(project + "." + "\\d+", "g");
        var matches = text.toUpperCase().match(re);
        console.log(matches);
        if (matches != null){
            console.log(matches, project);
            for(let match of matches) {
                if (match != null){
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

export function FormatGithubLink(text: string) : string {
    var s1 =  text.replace("https://api.github.com/repos", "https://github.com");
    return s1.replace("/pulls/", "/pull/");
}