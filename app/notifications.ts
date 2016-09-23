enum NotificationReason {
    subscribed = 1,
    manual,
    author,
    comment,
    mention,
    team_mention,
    state_change,
    assign
}

interface NotificationWrapper {
    notification: Notification;
    links?: Dict<string>;
}

interface Notification {
    id: string;
    reason: string;
    unread: boolean;
    subject: Subject;
    repository?: Repo;
    updatred_at?: Date;
}


interface Subject {
    title: string;
    type?: string;
}

interface Repo {
    name: string;
    full_name: string;
    html_url: string;
}