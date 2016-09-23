
var projectTokens = ["VAN", "DIGITAL", "NGP"];

function JiraLinkParser(text: string) : Dict<string> {
    var links : Dict<string> = {};
    for (let project of projectTokens) {
        var re = new RegExp("\b" + projectTokens + "-" + "\d+\b", "g");
        var matches = text.match(re);
        for(let match of matches) {
            var link = "ngpvan.atlassian.com/browse/" + match
            links[match] = link;
        }
    }
    return links;
}