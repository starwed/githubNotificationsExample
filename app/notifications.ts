import {JiraLink} from './jiraLinkParser'

export enum NotificationReason {
    subscribed = 1,
    manual,
    author,
    comment,
    mention,
    team_mention,
    state_change,
    assign
}


export interface NotificationWrapper {
    notification: Notification;
    links?: JiraLink[];
    githubLink: string;
}

export interface Notification {
    id: string;
    reason: string;
    unread: boolean;
    subject: Subject;
    repository: Repo;
    updated_at: Date;
}


export interface Subject {
    title: string;
    type?: string;
    url: string;
}

export interface Repo {
    name: string;
    full_name: string;
    html_url: string;
}