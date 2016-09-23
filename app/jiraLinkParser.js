var projectTokens = ["VAN", "DIGITAL", "NGP"];
function JiraLinkParser(text) {
    var links = {};
    for (var _i = 0, projectTokens_1 = projectTokens; _i < projectTokens_1.length; _i++) {
        var project = projectTokens_1[_i];
        var re = new RegExp("\b" + projectTokens + "-" + "\d+\b", "g");
        var matches = text.match(re);
        for (var _a = 0, matches_1 = matches; _a < matches_1.length; _a++) {
            var match = matches_1[_a];
            var link = "ngpvan.atlassian.com/browse/" + match;
            links[match] = link;
        }
    }
    return links;
}
//# sourceMappingURL=jiraLinkParser.js.map